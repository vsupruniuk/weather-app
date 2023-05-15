import { defineStore } from 'pinia';
import type { ICity } from '@/types/City';

export const useFavoriteCitiesStore = defineStore('favoriteCities', {
  state(): { favoriteCities: ICity[] } {
    return {
      favoriteCities: []
    };
  },
  actions: {
    addFavoriteCity(city: ICity): void {
      this.favoriteCities.push({ ...city, isFavorite: true });

      localStorage.setItem('favoriteCities', JSON.stringify(this.favoriteCities));
    },
    addFavoriteCities(cities: ICity[]): void {
      this.favoriteCities = this.favoriteCities.concat(cities);

      localStorage.setItem('favoriteCities', JSON.stringify(this.favoriteCities));
    },
    deleteCityById(id: string): void {
      const newCities = this.favoriteCities.filter((city) => city.id !== id);

      this.favoriteCities = newCities;

      localStorage.setItem('favoriteCities', JSON.stringify(newCities));
    }
  }
});
