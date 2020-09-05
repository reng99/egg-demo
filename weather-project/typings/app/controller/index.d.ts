// This file is created by egg-ts-helper@1.25.8
// Do not modify this file!!!!!!!!!

import 'egg';
import ExportWeather = require('../../../app/controller/weather');

declare module 'egg' {
  interface IController {
    weather: ExportWeather;
  }
}
