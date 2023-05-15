import { defineStore } from 'pinia';
import type { ICity } from '@/types/City';

export const useSelectedCitiesStore = defineStore('selectedCities', {
  state(): { cities: ICity[] } {
    return {
      cities: []
    };
  },
  actions: {
    addCity(city: ICity): void {
      this.cities.push(city);

      localStorage.setItem('selectedCities', JSON.stringify(this.cities));
    },
    addCities(cities: ICity[]): void {
      this.cities = this.cities.concat(cities);

      localStorage.setItem('selectedCities', JSON.stringify(this.cities));
    },
    toggleFavorite(id: string): void {
      const toggledCities = this.cities.map((city) => {
        return city.id === id ? { ...city, isFavorite: true } : city;
      });

      this.cities = toggledCities;

      localStorage.setItem('selectedCities', JSON.stringify(toggledCities));
    },
    untoggleFavorite(id: string): void {
      const toggledCities = this.cities.map((city) => {
        return city.id === id ? { ...city, isFavorite: false } : city;
      });

      this.cities = toggledCities;

      localStorage.setItem('selectedCities', JSON.stringify(toggledCities));
    },
    replaceCityById(id: string, newCity: ICity): void {
      const newCities = this.cities.map((city) => {
        return city.id === id ? { ...newCity, id, isFavorite: false } : city;
      });

      this.cities = newCities;

      localStorage.setItem('selectedCities', JSON.stringify(newCities));
    },
    deleteCityById(id: string): void {
      const newCities = this.cities.filter((city) => city.id !== id);

      this.cities = newCities;

      localStorage.setItem('selectedCities', JSON.stringify(newCities));
    }
  }
});
