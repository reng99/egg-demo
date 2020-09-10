'use strict';

module.exports = app => {
  const { STRING, INTEGER, DATE, NOW, TEXT } = app.Sequelize;

  const Article = app.model.define('articles', {
    id: {type: INTEGER, primaryKey: true, autoIncrement: true},//记录id
    title: {type: STRING(255)},// 标题
    group: {type: STRING(255)}, // 分组
    author: {type: STRING(255)},// 作者  
    content: {type: TEXT}, // 内容
    created_at: {type: DATE, defaultValue: NOW},// 创建时间
    updated_at: {type: DATE, defaultValue: NOW}// 更新时间
  }, {
    freezeTableName: true // 不自动将表名添加复数
  });

  return Article;
};