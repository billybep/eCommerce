<template>
  <nav class="navbar navbar-dark bg-dark">
    <div class="container">
      <div class="col-6 left">
        <span class="navbar-brand mb-0 h1 icon">
          <router-link class="icon" to="/">eC_Project</router-link> 
        </span>
      </div>
      <div class="col-6 right" style="color: white">
        <a v-if="isLogin" @click.prevent="signout" class="icon btn" >
        Sign Out <i class="fas fa-sign-in-alt"></i>
        </a>
        <router-link v-else class="icon" to="/signin">
        Sign In <i class="fas fa-sign-in-alt"></i>
        </router-link>
      </div>
    </div>
  </nav>
</template>

<script>
export default {
  name    : 'Navbar',
  beforeCreate () {
    if (localStorage.access_token) this.$store.commit('setLogin', true)
    else this.$store.commit('setLogin', false)
  },
  computed: {
    isLogin () {
      return this.$store.state.isLogin
    }
  },
  methods: {
    signout () { 
      localStorage.clear()
      this.$store.commit('setLogin', false)
      this.$router.push({ name: 'WelcomePage' }).catch(()=>{})
    }
  }
}
</script>

<style scoped>
  .icon {
    text-decoration: none;
    color: floralwhite;
  }

  .icon:hover {
    color: #5CCEF7;
  }

  .right {
    text-align: end;
    justify-content: right;
  }
</style>
