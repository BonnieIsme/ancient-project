import Vue from 'vue'
import {Notification, Loading, Menu, Submenu, MenuItem, Select, Option, Divider } from 'element-ui'
import App from './App.vue'
import VueRouter from 'vue-router'
import router from './route/index'
import './style/normalize.css'

Vue.use(VueRouter)
  .use(Menu).use(Submenu).use(MenuItem)
  .use(Select).use(Option).use(Divider)
  .use(Loading)


Vue.config.productionTip = false
Vue.prototype.$notify = Notification

new Vue({
  render: h => h(App),
  router: router
}).$mount('#app')

let loading = null

export function startLoading() {
  loading = Loading.service({
    lock: true,
    text: 'loading',
    spinner:'el-icon-loading',
    background:'rgba(225, 225, 225, 0.7)'
  })
}

export function endLoading() {
  loading.close()
}