import http from "@/utils/http";

// 登陆
export function loginUserName(username, password) {
  const data = {
    username,
    password
  };
  return http({
    url: "/login",
    method: "post",
    data: data
  });
}

// 获取用户信息
export function getUserInfo(userid) {
  return http({
    url: "/user/info",
    method: "get",
    data: userid
  });
}
