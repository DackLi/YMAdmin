import http from '@/utils/http'

// 登陆
export function loginUserName(username, password) {
  const data = {
    username,
    password
  }
  return http({
    url: '/login',
    method: 'post',
    data
  })
}