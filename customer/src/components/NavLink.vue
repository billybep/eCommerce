<template>
  <div class="container">
    <ul class="nav nav-tabs">
      <li class="nav-item">
        <router-link to="/welcome" class="nav-link">Home</router-link>
      </li>
      <li class="nav-item">
        <router-link to="/products" class="nav-link">Shop</router-link>
      </li>
      <li class="nav-item">
        <router-link to="/carts" class="nav-link">Cart</router-link>
      </li>
      <li class="nav-item">
        <router-link to="/about" class="nav-link">About</router-link>
      </li>
    </ul>
  </div>
</template>

<script>
export default {
  name: 'NavLink'
}
</script>

<style scoped>

</style>