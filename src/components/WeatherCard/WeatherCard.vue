<script lang="ts">
import { defineComponent, PropType } from 'vue';
import WeatherCardHeader from '@/components/WeatherCard/WeatherCardHeader.vue';
import type { ICity } from '@/types/City';
import { useFavoriteCitiesStore } from '@/stores/favoriteCity';

export default defineComponent({
  name: 'WeatherCard',
  components: { WeatherCardHeader },
  emits: ['toggleFavorites'],
  setup() {
    const favoriteCities = useFavoriteCitiesStore();

    return { favoriteCities };
  },
  props: {
    city: { type: Object as PropType<ICity>, required: true }
  },
  computed: {
    cityName(): string {
      const { city } = this;

      return `${city.name}, ${city.country}`;
    }
  },
  methods: {
    addToFavorite() {
      if (this.city.isFavorite) {
        return;
      }

      this.$emit('toggleFavorites', this.city.id);
      this.favoriteCities.addFavoriteCity(this.city);
    }
  }
});
</script>

<template>
  <div class="weather-card">
    <WeatherCardHeader
      :cityName="cityName"
      :isFavorite="city.isFavorite"
      :cityId="city.id"
      @addFavorite="addToFavorite"
    />
  </div>
</template>

<style></style>
