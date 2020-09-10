'use strict';

const { returnBody } = require('../extend/context');

const Controller = require('egg').Controller;

class ArticleController extends Controller {
  async getList() {
    const { ctx } = this
    const { page, page_size } = ctx.request.query
    let lists = await ctx.service.article.findArticle({ page, page_size })
    ctx.returnBody(200, '获取文章列表成功！', {
      count: lists && lists.count || 0,
      results: lists && lists.rows || []
    }, '00000')
  }

  async getItem() {
    const { ctx } = this
    const { id } = ctx.request.query
    let articleDetail = await ctx.service.article.getArticle(id)
    if(!articleDetail) {
      ctx.returnBody(400, '不存在此条数据！', {}, '00001')
      return
    }
    ctx.returnBody(200, '获取文章成功！', articleDetail, '00000')
  }

  async postItem() {
    const { ctx } = this
    const {
      author,
      title,
      content,
      group
    } = ctx.request.body

    // 新文章
    let newArticle = {
      author,
      title,
      content,
      group
    }

    let article = await ctx.service.article.addArticle(newArticle)
    
    if(!article) {
      ctx.returnBody(400, '网络错误，请稍后再试！', {}, '00001')
      return
    }
    ctx.returnBody(200, '新建文章成功!', article, '00000')
  }

  async putItem() {
    const { ctx } = this
    const { id } = ctx.request.query
    const {
      author,
      title,
      content,
      group
    } = ctx.request.body

    // 存在文章
    let editArticle = {
      author,
      title,
      content,
      group
    }

    let article = await ctx.service.article.editArticle(id, editArticle)
    
    if(!article) {
      ctx.returnBody(400, '网络错误，请稍后再试！', {}, '00001')
      return
    }
    ctx.returnBody(200, '编辑文章成功!', article, '00000')
  }

  // 删除文章
  async deleteItem() {
    const { ctx } = this
    const { id } =  ctx.request.query
    let articleDetail = await ctx.service.article.deleteArticle(id)
    if(!articleDetail) {
      ctx.returnBody(400, '不存在此条数据！', {}, '00001')
      return
    }
    ctx.returnBody(200, '删除文章成功！', articleDetail, '00000')
  }
}

module.exports = ArticleController;
