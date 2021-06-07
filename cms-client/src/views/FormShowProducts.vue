<template>
  <div class="container-fluid m-1 p-1">
    <div class="row d-flex justify-content-center mt-4 mb-4"><h1>List Products</h1></div>
    <div class="row m-2">
      <Product 
        class="card-item m1"
        v-for="product in products"
        :key="product.id"
        :product="product">
      </Product>  
    </div>
  </div>
</template>

<script>
import Product from '../components/Products'
import { mapState } from 'vuex'

export default {
  name: 'ShowProduct',
  created () {
    this.$store.dispatch('fectchProducts')
  },
  components: { Product },
  computed: {
    ...mapState(['products'])
  }
}
</script>

<style scoped>
  .card-item {
    margin-bottom: 25px;
  }
</style>