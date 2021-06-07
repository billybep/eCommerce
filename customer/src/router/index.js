import Vue from 'vue'
import VueRouter from 'vue-router'
import Home from '../views/Home.vue'

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    name: 'Home',
    component: Home,
    children: [
      {
        path: 'welcome',
        name: 'WelcomePage',
        component: _ => import('../views/WelcomePage.vue')
      },
      {
        path: 'products',
        name: 'ProductPage',
        component: _ => import('../views/ProductPage.vue')
      },
      {
        path: 'carts',
        name: 'CartPage',
        component: _ => import('../views/CartPage.vue'),
        beforeEnter: ( _1, _2, next) => {
          if (!localStorage.access_token) next({ name: 'SignIn' })
          else next()
        }
      },
      {
        path: 'about',  
        name: 'AboutChild',
        component: _ => import('../views/About.vue'),
      },
    ]
  },
  {
    path: '/signin',
    name: 'SignIn',
    component: _ => import('../views/SignIn.vue'),
    beforeEnter: ( _1, _2, next) => {
      if (localStorage.access_token) next({ name: 'WelcomePage' })
      else next()
    }
  },
  {
    path: '/signup',
    name: 'SignUp',
    component: _ => import('../views/SignUp.vue'),
    beforeEnter: ( _1, _2, next) => {
      if (localStorage.access_token) next({ name: 'WelcomePage'})
      else next()
    }
  }
]


const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})


export default router
