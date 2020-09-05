'use strict';

const Controller = require('egg').Controller;

class WeatherController extends Controller {
  async getWeather() {
    const { ctx, service } = this;
    const data = await service.weather.getWeather('广州')
    await ctx.render('weather', { data })
  }

  async postWeather() {
    const { ctx, service } = this;
    const location = ctx.request.body.location
    const data = await service.weather.getWeather(location)
    await ctx.render('weather', { data })
  }
}

module.exports = WeatherController;