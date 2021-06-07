<template>
  <div class="row mb-3" style="max-height: 10rem">
    <div class="card mb-3 p-0">
      <div class="row g-0">
        <div class="col-md-3" style="text-align: start;">
          <img :src="cart.image_url" alt="asd" style="max-width: 100%; max-height: 10rem">
        </div>
        <div class="col-md-9 text-start">
          <div class="card-body">
            <h5 class="card-title"><strong>{{ cart.name }}</strong></h5>
            <p class="card-text mb-0" v-text="cart.description"></p>
            <p class="card-text mb-2"><strong>{{ convertPrice(cart.price) }}</strong> / <small style="color:grey">stock: {{ cart.stock }}</small></p>
            <div class="row">
              <div class="col-9">
                <p class="card-text">
                  Quantity: 
                  <input  
                    type="number"
                    :max="cart.stock" 
                    min="1"
                    v-model="cart.Cart.quantity" 
                    style="width: 75px"> 
                    <i class="fas fa-plus-circle btn" 
                      @click="updateItem(cart.Cart.quantity)">
                    </i>
                </p>
              </div>
              <div class="col-3">
                <a href="" @click.prevent="deleteItem"><i class="far fa-trash-alt" style="font-size: 30px"></i></a>
              </div>
            </div>
          </div>  
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name : 'CartItem',
  props: ['cart'],
  methods : {
    convertPrice(value) {
      const IDR = new Intl
        .NumberFormat(['en'], { style: "currency", currency: "IDR", minimumFractionDigits: 0 })
        .format(value)
      return IDR
    },
    updateItem (value) {
      const payload = {
        id      : this.cart.Cart.ProductId,
        quantity: value
      }
      this.$store.dispatch('updateItem', payload)
      this.$store.dispatch('fetchProduct')
      this.$router.go(0)
    },
    deleteItem () {
      const id = this.cart.Cart.ProductId
      this.$store.dispatch('deleteItem', id)
    }
  }
}
</script>

<style scoped>
  .card {
    border-color: #55C7F0;
    border-radius: 0;
  }
</style>