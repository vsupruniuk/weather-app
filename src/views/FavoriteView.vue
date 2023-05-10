<script>
import { defineComponent } from 'vue'

export default defineComponent({
  data() {
    return {
      envVar: import.meta.env.VITE_TEST || ''
    }
  }
})
</script>

<template>
  <div>Hello from favorite</div>
  <div v-if="envVar">{{ envVar }}</div>
  <div v-else>No env var</div>
</template>

<style></style>
