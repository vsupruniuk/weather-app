<script lang="ts">
import { defineComponent } from 'vue';
import AutocompleteOptions from '@/components/Autocomplete/AutocompleteOptions.vue';
import { searchCities } from '@/api/searchCities';
import { debounce } from 'lodash';
import type { ICity } from '@/types/City';
import { useSelectedCitiesStore } from '@/stores/cities';

export default defineComponent({
  name: 'AutocompleteInput',
  components: { AutocompleteOptions },
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
      debouncedFetchData: () => {}
    };
  },
  methods: {
    async fetchData() {
      if (this.inputValue.length) {
        try {
          const data = await searchCities<ICity[]>(this.inputValue);

          this.foundedCities = data.data;
        } catch (err) {
          this.foundedCities = [];
        }
      } else {
        this.foundedCities = [];
      }
    },
    replaceCity(event) {
      this.cities.replaceCityById(this.cityId, event);
      this.inputValue = '';
      this.foundedCities = [];
    }
  },
  mounted() {
    this.debouncedFetchData = debounce(this.fetchData, 500);
  }
});
</script>

<template>
  <form class="autocomplete">
    <div class="autocomplete-container">
      <input
        type="text"
        class="autocomplete-input"
        placeholder="Type to search"
        v-model="inputValue"
        @input="debouncedFetchData"
      />

      <AutocompleteOptions
        :founded-cities="foundedCities"
        :is-active="foundedCities.length > 0"
        @selectCity="replaceCity($event)"
      />
    </div>
  </form>
</template>

<style></style>
