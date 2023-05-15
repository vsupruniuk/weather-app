<script lang="ts">
import { defineComponent, PropType } from 'vue';
import type { IWeatherItem } from '@/types/Weather';
import moment from 'moment';
import WeatherDetails from '@/components/WeatherCard/WeatherDetails.vue';
import WeatherTemperatureGraphic from '@/components/WeatherCard/WeatherTemperatureGraphic.vue';
import { useTranslationsStore } from '@/stores/translations';
import { getTranslation } from '@/helpers/getTranslation';

export default defineComponent({
  name: 'WeatherInfoItem',
  components: { WeatherTemperatureGraphic, WeatherDetails },
  setup() {
    const translations = useTranslationsStore();

    return { translations };
  },
  props: {
    weatherItem: { type: Object as PropType<IWeatherItem[]>, required: true }
  },
  data() {
    return {
      dayMode: 'day' as 'day' | 'night'
    };
  },
  computed: {
    currentDate(): string {
      return moment(this.weatherItem[0].dt * 1000).format('D.MM');
    },
    daysWeather(): IWeatherItem[] {
      const nightEnd = moment(this.weatherItem[0].dt * 1000)
        .startOf('day')
        .hour(6);

      return this.weatherItem.filter((item) => moment(item.dt * 1000).isAfter(nightEnd));
    },
    nightsWeather(): IWeatherItem[] {
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
    getTranslation,
    setDayMode(): void {
      this.dayMode = 'day';
    },
    setNightMode(): void {
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
        {{ getTranslation('translation::card_day_mode_d') }}
      </button>
      <button
        class="btn"
        :class="{ 'is-active': dayMode === 'night' }"
        @click="setNightMode"
        :disabled="!nightsWeather.length"
      >
        {{ getTranslation('translation::card_day_mode_n') }}
      </button>
    </div>

    <WeatherDetails :weather-item="dayMode === 'day' ? daysWeather : nightsWeather" />

    <WeatherTemperatureGraphic :weather-item="weatherItem" />
  </div>
</template>
