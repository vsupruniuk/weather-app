<script lang="ts">
import { defineComponent } from 'vue';

export default defineComponent({
  name: 'WeatherCardPreloader'
});
</script>

<template>
  <div class="skeleton"></div>
</template>

<style scoped>
.skeleton {
  width: 100%;
  height: 700px;
}
</style>
