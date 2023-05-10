<script lang="ts">
import { defineComponent } from 'vue'
import WeatherCard from '@/components/WeatherCard.vue'

export default defineComponent({
  components: { WeatherCard }
})
</script>

<template>
  <div class="wrapper">
    <WeatherCard />
  </div>
</template>
