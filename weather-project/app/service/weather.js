'use strict'

const Service = require('egg').Service

class WeatherService extends Service {
  async getWeather(location) {
    const { app } = this
    const data = await app.curl('https://api.map.baidu.com/telematics/v3/weather', {
      data: {
        ak: 'zVo5SStav7IUiVON0kuCogecm87lonOj',
        output: 'json',
        location
      },
      dataType: 'json'
    });

    if(data.data.error === 0) {
      return data.data.results && data.data.results[0]
    } else {
      return {
        code: -1,
        msg: '请输入正确的城市名字'
      }
    }
  }
}

module.exports = WeatherService