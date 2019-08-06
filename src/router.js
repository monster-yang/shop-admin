import Vue from 'vue'
import VueRouter from 'vue-router'
// CDN 首屏优化
import Login from './components/login/Login.vue'
// 异步处理
const Home = () => import('./components/home/Home.vue')
const Users = () => import('./components/users/Users.vue')
const Roles = () => import('./components/roles/Roles.vue')
const Rights = () => import('./components/rights/Rights.vue')
const Categories = () => import('./components/categories/Categories.vue')
const Goods = () => import('./components/goods/Goods.vue')
const GoodsAdd = () => import('./components/goods/GoodsAdd.vue')
Vue.use(VueRouter)

const router = new VueRouter({
  routes: [
    { path: '/', redirect: '/login' },
    { path: '/login', component: Login },
    {
      path: '/home',
      component: Home,
      children: [
        { path: '/users/:page?', component: Users },
        { path: '/roles', component: Roles },
        { path: '/rights', component: Rights },
        { path: '/categories', component: Categories },
        { path: '/goods', component: Goods },
        { path: '/goods-add', component: GoodsAdd }
      ]
    }
  ]
})
router.beforeEach((to, from, next) => {
  if (to.path === '/login') {
    next()
  } else {
    let token = localStorage.getItem('token')
    token ? next() : next('/login')
  }
})

export default router
