import { constantRouterMap, asyncRouterMap } from "@/router/router";
/**
 * 判断用户权限是否与当前权限匹配
 * @param roles
 * @param route
 *
 */

function hasPermission(roles, route) {
  if (route.meta && route.meta.roles) {
    return roles.some(role => route.meta.roles.includes(role));
  } else {
    return true;
  }
}
/**
 * 递归过滤异步路由表，返回符合用户角色权限的路由表
 * @param routes asyncRouterMap
 * @param roles
 */
function filterAsyncRouter(routers, roles) {
  const res = [];
  console.log(routers);
  routers.forEach(route => {
    const tmp = { ...route };
    if (hasPermission(roles, tmp)) {
      if (tmp.children) {
        tmp.children = filterAsyncRouter(tmp.children, roles);
      }
    }
    res.push(tmp);
  });
  return res;
}

const permission = {
  state: {
    routers: [],
    addRouters: []
  },
  mutations: {
    SET_ROUTERS: (state, routers) => {
      state.addRouters = routers;
      state.routers = constantRouterMap.concat(routers);
    }
  },
  actions: {
    GenerateRoutes({ commit }, data) {
      return new Promise(resolve => {
        const { roles } = data;
        let addRouters;
        if (roles.includes("admin")) {
          addRouters = asyncRouterMap;
        } else {
          addRouters = filterAsyncRouter(asyncRouterMap, roles);
        }
        console.log(addRouters);
        commit("SET_ROUTERS", addRouters);
        resolve();
      }).catch(error => {
        console.log(error);
      });
    }
  }
};

export default permission;
