<script lang="ts">
import { defineComponent, PropType } from 'vue';
import WeatherCardHeader from '@/components/WeatherCard/WeatherCardHeader.vue';
import type { ICity } from '@/types/City';
import { useFavoriteCitiesStore } from '@/stores/favoriteCity';
import WeatherInfo from '@/components/WeatherCard/WeatherInfo.vue';
import { getWeather } from '@/api/getWeather';
import { separateWeatherByDays } from '@/helpers/separateWeatherByDays';
import type { IWeatherItem } from '@/types/Weather';
import { useTranslationsStore } from '@/stores/translations';

export default defineComponent({
  name: 'WeatherCard',
  components: { WeatherInfo, WeatherCardHeader },
  emits: ['toggleFavorites', 'deleteCard', 'openFavoriteLimitModal'],
  setup() {
    const favoriteCities = useFavoriteCitiesStore();
    const translations = useTranslationsStore();

    return { favoriteCities, translations };
  },
  data() {
    return {
      weather: [] as IWeatherItem[][]
    };
  },
  props: {
    city: { type: Object as PropType<ICity>, required: true },
    isFavoritePage: { type: Boolean, required: false, default: false }
  },
  mounted() {
    const { city } = this;

    getWeather(city.lat, city.lon, this.translations.locale)
      .then((data) => (this.weather = separateWeatherByDays(data.data)))
      .catch(() => (this.weather = [[]]));
  },
  computed: {
    cityName(): string {
      const { city, translations } = this;
      const localeName = city.local_names[translations.locale];

      return `${localeName || city.name}, ${city.country}`;
    }
  },
  methods: {
    reloadWeather(city: ICity): void {
      getWeather(city.lat, city.lon, this.translations.locale)
        .then((data) => (this.weather = separateWeatherByDays(data.data)))
        .catch(() => (this.weather = [[]]));
    },
    addToFavorite(): void {
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
      :is-favorite-page="isFavoritePage"
      @addFavorite="addToFavorite"
      @reload-weather="reloadWeather($event)"
    />

    <WeatherInfo :weather="weather" />

    <div class="weather-card-delete">
      <button @click="$emit('deleteCard', city.id)">
        <img src="src/img/trash.svg" alt="delete" />
      </button>
    </div>
  </div>
</template>
