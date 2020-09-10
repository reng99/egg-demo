'use strict';

/**
 * @param {Egg.Application} app - egg application
 */
module.exports = app => {
  const { router, controller } = app;
  const { login, article } = controller

  // login
  router.post('/api/login', login.loginIn) // 登录

  // article
  router.get('/api/get-article-list', article.getList) // 获取列表信息
  router.get('/api/get-article', article.getItem) // 获取一篇文章信息
  router.post('/api/post-article', article.postItem) // 添加一篇文章
  router.put('/api/put-article', article.putItem) // 更新一篇文章
  router.delete('/api/delete-article', article.deleteItem) // 删除一篇文章
};
