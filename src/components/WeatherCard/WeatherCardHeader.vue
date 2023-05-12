<script lang="ts">
import { defineComponent } from 'vue';
import AutocompleteInput from '@/components/Autocomplete/Autocomplete.vue';

export default defineComponent({
  name: 'WeatherCardHeader',
  components: { AutocompleteInput },
  emits: ['addFavorite'],
  props: {
    cityName: { type: String, required: true },
    isFavorite: { type: Boolean, required: true },
    cityId: { type: String, required: true }
  },
  methods: {
    addFavorite() {
      this.$emit('addFavorite');
    }
  }
});
</script>

<template>
  <div class="card-header">
    <div class="card-header-city">
      <h3>Selected city: {{ cityName }}</h3>
      <button class="favorite-status" @click="addFavorite">
        <img v-if="!isFavorite" src="src/img/star.svg" alt="favorite status" />
        <img v-else src="src/img/star-active.svg" alt="favorite status" />
      </button>
    </div>

    <AutocompleteInput :cityId="cityId" />
  </div>
</template>

<style></style>
