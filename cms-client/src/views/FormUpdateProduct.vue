<template>
  <div class="container">
    <div class="row">
      <div class="col-6 form border border-dark mt-5">
        <div class="row d-flex justify-content-center">
          <h1>Form Update Product</h1>
        </div>
        <form @submit.prevent="updateProduct">
          <div class="form-group mt-4">
            <input type="text" class="form-control" placeholder="Product name" v-model="name">
          </div>
          <div class="form-group">
            <textarea class="form-control" rows="2" placeholder="Description" v-model="description"></textarea>
          </div>
          <div class="form-group">
            <textarea class="form-control" rows="2" placeholder="Image URL" v-model="image_url"></textarea>
          </div>
          
          <div class="row">
            <div class="col">
              <div class="input-group">
                <div class="input-group-prepend">
                  <span class="input-group-text"><i class="fas fa-dollar-sign"></i></span>
                </div>
                <input type="number" class="form-control"  placeholder="Price" v-model="price" required>
              </div>
            </div>
            <div class="col">
              <div class="input-group">
                <div class="input-group-prepend">
                  <span class="input-group-text"><i class="fas fa-box-open"></i></span>
                </div>
                <input type="number" class="form-control" placeholder="Stock" v-model="stock" required>
              </div>
            </div>
          </div>

          <button type="submit" class="btn btn-primary mt-4">Update Product</button>
        </form>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name : 'FormUpdateProduct',
  data () {
    return {
      name          : '',
      description   : '',
      image_url     : '',
      price         : '',
      stock         : ''
    }
  },
  created () {
    this.name        = this.$route.params.data.name
    this.description = this.$route.params.data.description
    this.image_url   = this.$route.params.data.image_url,
    this.price       = this.$route.params.data.price,
    this.stock       = this.$route.params.data.stock
    this.id          = this.$route.params.data.id
  },
  methods : {
    updateProduct () {
      const dataToUpdate = {
        id            : this.$route.params.data.id,
        name          : this.name,
        description   : this.description,
        image_url     : this.image_url ,
        price         : this.price,
        stock         : this.stock
      }
      
      this.$store.dispatch('updateProduct', dataToUpdate)
    }
  }
}
</script>

<style scoped>
  label {
    text-align: left;
  }

  .border {
    border-radius: 10px;
    margin: 10px 10px;
    padding: 25px 25px;
  }
  .title {
    text-align: center;
    text-justify: newspaper;
  }
  .form {
    margin: auto;
  }
</style>