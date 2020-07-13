import Vue from 'vue';
import Router from 'vue-router';
import admin from '@/components/admin';
import Login from '@/components/Login';
import index from '@/pages/index';
import basicDataManage from '@/modules/basicDataManage/routers';

Vue.use(Router)

export default new Router({

  linkActiveClass: 'routerActive',
  routes: [
    {
      path: '/login',
      name: 'Login',
      component: Login
    },
    {
      path: '/',
      redirect: '/admin'
    },
    {
      path: '/admin',
      name: 'admin',
      component: admin,
      children: [
        ...basicDataManage
      ]
    },
  ]
})
