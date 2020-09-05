'use strict';

/**
 * @param {Egg.Application} app - egg application
 */
module.exports = app => {
  const { router, controller } = app;

  // weather
  router.get('/weather', controller.weather.getWeather)
  router.post('/weather', controller.weather.postWeather)
};
