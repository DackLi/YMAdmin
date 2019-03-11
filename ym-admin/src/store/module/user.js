import { getToken, setToken, removeToken } from '@/utils/token'
import { loginUserName, getUserInfo} from '@/api/login'

const user = {
  state: {
    token: getToken(),
    user: {
      id: ''
    },
    roles: []
  },
  mutations: {
    SET_TOKEN: (state, token) => {
      state.token = token
    },
    SET_USER_ID: (state, userid) => {
      state.user.id = userid
    },
    SET_ROLES: (state, roles) => {
      state.roles = roles
    }
  },
  actions: {
    // 用户登陆
    LoginUserName({commit}, userInfo) {
      const userName = userInfo.username.trim();
      return new Promise((resolve, reject) => {
        loginUserName(userName, userInfo.password).then((res) => {
          let data = res.data.data;
          commit('SET_TOKEN', data.token);
          commit('SET_USER_ID', data.userId);
          setToken(data.token);
          resolve();
        }).catch(error => {
          reject(error)
        })
      })
    },
    // 获取用户信息
    GetUserInfo({ commit }, userid) {
      console.log(userid)
      return new Promise((resolve, reject) => {
        getUserInfo(userid).then(res => {
          let data = res.data.data;
          if (data.status == '200') {
            commit('SET_ROLES', data.roles)
            resolve(data)
          } else {
            reject('Verification failed, please login again.')
          }
        }).catch(error => {
          reject(error)
        })
      })
    },
    // 前端 登出
    FedLogOut({ commit }) {
      return new Promise(resolve => {
        commit('SET_TOKEN', '')
        removeToken()
        resolve()
      })
    }
  }
}

export default user;