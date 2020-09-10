const jwt = require('jsonwebtoken')

// 扩展一些框架便利的方法
module.exports = {
  get jwt() {
    return jwt
  },
  get user() {
    let token = this.cookies.get('token')
    let user = jwt.verify(token, this.app.config.jwtSecret)
    return user
  },
  /**
   * 返回客户端的内容
   * @param status // 返回状态
   * @param msg // 返回信息提示
   * @param data // 返回数据
   * @param code // 返回状态码
   */
  returnBody (status, msg, data = {}, code) {
    this.status = status
    this.body = {
      data,
      msg,
      code
    }
  },
}