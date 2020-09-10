import Vue from 'vue'
import App from './App.vue'
import VueRouter from 'vue-router'
import router from './router/index'
import store from './store/index'
import './core/use'
import bootstrap from './core/bootstrap'
import { ApiPlugin } from '@/api'

Vue.config.productionTip = false

Vue.use(VueRouter)
Vue.use(ApiPlugin)

new Vue({
  store,
  router,
  created () {
    bootstrap()
  },
  render: h => h(App),
}).$mount('#app')
