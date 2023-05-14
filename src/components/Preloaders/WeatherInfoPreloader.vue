<script lang="ts">
import { defineComponent } from 'vue';

export default defineComponent({
  name: 'WeatherInfoPreloader'
});
</script>

<template>
  <div class="skeleton"></div>
</template>

<style scoped>
.skeleton {
  width: 100%;
  height: 600px;
  border-radius: 8px;
}
</style>
