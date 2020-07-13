// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import ElementUI from 'element-ui'
import 'element-ui/lib/theme-chalk/index.css'
import App from './App'
import router from './router'
Vue.config.productionTip = false
Vue.use(ElementUI)
/* eslint-disable no-new */
// router.beforeEach((to, from, next) => {
//   if (to.path !== '/login') {
//     let userInfo = JSON.parse(sessionStorage.getItem('userInfo'))
//     if (userInfo) {
//       if (userInfo.expiresTime < Date.now()) {
//         sessionStorage.removeItem('userInfo')
//         Vue.$message({
//           message: '登录已过期',
//           type: 'error',
//           duration: 1000,
//           onClose: function () {
//             next({
//               path: '/login'
//             })
//           }
//         })
//       } else {
//         next()
//       }
//     } else {
//       next({
//         path: '/login'
//       })
//     }
//   } else {
//     next()
//   }
// })
new Vue({
  el: '#app',
  router,
  components: { App },
  template: '<App/>'
})
