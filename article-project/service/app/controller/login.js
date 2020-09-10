'use strict';

const Controller = require('egg').Controller;

class LoginController extends Controller {
  async loginIn() {
    const { ctx } = this
    const { username, password } = ctx.request.body
    
    // 登录
    const token = await ctx.service.user.login({ username, password })

    if(!token) {
      ctx.returnBody(400, "账号或密码出错!", {
        username
      }, '00001')
      return
    }
    // 设置cookie
    const opts = {
      path: '/',
      maxAge: 1000 * 60 * 60 * 24 * 1, // 一天的时间
      httpOnly: false,
      domain: '127.0.0.1'
    }
    ctx.cookies.set(this.config.auth_cookie_name, token, opts)

    ctx.returnBody(200, "登录成功!", {
      username,
      token
    }, '00000')
  }
}

module.exports = LoginController;