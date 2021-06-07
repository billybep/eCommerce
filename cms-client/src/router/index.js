import Vue from 'vue'
import VueRouter from 'vue-router'
import Home from '../views/Home.vue'
import Login from '../views/Login.vue'

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    name: 'Home',
    component: Home
  },
  { 
    path: '/login', 
    name: 'Login', 
    component : Login,
    beforeEnter : ( _1, _2, next) => {
      if (localStorage.access_token) next({ name: 'Home' })
      else next()
    }
  },
  { 
    path: '/products/add',
    name: 'AddProduct',
    component : _ => import('../views/FormAddProduct.vue')
  },
  {
    path: '/products/update',
    name: 'UpdateProduct',
    component : _ => import('../views/FormUpdateProduct.vue')
  },
  { path: '/products', name: 'ShowProduct', component : _ => import('../views/FormShowProducts.vue')},
  { path: '/:notFound(.*)', component : _ => import('../views/ErrorPage.vue') }
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

router.beforeEach((to, _ , next) => {
  if (to.name !== 'Login' && !localStorage.access_token) next({ name: 'Login' })
  else next()
})

export default router
