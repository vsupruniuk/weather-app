<script lang="ts">
import { defineComponent, PropType } from 'vue';
import WeatherCardHeader from '@/components/WeatherCard/WeatherCardHeader.vue';
import type { ICity } from '@/types/City';
import { useFavoriteCitiesStore } from '@/stores/favoriteCity';
import WeatherInfo from '@/components/WeatherCard/WeatherInfo.vue';
import { getWeather } from '@/api/getWeather';
import { separateWeatherByDays } from '@/helpers/separateWeatherByDays';
import type { IWeatherItem } from '@/types/Weather';

export default defineComponent({
  name: 'WeatherCard',
  components: { WeatherInfo, WeatherCardHeader },
  emits: ['toggleFavorites', 'deleteCard', 'openFavoriteLimitModal'],
  setup() {
    const favoriteCities = useFavoriteCitiesStore();

    return { favoriteCities };
  },
  data() {
    return {
      weather: [] as IWeatherItem[][]
    };
  },
  props: {
    city: { type: Object as PropType<ICity>, required: true }
  },
  mounted() {
    const { city } = this;

    getWeather(city.lat, city.lon)
      .then((data) => (this.weather = separateWeatherByDays(data.data)))
      .catch(() => (this.weather = [[]]));
  },
  updated() {
    const { city } = this;

    getWeather(city.lat, city.lon)
      .then((data) => (this.weather = separateWeatherByDays(data.data)))
      .catch(() => (this.weather = [[]]));
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

      if (this.favoriteCities.favoriteCities.length >= 5) {
        this.$emit('openFavoriteLimitModal');

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

    <WeatherInfo :weather="weather" />

    <div class="weather-card-delete">
      <button @click="$emit('deleteCard', city.id)">
        <img src="src/img/trash.svg" alt="delete" />
      </button>
    </div>
  </div>
</template>

<style></style>
