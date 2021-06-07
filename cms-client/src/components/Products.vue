<template>
  <div class="col-3">
    <div class="card" style="width: 19rem;">
      <div class="card-body">
        <img :src="product.image_url" class="card-img-top rounded-lg" :alt="product.image_url">
        <h5 class="card-title mt-2 mb-0 lead" v-text="product.name"></h5>
        <p class="card-text small" v-text="product.description"></p>
        <div class="row container p-0 mr-0">
          <div class="col-8">

          <p class="card-text small"><strong>{{convertPrice(product.price)}}</strong></p>
          </div>
          <div class="col-4 mr-0 pr-0">
          <p class="card-text small text-right">Stock: {{product.stock}}</p>

          </div>
        </div>
        
        <div class="row m-0 mt-2">
          <button 
            type="button" 
            class="btn btn-info col "
            @click="updateProduct">Edit</button>
          <button 
            type="button" 
            class="btn btn-danger col " 
            @click="deleteProduct">Delete</button>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'ProductCard',
  props: ['product'],
  methods: {
    convertPrice(value) {
      const IDR = new Intl
        .NumberFormat(['en'], { style: "currency", currency: "IDR", minimumFractionDigits: 0 })
        .format(value)
      return IDR
    },
    updateProduct () {
      this.$router.push({ name: 'UpdateProduct', params: { data: this.product } })
    },
    deleteProduct () {
      this.$store.dispatch('deleteProduct', this.product.id)
    }
  }
}
</script>

<style scoped>
  .card-img-top {
    max-height: 10rem; 
    object-fit: cover;
  }
  .col {
    margin: 10px;
  }
</style>