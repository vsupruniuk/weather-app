import axios from 'axios';

export const getCityByIP = () => {
  return axios.get(import.meta.env.VITE_GET_CITY_BY_IP_URL);
};
