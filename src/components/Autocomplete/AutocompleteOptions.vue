<script lang="ts">
import { defineComponent, PropType } from 'vue';
import type { ICity } from '@/types/City';

export default defineComponent({
  name: 'AutocompleteOptions',
  emits: ['selectCity'],
  props: {
    foundedCities: { type: Object as PropType<ICity[]>, required: true },
    isActive: { type: Boolean, required: true }
  }
});
</script>

<template>
  <div class="autocomplete-options" :class="{ 'is-active': isActive }">
    <div
      v-for="city of foundedCities"
      :key="`${city.lon}${city.lat}`"
      @click="$emit('selectCity', city)"
      class="autocomplete-options-item"
    >
      {{ city.name }}, {{ city.country }}
    </div>
  </div>
</template>

<style></style>
