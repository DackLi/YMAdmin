import axios from "axios";
import { Message } from "element-ui";
import router from "@/router/index";
import Config from "@/config";
import store from "@/store/index";
import { getToken } from "@/utils/token";
console.log(Config.baseUrl)
// 创建axios实例
const http = axios.create({
  baseURL: Config.baseUrl,
  timeout: Config.timeout
});

// 设置请求头部
axios.defaults.headers.post["Content-Type"] = "application/x-www-form-urlencoded";

// 请求之前拦截器
http.interceptors.request.use(
  config => {
    if (store.getters.token) {
      config.headers["token"] = getToken();
    }
    // 在发送请求之前做某件事 post序列化
    if (config.method === "post") {
      for (const key in config.data) {
        if (typeof config.data[key] === "string") {
          config.data[key] = config.data[key].trim();
        }
      }
    }
    
    return config;
  },
  error => {
    Promise.reject(error)
  }
);

// 返回拦截器
http.interceptors.response.use(
  response => {
    if (response.data.data.status === 401) {
      Message.error("token失效请重新登陆")
      router.replace({
        path: "/login"
      })
      return
    }
    return response
  },
  error => {
    if (error && error.response) {
      switch (error.response.status) {
        case 302:
          error.message = "错误请求：找不到url请求（后台过滤）";
          break;
        case 400:
          error.message = "错误请求：字段名称、类型前后台不一致";
          break;
        case 401:
          error.message = "未授权，请重新登录"
          router.replace({
            path: "/login"
          }); // 路由跳转 不会向 history 添加新记录，替换掉当前的 history 记录
          break;
        case 403:
          error.message = "拒绝访问";
          router.replace({
            path: "/error/401"
          });
          break;
        case 404:
          error.message = "请求错误,未找到该资源"
          router.replace({
            path: "/error/404"
          });
          break;
        case 405:
          error.message = "请求方法未允许,可能是请求类型(get post)不一致"
          break;
        case 408:
          error.message = "请求超时"
          break;
        case 500:
          error.message = "服务器端出错";
          break;
        case 501:
          error.message = "网络未实现";
          break;
        case 502:
          error.message = "网络错误"
          break
        case 503:
          error.message = "服务不可用"
          break
        case 504:
          error.message = "网络超时"
          router.replace({
            path: "/error/404"
          })
          break
        case 505:
          error.message = "http版本不支持该请求"
          break
        default:
          error.message = `连接错误${error.response.status}`
      }
    } else {
      error.message = "连接到服务器失败"
    }
    console.log(error.message)
    Message.error({
      message: error.message
    })
    return Promise.reject(error)
  }
);

export default http;