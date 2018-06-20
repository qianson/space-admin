import Vue from 'vue'
import Router from 'vue-router'
import Home from '@/pages/home/Home'
import Login from '@/pages/login/Login'
import index from '@/pages/index'
const UserAuth = resolve => require(['@/pages/userAuth/UserAuth.vue'], resolve)
const Article = resolve => require(['@/pages/article/Articles.vue'], resolve)
const Video = resolve => require(['@/pages/video/Videos.vue'], resolve)
const PublishArticle = resolve => require(['@/pages/article/PublishArticle.vue'], resolve)
const media = resolve => require(['@/pages/media/media.vue'], resolve)
Vue.use(Router)

export default new Router({
  // mode: 'history',
  // base: '/myspace/admin',
  linkActiveClass: 'routerActive',
  routes: [
    {
      path: '/',
      redirect: '/login'
    },
    {
      path: '/login',
      name: 'Login',
      component: Login
    },
    {
      path: '/home',
      component: Home,
      children: [
        {
          path: '/',
          component: index
        },
        {
          path: '/admin/userauth',
          component: UserAuth
        },
        {
          path: '/admin/articles',
          component: Article
        },
        {
          path: '/admin/videos',
          component: Video
        },
        {
          path: '/admin/publisharticle',
          component: PublishArticle
        },
        {
          path: '/admin/media',
          component: media
        }
      ]
    }
  ]
})
