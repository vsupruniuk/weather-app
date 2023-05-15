<script lang="ts">
import { defineComponent, PropType } from 'vue';
import type { ICity } from '@/types/City';
import { useTranslationsStore } from '@/stores/translations';

export default defineComponent({
  name: 'AutocompleteOptions',
  emits: ['selectCity'],
  setup() {
    const translation = useTranslationsStore();

    return { translation };
  },
  props: {
    foundedCities: { type: Object as PropType<ICity[]>, required: true },
    isActive: { type: Boolean, required: true }
  }
});
</script>

<template>
  <div class="autocomplete-options" :class="{ 'is-active': isActive }">
    <div v-if="!foundedCities.length" class="autocomplete-options-empty">No results</div>
    <div
      v-else
      v-for="city of foundedCities"
      :key="`${city.lon}${city.lat}`"
      @click="$emit('selectCity', city)"
      class="autocomplete-options-item"
    >
      {{ (city.local_names && city.local_names[translation.locale]) || city.name }},
      {{ city.country }}
    </div>
  </div>
</template>

<style></style>
