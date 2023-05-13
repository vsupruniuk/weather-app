<script lang="ts">
import { defineComponent, PropType } from 'vue';
import type { IWeatherItem } from '@/types/Weather';
import WeatherInfoControl from '@/components/WeatherCard/WeatherInfoControl.vue';
import WeatherInfoItem from '@/components/WeatherCard/WeatherInfoItem.vue';

export default defineComponent({
  name: 'WeatherInfo',
  components: { WeatherInfoItem, WeatherInfoControl },
  props: {
    weather: { type: Object as PropType<IWeatherItem[][]>, required: true }
  },
  data() {
    return {
      mode: 'oneDay' as 'oneDay' | 'fiveDays'
    };
  }
});
</script>

<template>
  <div class="weather-info">
    <div v-if="!weather.length">Loading</div>

    <template v-else>
      <WeatherInfoControl :mode="mode" @changeMode="this.mode = $event" />

      <WeatherInfoItem v-if="mode === 'oneDay'" :weather-item="weather[0]" />

      <WeatherInfoItem
        v-else
        v-for="(weatherItem, index) of weather"
        :key="index"
        :weather-item="weatherItem"
      />
    </template>
  </div>
</template>

<style></style>
