<script lang="ts">
import { defineComponent, PropType } from 'vue';
import type { IWeatherItem } from '@/types/Weather';
import moment from 'moment';
import WeatherDetails from '@/components/WeatherCard/WeatherDetails.vue';
import WeatherTemperatureGraphic from '@/components/WeatherCard/WeatherTemperatureGraphic.vue';

export default defineComponent({
  name: 'WeatherInfoItem',
  components: { WeatherTemperatureGraphic, WeatherDetails },
  props: {
    weatherItem: { type: Object as PropType<IWeatherItem[]>, required: true }
  },
  data() {
    return {
      dayMode: 'day' as 'day' | 'night'
    };
  },
  computed: {
    currentDate() {
      return moment(this.weatherItem[0].dt * 1000).format('Do MMM');
    },
    daysWeather() {
      const nightEnd = moment(this.weatherItem[0].dt * 1000)
        .startOf('day')
        .hour(6);

      return this.weatherItem.filter((item) => moment(item.dt * 1000).isAfter(nightEnd));
    },
    nightsWeather() {
      const nightStart = moment(this.weatherItem[0].dt * 1000).startOf('day');
      const nightEnd = moment(this.weatherItem[0].dt * 1000)
        .startOf('day')
        .hour(6);

      return this.weatherItem.filter((item) => {
        const itemTime = moment(item.dt * 1000);

        return (
          itemTime.isBetween(nightStart, nightEnd) ||
          itemTime.isSame(nightStart) ||
          itemTime.isSame(nightEnd)
        );
      });
    }
  },
  methods: {
    setDayMode() {
      this.dayMode = 'day';
    },
    setNightMode() {
      this.dayMode = 'night';
    }
  }
});
</script>

<template>
  <div class="weather-info-container">
    <h2 class="weather-info-title">{{ currentDate }}</h2>

    <div class="control-buttons">
      <button class="btn" :class="{ 'is-active': dayMode === 'day' }" @click="setDayMode">
        Day
      </button>
      <button
        class="btn"
        :class="{ 'is-active': dayMode === 'night' }"
        @click="setNightMode"
        :disabled="!nightsWeather.length"
      >
        Night
      </button>
    </div>

    <WeatherDetails :weather-item="dayMode === 'day' ? daysWeather : nightsWeather" />

    <WeatherTemperatureGraphic :weather-item="dayMode === 'day' ? daysWeather : nightsWeather" />
  </div>
</template>

<style></style>
