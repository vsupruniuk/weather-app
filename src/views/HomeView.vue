<script lang="ts">
import { defineComponent } from 'vue';
import WeatherCard from '@/components/WeatherCard/WeatherCard.vue';
import { useSelectedCitiesStore } from '@/stores/cities';
import type { ICity, ICityByIP } from '@/types/City';
import { getCityByIP } from '@/api/getCityByIP';
import { v4 as uuidv4 } from 'uuid';
import { cityMock } from '@/mocks/city';

// TODO skeleton loaders

export default defineComponent({
  components: { WeatherCard },
  setup() {
    const cities = useSelectedCitiesStore();

    return { cities };
  },
  mounted() {
    if (this.cities.cities.length) {
      return;
    }

    let selectedCities: ICity[];

    try {
      selectedCities = JSON.parse(localStorage.getItem('selectedCities') || '[]');
    } catch (err) {
      selectedCities = [];
    }

    if (selectedCities.length) {
      this.cities.addCities(selectedCities);
    } else {
      getCityByIP()
        .then(({ data }: { data: ICityByIP }) => {
          selectedCities.push({
            name: data.city,
            id: uuidv4(),
            local_names: {},
            lat: data.latitude,
            lon: data.longitude,
            country: data.country,
            isFavorite: false
          });
        })
        .catch((err) => {
          selectedCities.push({
            ...cityMock,
            id: uuidv4()
          });
        })
        .finally(() => {
          this.cities.addCities(selectedCities);
        });
    }
  },
  methods: {
    addCity() {
      getCityByIP()
        .then(({ data }: { data: ICityByIP }) => {
          this.cities.addCity({
            name: data.city,
            id: uuidv4(),
            local_names: {},
            lat: data.latitude,
            lon: data.longitude,
            country: data.country,
            isFavorite: false
          });
        })
        .catch((err) => {
          this.cities.addCity({
            ...cityMock,
            id: uuidv4()
          });
        });
    }
  }
});
</script>

<template>
  <div class="wrapper">
    <WeatherCard
      v-for="city of cities.cities"
      :key="city.id"
      :city="city"
      @toggleFavorites="cities.toggleFavorite($event)"
    />

    <div v-if="cities.cities.length < 5" class="add-button" @click="addCity">
      <button class="btn">
        <img src="src/img/plus.svg" alt="add" />
      </button>
    </div>
  </div>
</template>
