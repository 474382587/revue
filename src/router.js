import Vue from 'vue'
import Router from 'vue-router'
import Home from './views/Home.vue'
import Application from './views/Application.vue'
import ArticleArchive from './views/ArticleArchive.vue'
import Article from './views/Article.vue'
import Login from './views/Login.vue'
import PostArchive from './views/PostArchive.vue'
import PostDetail from './views/PostDetail.vue'
import PublishArticle from './views/PublishArticle.vue'
import Register from './views/Register.vue'
import Rewards from './views/Rewards.vue'
import UserDashboard from './views/UserDashboard.vue'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'home',
      component: Home
    },
    {
      path: '/login',
      name: 'login',
      // route level code-splitting
      // this generates a separate chunk (about.[hash].js) for this route
      // which is lazy-loaded when the route is visited.
      component: Login
    },
    {
      path: '/register',
      name: 'register',
      // route level code-splitting
      // this generates a separate chunk (about.[hash].js) for this route
      // which is lazy-loaded when the route is visited.
      component: Register
    },
    {
      path: '/application',
      name: 'application',
      // route level code-splitting
      // this generates a separate chunk (about.[hash].js) for this route
      // which is lazy-loaded when the route is visited.
      component: Application
    },
    {
      path: '/article-archive',
      name: 'article-archive',
      // route level code-splitting
      // this generates a separate chunk (about.[hash].js) for this route
      // which is lazy-loaded when the route is visited.
      component: ArticleArchive
    },
    {
      path: '/article',
      name: 'article',
      // route level code-splitting
      // this generates a separate chunk (about.[hash].js) for this route
      // which is lazy-loaded when the route is visited.
      component: Article
    },
    {
      path: '/post-archive',
      name: 'post-archive',
      // route level code-splitting
      // this generates a separate chunk (about.[hash].js) for this route
      // which is lazy-loaded when the route is visited.
      component: PostArchive
    },
    {
      path: '/post-detail',
      name: 'post-detail',
      // route level code-splitting
      // this generates a separate chunk (about.[hash].js) for this route
      // which is lazy-loaded when the route is visited.
      component: PostDetail
    },
    {
      path: '/publish-article',
      name: 'publish-article',
      // route level code-splitting
      // this generates a separate chunk (about.[hash].js) for this route
      // which is lazy-loaded when the route is visited.
      component: PublishArticle
    },
    {
      path: '/rewards',
      name: 'rewards',
      // route level code-splitting
      // this generates a separate chunk (about.[hash].js) for this route
      // which is lazy-loaded when the route is visited.
      component: Rewards
    },
    {
      path: '/dashboard',
      name: 'dashboard',
      // route level code-splitting
      // this generates a separate chunk (about.[hash].js) for this route
      // which is lazy-loaded when the route is visited.
      component: UserDashboard
    }
  ]
})
