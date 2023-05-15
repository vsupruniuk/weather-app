<script>
import { defineComponent } from 'vue';
import { Chart } from 'chart.js/auto';
import moment from 'moment';
import { getTranslation } from '@/helpers/getTranslation';

export default defineComponent({
  name: 'WeatherTemperatureGraphic',
  props: {
    weatherItem: { type: Object, required: true }
  },
  computed: {
    labels() {
      return this.weatherItem.map((item) => moment(item.dt * 1000).format('HH:mm'));
    },
    temperatures() {
      return this.weatherItem.map((item) => Math.round(item.main.temp));
    }
  },
  mounted() {
    const ctx = this.$refs.chart;

    this.chart = new Chart(ctx, {
      type: 'bar',
      data: {
        labels: this.labels,
        datasets: [
          {
            label: getTranslation('translation::weather_temp_graphic'),
            data: this.temperatures,
            borderWidth: 2
          }
        ]
      },
      options: {
        scales: {
          y: {
            beginAtZero: true
          }
        }
      }
    });
  }
});
</script>

<template>
  <div class="temperature-graphic">
    <canvas ref="chart" id="chart" width="400" height="400"></canvas>
  </div>
</template>

<style></style>
