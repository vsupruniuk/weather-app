<script lang="ts">
import { defineComponent } from 'vue';
import { getTranslation } from '@/helpers/getTranslation';

export default defineComponent({
  name: 'WeatherInfoControl',
  methods: { getTranslation },
  emits: ['changeMode'],
  props: {
    mode: {
      type: String,
      required: true,
      validator(value: string): boolean {
        return ['oneDay', 'fiveDays'].includes(value);
      }
    }
  }
});
</script>

<template>
  <div class="control-buttons">
    <button
      class="btn"
      :class="{ 'is-active': mode === 'oneDay' }"
      @click="$emit('changeMode', 'oneDay')"
    >
      {{ getTranslation('translation::card_weather_mode_1') }}
    </button>

    <button
      class="btn"
      :class="{ 'is-active': mode === 'fiveDays' }"
      @click="$emit('changeMode', 'fiveDays')"
    >
      {{ getTranslation('translation::card_weather_mode_5') }}
    </button>
  </div>
</template>
