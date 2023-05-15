import type { IWeather, IWeatherItem } from '@/types/Weather';
import moment from 'moment';

export const separateWeatherByDays = (weather: IWeather): IWeatherItem[][] => {
  const arr = { ...weather };
  const result: IWeatherItem[][] = [[]];
  const tomorrow = moment().add(1, 'day').startOf('day');

  let isTodayWeatherLeft = true;

  while (isTodayWeatherLeft) {
    if (moment(arr.list[0].dt * 1000).isBefore(tomorrow)) {
      result[0].push(...arr.list.splice(0, 1));
    } else {
      isTodayWeatherLeft = false;
    }
  }

  while (arr.list.length > 0) {
    result.push([...arr.list.splice(0, 8)]);
  }

  return result;
};
