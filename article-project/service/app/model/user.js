'use strict';

module.exports = app => {
  const { STRING, INTEGER, DATE, NOW } = app.Sequelize;

  const User = app.model.define('users', {
    id: {type: INTEGER, primaryKey: true, autoIncrement: true},//记录id
    user_id: {type: INTEGER},//用户id
    username: {type: STRING(255), allowNull: false}, // 用户名
    password: {type: STRING(255), allowNull: false},// 密码  
    created_at: {type: DATE, defaultValue: NOW},// 创建时间
    updated_at: {type: DATE, defaultValue: NOW}// 更新时间
  }, {
    freezeTableName: true // 不自动将表名添加复数
  });

  return User;
};