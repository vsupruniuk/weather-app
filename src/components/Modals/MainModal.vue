<script lang="ts">
import { defineComponent } from 'vue';

export default defineComponent({
  name: 'MainModal',
  created() {
    document.body.style.overflow = 'hidden';
  },
  beforeUnmount() {
    document.body.style.overflow = 'auto';
  }
});
</script>

<template>
  <div class="modal">
    <slot></slot>
  </div>
</template>
