/* eslint valid-jsdoc: "off" */

'use strict';

/**
 * @param {Egg.EggAppInfo} appInfo app info
 */
module.exports = appInfo => {
  /**
   * built-in config
   * @type {Egg.EggAppConfig}
   **/
  const config = exports = {};

  // use for cookie sign key, should change to your own and keep security
  config.keys = appInfo.name + '_1599553087176_9686';

  // add your middleware config here
  config.middleware = [];

  // add your user config here
  const userConfig = {
    // myAppName: 'egg',
  };

  config.security= {
    csrf: { // 处理csrf
      enable: false,
      ignoreJSON: true
    },
    domainWhiteList: ['http://localhost:7000','http://127.0.0.1:7000'] // 相关的白名单
  }

  // token凭证
  config.jwtSecret = 'pangjiaming';
  
  // cookie name config
  config.auth_cookie_name = 'token';

  // Sequelize config，这是必须的
  config.sequelize = {
    dialect: 'mysql',
    host: '127.0.0.1',
    port: 3306,
    database: 'instagram',
    username: 'reng',
    password: '123456',
    operatorsAliases: false
  };

  return {
    ...config,
    ...userConfig,
  };
};
