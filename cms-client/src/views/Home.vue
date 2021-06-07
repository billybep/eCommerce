<template>
  <div>
    <div class="container">
      <h1 class="dashboard" >Dashboard</h1>
    </div>
    <div class="container">
      <div class="row mt-5">
        <div class="col">
          <div @click.prevent="addProduct" class="card bg-dark text-white">
            <img src="../assets/red-bg.jpg" class="card-img" alt="...">
            <div class="card-img-overlay">
              <h3 class="card-title card-txt">Add Product</h3>
              <figcaption class="blockquote-footer">
                add new product to customer
              </figcaption>
            </div>
          </div>
        </div>

        <div class="col">
          <div @click.prevent="showProduct" class="card bg-dark text-white">
            <img src="../assets/dark.gb.jpg" class="card-img" alt="...">
            <div class="card-img-overlay">
              <h3 class="card-title card-txt">Show Product</h3>
              <figcaption class="blockquote-footer">
                list all the products
              </figcaption>
            </div>
          </div>
        </div>

      </div>
    </div>
  </div>
</template>

<script>
export default {
  name : 'Home',
  methods : {
    addProduct () {
      this.$router.push('/products/add')
    },
    showProduct () {
      this.$router.push('/products')
    }
  }
}
</script>

<style scoped>
  .dashboard {
    text-align: center;
  }

  .card-img {
    max-width: 100%;
    max-height: 8rem;
  }

  .card-txt {
    color: rgb(248, 247, 247);
  }

  .blockquote-footer {
    color: rgb(241, 235, 213);
  }

</style>