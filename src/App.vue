<script lang="ts">
import { defineComponent } from 'vue'
import HeaderNav from '@/components/Header.vue'

export default defineComponent({
  components: { HeaderNav }
})
</script>

<template>
  <HeaderNav />
  <main>
    <router-view></router-view>
  </main>
</template>

<style scoped></style>
