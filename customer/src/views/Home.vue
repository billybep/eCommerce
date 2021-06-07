<template>
  <div class="home">
    <TitleBar />
    <NavLink />
    <router-view
      :products="products"
    />
  </div>
</template>

<script>
// @ is an alias to /src
import HelloWorld from '@/components/HelloWorld.vue'
import TitleBar from '../components/TitleBar'
import NavLink from '../components/NavLink'

export default {
  name: 'Home',
  created() {
    this.$store.dispatch('fetchProduct')
  },
  computed: {
    products() {
      return this.$store.state.products
    }
  },
  components: {
    HelloWorld,
    TitleBar,
    NavLink
  }
}
</script>
