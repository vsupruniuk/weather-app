<script lang="ts">
import { defineComponent } from 'vue';
import AutocompleteOptions from '@/components/Autocomplete/AutocompleteOptions.vue';
import { searchCities } from '@/api/searchCities';
import { debounce } from 'lodash';
import type { ICity } from '@/types/City';
import { useSelectedCitiesStore } from '@/stores/cities';
import { getTranslation } from '@/helpers/getTranslation';

export default defineComponent({
  name: 'AutocompleteInput',
  components: { AutocompleteOptions },
  emits: ['reloadWeather'],
  props: {
    cityId: { type: String, required: true }
  },
  setup() {
    const cities = useSelectedCitiesStore();

    return { cities };
  },
  data() {
    return {
      inputValue: '',
      foundedCities: [] as ICity[],
      debouncedFetchData: debounce(this.fetchData, 500)
    };
  },
  methods: {
    getTranslation,
    async fetchData(): Promise<void> {
      if (this.inputValue.length) {
        try {
          const data = await searchCities(this.inputValue);

          this.foundedCities = data.data;
        } catch (err) {
          this.foundedCities = [];
        }
      } else {
        this.foundedCities = [];
      }
    },
    replaceCity(event): void {
      this.cities.replaceCityById(this.cityId, event);
      this.inputValue = '';
      this.foundedCities = [];
      this.$emit('reloadWeather', event);
    }
  }
});
</script>

<template>
  <form class="autocomplete">
    <div class="autocomplete-container">
      <input
        type="text"
        class="autocomplete-input"
        :placeholder="getTranslation('translation::city_search_placeholder')"
        v-model="inputValue"
        @input="debouncedFetchData"
      />

      <AutocompleteOptions
        :founded-cities="foundedCities"
        :is-active="foundedCities.length > 0 || inputValue.length > 0"
        @selectCity="replaceCity($event)"
      />
    </div>
  </form>
</template>
