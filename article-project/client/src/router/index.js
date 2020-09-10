import Vue from 'vue'
import Router from 'vue-router'
import Index from '@/views/index'
import { UserLayout, BlankLayout } from '@/components/layouts'
import NProgress from 'nprogress' // progress bar
import 'nprogress/nprogress.css' // progress bar style

const whiteList = ['login'] // no redirect whitelist

import { getStore } from "@/utils/storage"

Vue.use(Router)

const router = new Router({
  routes: [
    {
        path: '/',
        name: 'index',
        redirect: '/dashboard/workplace',
        component: Index,
        children: [
          {
            path: 'dashboard/workplace',
            name: 'dashboard',
            component: () => import('@/views/dashboard')
          },
          {
            path: 'article/list',
            name: 'article_list',
            component: () => import('@/views/article/list')
          },
          {
            path: 'article/info',
            name: 'article_info',
            component: () => import('@/views/article/info')
          }
        ]
    },
    {
      path: '/user',
      component: UserLayout,
      redirect: '/user/login',
      // hidden: true,
      children: [
        {
          path: 'login',
          name: 'login',
          component: () => import(/* webpackChunkName: "user" */ '@/views/user/login')
        }
      ]
    },
    {
      path: '/exception',
      component: BlankLayout,
      redirect: '/exception/404',
      children: [
        {
          path: '404',
          name: '404',
          component: () => import(/* webpackChunkName: "user" */ '@/views/exception/404')
        }
      ]
    },
    {
      path: '*',
      component: () => import(/* webpackChunkName: "user" */ '@/views/exception/404')
    }
  ],
  // base: process.env.BASE_URL,
  scrollBehavior: () => ({ y: 0 }),
})

router.beforeEach((to, from, next) => {
  NProgress.start() // start progress bar
  if(getStore('token', false)) { // 有token
    if(to.name === 'index' || to.path === '/index' || to.path === '/') {
      next({ path: '/dashboard/workplace'})
      NProgress.done()
      return false
    }
    next()
  } else {
    if(to.path !== '/user/login') {
      (new Vue()).$notification['error']({
        message: '验证失效，请重新登录！'
      })
    }
    if(whiteList.includes(to.name)) {
      // 在免登录白名单，直接进入
      next()
    } else {
      next({
        path: '/user/login',
        query: {
          redirect: to.fullPath
        }
      })
      NProgress.done()
    }
  }
  next()
})

router.afterEach(route => {
  NProgress.done()
})

export default router
  