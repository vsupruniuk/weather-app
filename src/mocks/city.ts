import type { ICity } from '@/types/City';

export const cityMock: Omit<ICity, 'id'> = {
  name: 'Kyiv',
  local_names: {
    uk: 'Київ'
  },
  lat: 50.4500336,
  lon: 30.5241361,
  country: 'UA',
  isFavorite: false
};
