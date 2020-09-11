'use strict';

const Service = require('egg').Service;

class ArticleService extends Service {
  async findArticle(obj) {
    const { ctx } = this
    return await ctx.model.Article.findAndCountAll({
      order: [['created_at', 'ASC']],
      offset: (parseInt(obj.page) - 1) * parseInt(obj.page_size),
      limit: parseInt(obj.page_size)
    })
  }

  async getArticle(id) {
    const { ctx } = this
    return await ctx.model.Article.findOne({
      where: {
        id
      }
    })
  }

  async addArticle(data) {
    const { ctx } = this
    return await ctx.model.Article.create(data)
  }

  async editArticle(id, data) {
    const { ctx } = this
    return await ctx.model.Article.update(data, {
      where: {
        id
      }
    })
  }

  async deleteArticle(id) {
    const { ctx } = this
    return await ctx.model.Article.destroy({
      where: {
        id
      }
    })
  }
}

module.exports = ArticleService;
