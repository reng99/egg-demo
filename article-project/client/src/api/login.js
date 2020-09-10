import { auth } from '@/utils/request'

// 登录
export function login(parameter) {
  return auth({
    url: '/api/login',
    method: 'post',
    data: parameter
  })
}


export default {
  login
}