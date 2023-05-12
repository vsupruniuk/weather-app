<script>
import { defineComponent } from 'vue';
import { useFavoriteCitiesStore } from '@/stores/favoriteCity';

export default defineComponent({
  setup() {
    const favoriteCities = useFavoriteCitiesStore();

    return { favoriteCities };
  }
});
</script>

<template>
  <h1>{{ favoriteCities.favoriteCities.length }}</h1>
  <div v-for="city of favoriteCities.favoriteCities" :key="city.id">
    {{ city.name }}, {{ city.country }}, {{ `${city.isFavorite}` }}
  </div>
</template>

<style></style>
