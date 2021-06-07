<template>
  <nav class="navbar navbar-light bg-light">
    <div class="container-fluid">
      <router-link class="navbar-brand" to="/">CMS - Dasboard</router-link>
      <form class="d-flex">
        <router-link class="btn btn-outline-dark" to="/" v-if="isLogin">Dashboard</router-link>
        <button class="btn btn-outline-dark ml-2" type="button" v-if="isLogin" @click="logout">Logout</button>
      </form>
    </div>
  </nav>
</template>

<script>
export default {
  name : 'Navbar',
  beforeCreate() {
    if (localStorage.access_token) this.$store.commit('setLogin', true)
    else this.$store.commit('setLogin', false)
  },
  computed: {
    isLogin () {
      return this.$store.state.isLogin
    }
  },
  methods: {
    logout () { 
      localStorage.clear()
      this.$store.commit('setLogin', false)
      this.$router.push('/login')
    }
  }
}
</script>