<script lang="ts">
import { defineComponent, PropType } from 'vue';
import type { IWeatherItem } from '@/types/Weather';

export default defineComponent({
  name: 'WeatherDetails',
  props: {
    weatherItem: { type: Object as PropType<IWeatherItem[]>, required: true }
  },
  computed: {
    maxTemperature() {
      const temp = this.weatherItem.map((item) => item.main.temp_max);

      return Math.round(Math.max(...temp));
    },
    minTemperature() {
      const temp = this.weatherItem.map((item) => item.main.temp_min);

      return Math.round(Math.min(...temp));
    },
    averageTemperature() {
      const temp = this.weatherItem.reduce((previousValue, currentValue) => {
        return previousValue + currentValue.main.temp;
      }, 0);

      return Math.round(temp / this.weatherItem.length);
    },
    averageTemperatureFeelsLike() {
      const temp = this.weatherItem.reduce((previousValue, currentValue) => {
        return previousValue + currentValue.main.feels_like;
      }, 0);

      return Math.round(temp / this.weatherItem.length);
    },
    averagePressure() {
      const pressure = this.weatherItem.reduce((previousValue, currentValue) => {
        return previousValue + currentValue.main.pressure;
      }, 0);

      return Math.round(pressure / this.weatherItem.length);
    },
    averageHumidity() {
      const humidity = this.weatherItem.reduce((previousValue, currentValue) => {
        return previousValue + currentValue.main.humidity;
      }, 0);

      return Math.round(humidity / this.weatherItem.length);
    },
    averageWindSpeed() {
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
      <div class="weather-details-title">Max temperature:</div>
      <div>{{ maxTemperature }} &#8451;</div>
    </div>

    <div class="weather-details-item">
      <div class="weather-details-title">Min temperature:</div>
      <div>{{ minTemperature }} &#8451;</div>
    </div>

    <div class="weather-details-item">
      <div class="weather-details-title">Average temperature:</div>
      <div>{{ averageTemperature }} &#8451;</div>
    </div>

    <div class="weather-details-item">
      <div class="weather-details-title">Feels like:</div>
      <div>{{ averageTemperatureFeelsLike }} &#8451;</div>
    </div>

    <br />

    <div class="weather-details-item">
      <div class="weather-details-title">Pressure:</div>
      <div>{{ averagePressure }} hPa</div>
    </div>

    <div class="weather-details-item">
      <div class="weather-details-title">Humidity:</div>
      <div>{{ averageHumidity }} %</div>
    </div>

    <div class="weather-details-item">
      <div class="weather-details-title">Wind speed:</div>
      <div>{{ averageWindSpeed }} meter/sec</div>
    </div>

    <br />

    <div class="weather-details-item">
      <div class="weather-details-title">
        {{ weatherItem[0].weather[0].main }}, {{ weatherItem[0].weather[0].description }}
      </div>
    </div>
  </div>
</template>

<style></style>
