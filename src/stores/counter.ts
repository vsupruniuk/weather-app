import { defineStore } from 'pinia'

export const useSelectedCitiesStore = defineStore('selectedCities', {
  state() {
    return {
      cities: [{ name: 'Kyiv', country: 'Ukraine' }]
    }
  },
  getters: {
    getCity: (state) => state.cities[0].name
  }
})
