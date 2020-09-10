import login from './login'
import article from './article'

const api = {
  login,
  article
}

export default api

export const ApiPlugin = {}

ApiPlugin.install = function (Vue, options) {
  Vue.prototype.api = api // 挂载api在原型上
}