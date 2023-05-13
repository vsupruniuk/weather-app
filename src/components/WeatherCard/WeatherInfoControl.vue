<script lang="ts">
import { defineComponent } from 'vue';

export default defineComponent({
  name: 'WeatherInfoControl',
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
      1 day
    </button>

    <button
      class="btn"
      :class="{ 'is-active': mode === 'fiveDays' }"
      @click="$emit('changeMode', 'fiveDays')"
    >
      5 days
    </button>
  </div>
</template>

<style></style>
