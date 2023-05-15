import axios from 'axios';

const baseUrl = import.meta.env.VITE_OPENWEATHER_API_URL;
const apiKey = import.meta.env.VITE_OPENWEATHER_API_KEY;

export const searchCities = (query: string) => {
  return axios.get(`${baseUrl}/geo/1.0/direct?q=${query}&limit=5&appid=${apiKey}`);
};
