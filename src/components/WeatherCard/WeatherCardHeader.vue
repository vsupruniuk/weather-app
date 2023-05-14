<script lang="ts">
import { defineComponent } from 'vue';
import AutocompleteInput from '@/components/Autocomplete/Autocomplete.vue';

export default defineComponent({
  name: 'WeatherCardHeader',
  components: { AutocompleteInput },
  emits: ['addFavorite', 'reload-weather'],
  props: {
    cityName: { type: String, required: true },
    isFavorite: { type: Boolean, required: true },
    cityId: { type: String, required: true },
    isFavoritePage: { type: Boolean, required: false, default: false }
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

    <AutocompleteInput
      v-if="!isFavoritePage"
      :cityId="cityId"
      @reload-weather="$emit('reload-weather', $event)"
    />
  </div>
</template>

<style></style>
