import axios from 'axios';
import type { Locale } from '@/types/Translations';

const baseUrl = import.meta.env.VITE_OPENWEATHER_API_URL;
const apiKey = import.meta.env.VITE_OPENWEATHER_API_KEY;

export const getWeather = (lat: number, lon: number, locale: Locale) => {
  return axios.get(
    `${baseUrl}/data/2.5/forecast?lat=${lat}&lon=${lon}&appid=${apiKey}&units=metric&lang=${locale}`
  );
};
