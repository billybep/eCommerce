<template>
<div class="col-2 mb-3">
  <div class="card" style="max-width: 18rem;">
    <img class="card-img-top"
      :src="product.image_url"  
      :alt="product.image_url">
    <div class="card-body mt-0">
      <h6 class="card-title mb-0">{{ product.name }}</h6>
      <p class="card-text"><strong>{{ convertPrice(product.price) }}</strong></p>
      <a class="btn" @click.prevent="addCart">add to cart <i class="fas fa-cart-plus"></i></a>
    </div>
  </div>
</div>
</template>

<script>
export default {
  name    : 'ProductCard',
  props   : ['product'],
  methods : {
    convertPrice (value) {
      const IDR = new Intl
        .NumberFormat(['en'], { style: "currency", currency: "IDR", minimumFractionDigits: 0 })
        .format(value)
      return IDR
    },
    addCart () {
      const item = {
        ProductId : this.product.id,
        quantity  : 1
      }
      this.$store.dispatch('addCart', item)
      this.$store.dispatch('fetchCart')
    },
  }
}
</script>

<style scoped>
  .fas {
    font-size: 12px;
  }
  .link {
    text-decoration: none;
  }
  .card {
    border-color: rgb(85, 199, 240);
    border-radius: 0;
  }
  .card-img-top {
    height: 15rem;
    object-fit: cover;
    border-radius: 0;
  }

  .btn:hover {
    background-color:rgb(85, 199, 240);
  }
</style>