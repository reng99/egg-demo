'use strict';

const Service = require('egg').Service;
const jwt = require('jsonwebtoken')

class UserService extends Service {
  async login(user) {
    const { app } = this
    const existUser = await this.getUserByUsername(user.username)
    // 用户不存在
    if(!existUser){
      return null
    }
    const passhash = existUser.password
    const equal = passhash === user.password
    // 密码不匹配
    if(!equal) {
      return false
    }
    // 通过验证
    const token = jwt.sign({user_id: existUser.user_id}, app.config.jwtSecret,{expiresIn: '7d'})
    return token
  }

  async getUserByUsername(username) {
    return this.ctx.model.User.findOne({
      where: {
        username
      }
    })
  }
}

module.exports = UserService;

