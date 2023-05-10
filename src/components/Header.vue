<script>
import { defineComponent } from 'vue'

export default defineComponent({
  name: 'HeaderNav',
  computed: {
    currentUrl() {
      return this.$route.path
    }
  }
})
</script>

<template>
  <header class='header wrapper'>
      <router-link
        to="/"
        class="btn"
        :class="{ 'is-active': currentUrl === '/' }"
      >Home</router-link>

      <router-link
        to="/favorite"
        class='btn'
        :class="{'is-active': currentUrl === '/favorite'}"
      >Favorite</router-link>
  </header>
</template>

<style></style>

