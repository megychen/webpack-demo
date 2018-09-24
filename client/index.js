import Vue from 'vue'
import VueRouter from 'vue-router'
import App from './app.vue'

import './assets/styles/global.styl'
import createRouter from './config/router'

Vue.use(VueRouter)

const router = createRouter()

// 进行数据的校验
router.beforeEach((to, from, next) => {
  console.log('before each invoked')
  next()
})

router.beforeResolve((to, from, next) => {
  console.loe('before resolve invoked')
  next()
})

router.afterEach((to, from, next) => {
  console.log('after each invoked')
})

new Vue({
  router,
  render: (h) => h(App)
}).$mount('#root')
