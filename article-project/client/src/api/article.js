import { auth } from '@/utils/request'

// 获取文章列表
export function getList(params) {
  return auth({
    url: '/api/get-article-list',
    method: 'get',
    params
  })
}

// 获取一篇文章信息
export function getItem(params) {
  return auth({
    url: '/api/get-article',
    method: 'get',
    params
  })
}

// 新增文章
export function postItem(data) {
  return auth({
    url: '/api/post-article',
    method: 'post',
    data
  })
}

// 编辑文章
export function putItem(params, data) {
  return auth({
    url: '/api/put-article',
    method: 'put',
    params,
    data
  })
}

// 删除文章
export function deleteItem(params) {
  return auth({
    url: '/api/delete-article',
    method: 'delete',
    params
  })
}

export default {
  getList,
  getItem,
  postItem,
  putItem,
  deleteItem
}