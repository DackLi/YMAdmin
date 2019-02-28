import { getToken, setToken, removeToken } from '@/utils/token'
import { loginUserName} from '@/api/login'

const user = {
  state: {
    token: getToken(),
    user: {
      id: ''
    },
    munuList: []
  },
  mutations: {
    SET_TOKEN: (state, token) => {
      state.token = token
    },
    SET_USER_ID: (state, userid)=> {
      state.user.id = userid
    }
  },
  actions: {
    // 用户登陆
    LoginUserName({commit}, userInfo) {
      const userName = userInfo.username.trim();
      return new Promise((resolve, reject) => {
        loginUserName(userName,userInfo.password).then((res) => {
          const data = res.data.data;
          commit('SET_TOKEN',data.token);
          setToken(data.token);
          resolve();
        }).cath(error => {
          reject(error)
        })
      })
    }
  }
}