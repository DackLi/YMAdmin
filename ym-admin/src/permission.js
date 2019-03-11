import store from './store';
import router from './router';
import { Message } from 'element-ui';
import NProgress from 'nprogress'
import 'nprogress/nprogress.css'
import { getToken } from '@/utils/token'

NProgress.configure({ showSpinner: false }) // 配置nprogress 

const whitleList = ['/login'];

// permission judge function
function hasPermission(roles, permissionRoles) {
  if (roles.indexOf('admin') >= 0) return true // admin permission passed directly
  if (!permissionRoles) return true
  return roles.some(role => permissionRoles.indexOf(role) >= 0)
}

router.beforeEach((to, from, next) => {
  NProgress.start() // 进度条开始
  // 判断是否存在token
  console.log(to.path)
  if (getToken()) {
    if (to.path == '/login') {
      next({path: '/'})
      NProgress.done()
    } else {
      // 登陆界面不为login的时候 判断用户是否存在userinfo
      if (store.getters.roles.length === 0) {
        store.dispatch('GetUserInfo', store.getters.userId).then((res) => {
          let roles = res.roles
          store.dispatch('GenerateRoutes',{ roles }).then(() => { // 根据权限生成可访问路径
            console.log(router)
            router.addRoutes(store.getters.addRouters) // 动态添加可访问路由表
            console.log(router)
            next({ ...to, replace: true }) // hack方法 确保addRoutes已完成 ,设置replace：true，以便导航不会留下历史记录
          })
        }).catch((err) => {
          console.log(err)
          store.dispatch('FedLogOut').then(() => {
            Message.error(err)
            next({ path: '/' })
          })
        })
      } else {
        if (hasPermission(store.getters.roles, to.meta.roles)) {
          console.log(to.path)
          next()
        } else {
          next({ path: '/401', replace: true, query: { noGoBack: true }})
        }
      }
    }
  } else {
    // 没有token
    if (whitleList.indexOf(to.path) !== -1) {
      next()
    } else {
      next(`/login?redirect=${to.path}`) // 否则全部重定向到登录页
      NProgress.done() // if current page is login will not trigger afterEach hook, so manually handle it
    }
  }
})

router.afterEach(() => {
  NProgress.done() // finish progress bar
})