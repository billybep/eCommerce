import Vue from 'vue'
import Vuex from 'vuex'
import axios from '../api/axios'
import router from '../router/index'

Vue.use(Vuex)

const store = new Vuex.Store({
  state: {
    products : [],
    isLogin  : false
  },
  mutations: {
    FECTCH_PRODUCTS (state, data) {
      state.products = data
    },
    setLogin (state, value) {
      state.isLogin = value
    }
  },
  actions: {
    login( context , payload) {
      const userData = { email : payload.email, password : payload.password }
      axios
        .post('/login', userData)
        .then(({data}) => {
          localStorage.setItem('access_token', data.access_token)
          context.commit('setLogin', true)
          router.push('/')
        })
        .catch((err) => console.log(err))
    },
    fectchProducts (context) {
      axios
        .get('/products')
        .then(({ data }) => {
          context.commit('FECTCH_PRODUCTS', data.products)
        })
        .catch((err) => console.log(err))
    },
    addProduct (context, payload) {
      axios
        .post('/products', payload, { 
          headers: {
            'Access-Control-Allow-Origin': true,
            'access_token' : localStorage.access_token 
          } 
        })
        .then( _ => {
          context.dispatch('fectchProducts')
          router.push('/products')
        })
        .catch((err) => console.log(err))
    },
    updateProduct (context, payload) {
      const id = payload.id
      const newDataUpdate = {
        name          : payload.name,
        description   : payload.description,
        image_url     : payload.image_url ,
        price         : payload.price,
        stock         : payload.stock
      }

      axios
        .put(`/products/${id}`, newDataUpdate, { headers: {
          'Access-Control-Allow-Origin' : true,
          'access_token' : localStorage.access_token
        }})
        .then( _ => {
          console.log('Product updated!')
          context.dispatch('fectchProducts')
          router.push('/products')
        })
        .catch((err) => console.log(err))
    },
    deleteProduct (context, id) {
      axios
        .delete(`/products/${id}`, { 
          headers: { 
            'Access-Control-Allow-Origin' : true, 
            'access_token' : localStorage.access_token 
          } 
        })
        .then( _ => {
          console.log('Product has been delete!')
          context.dispatch('fectchProducts')
        })
        .catch((err) => console.log(err))
    }
  }
})

export default store