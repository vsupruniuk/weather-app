import { defineStore } from 'pinia';
import type { ICity } from '@/types/City';
import { v4 as uuidv4 } from 'uuid';

export const useFavoriteCitiesStore = defineStore('favoriteCities', {
  state(): { favoriteCities: ICity[] } {
    return {
      favoriteCities: []
    };
  },
  actions: {
    addFavoriteCity(city: ICity) {
      this.favoriteCities.push({ ...city, isFavorite: true });

      localStorage.setItem('favoriteCities', JSON.stringify(this.favoriteCities));
    },
    addFavoriteCities(cities: ICity[]) {
      this.favoriteCities = this.favoriteCities.concat(cities);

      localStorage.setItem('favoriteCities', JSON.stringify(this.favoriteCities));
    },
    deleteCityById(id: string) {
      const newCities = this.favoriteCities.filter((city) => city.id !== id);

      this.favoriteCities = newCities;

      localStorage.setItem('favoriteCities', JSON.stringify(newCities));
    }
  }
});
