<template>
  <div class="container mt-5">
    <div class="row card">
      <h1 class="title mb-5">Shopping cart</h1>
    </div>
    <div class="col-10 card">
      <Cart
        v-for="cart in carts"
        :key="cart.id"
        :cart="cart" 
      />
    </div>
  </div>
</template>

<script>
import Cart from '../components/Cart'
import { mapState } from 'vuex'

export default {
  name : 'CartPage',
  beforeCreate() {
    this.$store.dispatch('fetchCart')
  },
  computed: {
    ...mapState(['carts'])
  },
  components: {
    Cart
  }
}
</script>
  
<style>
  .card { 
    margin: auto;
    border-color: transparent;
  }
</style>