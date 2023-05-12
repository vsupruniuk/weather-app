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
      this.favoriteCities.push({ ...city, id: uuidv4() });

      localStorage.setItem('favoriteCities', JSON.stringify(this.favoriteCities));
    }
  }
});
