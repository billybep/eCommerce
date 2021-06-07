<template>
  <div class="container">
    <div class="card mb-3">
      <div class="row g-0">
        <div class="col-md-4">
          <img class="image" src="../assets/login.jpg" alt="...">
        </div>

        <div class="col-md-8 pr-5">
          <form @submit.prevent="login">
            <div class="card-body">
              <h3 class="card-title mt-5">Login</h3>
              <div class="form-group mt-2">
                <input type="email" class="form-control" v-model="email" placeholder="email" required>
              </div>
              <div class="input-group mb-3">
                <input type="password" class="form-control" v-model="password" placeholder="password" required>
                <button class="btn btn-outline-secondary" type="submit">Ok</button>
              </div>
            </div>
          </form>
        </div>
      </div>
    </div>
  </div>
</template>

<script>


export default {
  name: 'Login',
  data () {
    return {
      email : '',
      password : ''
    }
  },
  methods: {
    login () {
      const payload = { email: this.email, password: this.password }
      this.$store.dispatch('login', payload)
    }
  }
}
</script>

<style scoped>
  .image {
    max-width: 100%;
  }

  .btn:hover {
    background-color: #A8CB76;
  }

  .card {
    max-width: 700px ;
    margin: auto;
    margin-top: 7rem;
  }
</style>