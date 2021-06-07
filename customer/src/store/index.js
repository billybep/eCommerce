import Vue from 'vue'
import Vuex from 'vuex'
import axios from '../api/axios'
import router from '../router/index'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    currentUser : {},
    products    : [],
    carts       : [],
    isLogin     : ''
  },
  mutations: {
    setLogin (state, value) {
      state.isLogin = value
    },
    FECTH_PRODUCT (state, payload) {
      state.products = payload
    },
    loggedUser (state, userData) {
      state.currentUser = userData
    },
    carts (state, userCartItem) {
      state.carts = userCartItem
    }
  },
  actions: {
    fetchProduct (context) {
      axios
        .get('/products')
        .then(({ data }) => {
          context.commit('FECTH_PRODUCT', data.products)
        })
        .catch((err) => console.log(err))
    },
    fetchCart (context) {
      axios
        .get('/customers', { headers : {
          'Access-Control-Allow-Origin': true,
          access_token : localStorage.access_token
          } 
        })
        .then(({ data }) => {
          context.commit('carts', data.cartItems[0].Products)
        })
        .catch((err) => console.log(err))
    },
    addCart ( _ , payload) {
      axios
        .post('/customers', payload, { headers : {
          'Access-Control-Allow-Origin': true,
          access_token : localStorage.access_token
          } 
        })
        .then( _ => {
          router.push({ name: 'CartPage' })
        })
        .catch((err) => console.log(err))
    },
    updateItem ( _ , payload) {
      console.log(payload);
      axios
        .put(`/customers/${payload.id}`, 
          { quantity: payload.quantity }, 
          { 
            headers : 
            {
              'Access-Control-Allow-Origin': true,
              access_token : localStorage.access_token
            } 
        })
        .then( a => {
          console.log(a,' sukses update');
        } )
        .catch((err) => console.log(err))
    },
    deleteItem ( _ , id) {
      axios
        .delete(`/customers/${id}`, { headers : {
          'Access-Control-Allow-Origin': true,
          access_token : localStorage.access_token
          } 
        })
        .then( _ => router.go(0) )
        .catch((err) => console.log(err))
    },
    signIn (context , payload) {
      axios
        .post('/login', payload)
        .then(({ data }) => {
          const dataUser = {
            id        : data.id,
            username  : data.username
          }
          console.log('Success Login', data.username)
          localStorage.setItem('access_token', data.access_token)
          context.commit('loggedUser', dataUser)
          context.commit('setLogin', true)
          router.push({ name: 'WelcomePage' })
        })
        .catch((err) => console.log(err))
    },
    signUp ( _, payload) {
      axios
        .post('/register', payload)
        .then( _ => {
          console.log('Success, signin and shooping now')
          router.push({ name: 'SignIn' })
        })
        .catch((err) => console.log(err))
    },
    googleLogin ( context, idToken) {
      axios
        .post('/googleLogin', { idToken })
        .then(({ data }) => {
          const dataUser = {
            id        : data.id,
            username  : data.username
          }
          console.log('Success Login', data)
          localStorage.setItem('access_token', data.access_token)
          context.commit('loggedUser', dataUser)
          context.commit('setLogin', true)
          router.push({ name: 'WelcomePage' })
        })
        .catch((err) => console.log(err))
    }
  },
  modules: {
  }
})
