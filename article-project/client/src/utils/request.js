import Vue from 'vue'
import axios from 'axios'
import store from '@/store'
import notification from 'ant-design-vue/es/notification'
import { ACCESS_TOKEN } from '@/store/mutation-types'
import { notice } from './notice';

const err = (error) => {
  if (error.response) {
    // const data = error.response.data
    // const token = Vue.ls.get(ACCESS_TOKEN)
    // if (error.response.status === 403) {
    //   notification.error({ message: 'Forbidden', description: data.message })
    // }
    // if (error.response.status === 401) {
    //   notification.error({ message: 'Unauthorized', description: 'Authorization verification failed' })
    //   if (token) {
    //     store.dispatch('user/logout').then(() => {
    //       setTimeout(() => {
    //         window.location.reload()
    //       }, 1500)
    //     })
    //   }
    // }
  }
  return Promise.reject(error)
}

function loginTimeOut () {
  notification.error({ message: '登录信息失效', description: '请重新登录' })
  store.dispatch('user/logout').then(() => {
    setTimeout(() => {
      window.location.reload()
    }, 1500)
  })
}

// 创建 auth axios 实例
const auth = axios.create({
  headers: {
    'Content-Type': 'application/json;charset=UTF-8',
    'X-Requested-With': 'XMLHttpRequest'
  },
  baseURL: '/', // api base_url
  timeout: 10000 // 请求超时时间 10秒钟
})

// request interceptor
auth.interceptors.request.use(config => {
  const token = Vue.ls.get(ACCESS_TOKEN)
  if (token) {
    config.headers[ 'Authorization' ] = 'JWT '+ token // 让每个请求携带自定义 token 请根据实际情况自行修改
  }
  return config
}, err)

// response interceptor
auth.interceptors.response.use(
  response => {
    if (response.code === 10140) {
      loginTimeOut()
    } else {
      return response.data
    }
  }, 
  error => { // 错误处理
    console.log(error.response, 'come here')
    if(error.response && error.response.status === 403) {
      notice({
          title: '未授权，你没有访问权限，请联系管理员！',
      }, 'notice', 'error', 5)
      return
    }
    notice({
        title: (error.response && error.response.data && error.response.data.msg) || (error.response && `${error.response.status} - ${error.response.statusText}`),
    }, 'notice', 'error', 5)
  }
)

export {
  auth
}
