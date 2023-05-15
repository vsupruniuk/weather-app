<script lang="ts">
import { capitalize, defineComponent, PropType } from 'vue';
import type { IWeatherItem } from '@/types/Weather';
import { getTranslation } from '@/helpers/getTranslation';

export default defineComponent({
  name: 'WeatherDetails',
  methods: { capitalize, getTranslation },
  props: {
    weatherItem: { type: Object as PropType<IWeatherItem[]>, required: true }
  },
  computed: {
    maxTemperature(): number {
      const temp = this.weatherItem.map((item) => item.main.temp_max);

      return Math.round(Math.max(...temp));
    },
    minTemperature(): number {
      const temp = this.weatherItem.map((item) => item.main.temp_min);

      return Math.round(Math.min(...temp));
    },
    averageTemperature(): number {
      const temp = this.weatherItem.reduce((previousValue, currentValue) => {
        return previousValue + currentValue.main.temp;
      }, 0);

      return Math.round(temp / this.weatherItem.length);
    },
    averageTemperatureFeelsLike(): number {
      const temp = this.weatherItem.reduce((previousValue, currentValue) => {
        return previousValue + currentValue.main.feels_like;
      }, 0);

      return Math.round(temp / this.weatherItem.length);
    },
    averagePressure(): number {
      const pressure = this.weatherItem.reduce((previousValue, currentValue) => {
        return previousValue + currentValue.main.pressure;
      }, 0);

      return Math.round(pressure / this.weatherItem.length);
    },
    averageHumidity(): number {
      const humidity = this.weatherItem.reduce((previousValue, currentValue) => {
        return previousValue + currentValue.main.humidity;
      }, 0);

      return Math.round(humidity / this.weatherItem.length);
    },
    averageWindSpeed(): number {
      const wind = this.weatherItem.reduce((previousValue, currentValue) => {
        return previousValue + currentValue.wind.speed;
      }, 0);

      return Math.round(wind / this.weatherItem.length);
    }
  }
});
</script>

<template>
  <div class="weather-details">
    <div class="weather-details-item">
      <div class="weather-details-title">{{ getTranslation('translation::weather_max_temp') }}</div>
      <div>{{ maxTemperature }} &#8451;</div>
    </div>

    <div class="weather-details-item">
      <div class="weather-details-title">{{ getTranslation('translation::weather_min_temp') }}</div>
      <div>{{ minTemperature }} &#8451;</div>
    </div>

    <div class="weather-details-item">
      <div class="weather-details-title">{{ getTranslation('translation::weather_avg_temp') }}</div>
      <div>{{ averageTemperature }} &#8451;</div>
    </div>

    <div class="weather-details-item">
      <div class="weather-details-title">
        {{ getTranslation('translation::weather_feels_like_temp') }}
      </div>
      <div>{{ averageTemperatureFeelsLike }} &#8451;</div>
    </div>

    <br />

    <div class="weather-details-item">
      <div class="weather-details-title">{{ getTranslation('translation::weather_pressure') }}</div>
      <div>{{ averagePressure }} {{ getTranslation('translation::weather_pressure_unit') }}</div>
    </div>

    <div class="weather-details-item">
      <div class="weather-details-title">{{ getTranslation('translation::weather_humidity') }}</div>
      <div>{{ averageHumidity }} %</div>
    </div>

    <div class="weather-details-item">
      <div class="weather-details-title">
        {{ getTranslation('translation::weather_wind_speed') }}
      </div>
      <div>{{ averageWindSpeed }} {{ getTranslation('translation::weather_wind_speed_unit') }}</div>
    </div>

    <br />

    <div class="weather-details-item">
      <div class="weather-details-title">
        {{ capitalize(weatherItem[0].weather[0].description) }}
      </div>
    </div>
  </div>
</template>
