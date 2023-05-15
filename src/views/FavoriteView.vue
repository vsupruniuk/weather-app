<script lang="ts">
import { defineComponent } from 'vue';
import { useFavoriteCitiesStore } from '@/stores/favoriteCity';
import { ICity } from '@/types/City';
import WeatherCard from '@/components/WeatherCard/WeatherCard.vue';
import WeatherCardPreloader from '@/components/Preloaders/WeatherCardPreloader.vue';
import DeletingModal from '@/components/Modals/DeletingModal.vue';
import { useSelectedCitiesStore } from '@/stores/cities';
import { getTranslation } from '../helpers/getTranslation';

export default defineComponent({
  components: { DeletingModal, WeatherCardPreloader, WeatherCard },
  setup() {
    const favoriteCities = useFavoriteCitiesStore();
    const cities = useSelectedCitiesStore();

    return { cities, favoriteCities };
  },
  data() {
    return {
      isDeletingModalActive: false,
      isCitiesLoading: false,
      cityIdToDelete: ''
    };
  },
  mounted() {
    if (this.favoriteCities.favoriteCities.length) {
      return;
    }

    this.isCitiesLoading = true;

    let citiesFormLocalStorage: ICity[];

    try {
      citiesFormLocalStorage = JSON.parse(localStorage.getItem('favoriteCities') || '[]');
    } catch (err) {
      citiesFormLocalStorage = [];
    }

    this.favoriteCities.addFavoriteCities(citiesFormLocalStorage);
    this.isCitiesLoading = false;
  },
  methods: {
    getTranslation,
    prepareToDeletingCity(id: string) {
      this.isDeletingModalActive = true;
      this.cityIdToDelete = id;
    },
    closeModal() {
      this.isDeletingModalActive = false;
      this.cityIdToDelete = '';
    },
    deleteSelectedCity() {
      this.favoriteCities.deleteCityById(this.cityIdToDelete);
      this.cities.untoggleFavorite(this.cityIdToDelete);
      this.isDeletingModalActive = false;
      this.cityIdToDelete = '';
    }
  }
});
</script>

<template>
  <div class="wrapper">
    <h1 v-if="!favoriteCities.favoriteCities.length">
      {{ getTranslation('translation::favorite_empty') }}
    </h1>
    <template v-else>
      <WeatherCardPreloader v-if="isCitiesLoading" />

      <template v-else>
        <WeatherCard
          v-for="city of favoriteCities.favoriteCities"
          :key="city.id"
          :city="city"
          :is-favorite-page="true"
          @delete-card="prepareToDeletingCity($event)"
        />

        <DeletingModal
          v-if="isDeletingModalActive"
          @close-modal="closeModal"
          @confirm-delete="deleteSelectedCity"
        />
      </template>
    </template>
  </div>
</template>

<style></style>
