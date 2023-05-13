export interface IWeather {
  cod: string;
  message: number;
  cnt: number;
  list: IWeatherItem[];
  city: IWeatherCity;
}

export interface IWeatherItem {
  dt: number;
  main: IWeatherMain;
  weather: IWeatherCondition[];
  clouds: IWeatherClouds;
  wind: IWeatherWind;
  visibility: number;
  pop: number;
  rain: IWeatherRain;
  sys: IWeatherSys;
  dt_txt: string;
}

export interface IWeatherCity {
  id: number;
  name: string;
  coord: IWeatherCityCoord;
  country: string;
  population: number;
  timezone: number;
  sunrise: number;
  sunset: number;
}

interface IWeatherMain {
  temp: number;
  feels_like: number;
  temp_min: number;
  temp_max: number;
  pressure: number;
  sea_level: number;
  grnd_level: number;
  humidity: number;
  temp_kf: number;
}

interface IWeatherCondition {
  id: number;
  main: string;
  description: string;
  icon: string;
}

interface IWeatherClouds {
  all: number;
}

interface IWeatherWind {
  speed: number;
  deg: number;
  gust: number;
}

interface IWeatherRain {
  '3h': number;
}

interface IWeatherSys {
  pod: string;
}

interface IWeatherCityCoord {
  lat: number;
  lon: number;
}
