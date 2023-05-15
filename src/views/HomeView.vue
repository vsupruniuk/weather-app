<script lang="ts">
import { defineComponent } from 'vue';
import WeatherCard from '@/components/WeatherCard/WeatherCard.vue';
import { useSelectedCitiesStore } from '@/stores/cities';
import type { ICity, ICityByIP } from '@/types/City';
import { getCityByIP } from '@/api/getCityByIP';
import { v4 as uuidv4 } from 'uuid';
import { cityMock } from '@/mocks/city';
import DeletingModal from '@/components/Modals/DeletingModal.vue';
import FavoriteLimitModal from '@/components/Modals/FavoriteLimitModal.vue';
import WeatherCardPreloader from '@/components/Preloaders/WeatherCardPreloader.vue';
import { searchCities } from '@/api/searchCities';

export default defineComponent({
  components: { WeatherCardPreloader, FavoriteLimitModal, DeletingModal, WeatherCard },
  setup() {
    const cities = useSelectedCitiesStore();

    return { cities };
  },
  data() {
    return {
      isDeletingModalActive: false,
      isFavoriteLimitModalActive: false,
      isCitiesLoading: false,
      cityIdToDelete: ''
    };
  },
  mounted() {
    if (this.cities.cities.length) {
      return;
    }

    this.isCitiesLoading = true;

    let selectedCities: ICity[];

    try {
      selectedCities = JSON.parse(localStorage.getItem('selectedCities') || '[]');
    } catch (err) {
      selectedCities = [];
    }

    if (selectedCities.length) {
      this.cities.addCities(selectedCities);
      this.isCitiesLoading = false;
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
        .catch(() => {
          selectedCities.push({
            ...cityMock,
            id: uuidv4()
          });
        })
        .finally(() => {
          this.cities.addCities(selectedCities);
          this.isCitiesLoading = false;
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
        .catch(() => {
          this.cities.addCity({
            ...cityMock,
            id: uuidv4()
          });
        });
    },
    prepareToDeletingCity(id: string) {
      this.isDeletingModalActive = true;
      this.cityIdToDelete = id;
    },
    closeModal() {
      this.isDeletingModalActive = false;
      this.isFavoriteLimitModalActive = false;
      this.cityIdToDelete = '';
    },
    deleteSelectedCity() {
      this.cities.deleteCityById(this.cityIdToDelete);
      this.isDeletingModalActive = false;
      this.cityIdToDelete = '';
    }
  }
});
</script>

<template>
  <div class="wrapper">
    <WeatherCardPreloader v-if="isCitiesLoading" />

    <template v-else>
      <WeatherCard
        v-for="city of cities.cities"
        :key="city.id"
        :city="city"
        @toggleFavorites="cities.toggleFavorite($event)"
        @delete-card="prepareToDeletingCity($event)"
        @open-favorite-limit-modal="isFavoriteLimitModalActive = true"
      />

      <div v-if="cities.cities.length < 5" class="add-button" @click="addCity">
        <button class="btn">
          <img src="src/img/plus.svg" alt="add" />
        </button>
      </div>

      <DeletingModal
        v-if="isDeletingModalActive"
        @close-modal="closeModal"
        @confirm-delete="deleteSelectedCity"
      />

      <FavoriteLimitModal v-if="isFavoriteLimitModalActive" @close-modal="closeModal" />
    </template>
  </div>
</template>
