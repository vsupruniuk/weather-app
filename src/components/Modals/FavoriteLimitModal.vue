<script lang="ts">
import { defineComponent } from 'vue';
import MainModal from '@/components/Modals/MainModal.vue';

export default defineComponent({
  name: 'FavoriteLimitModal',
  emits: ['closeModal'],
  components: { MainModal }
});
</script>

<template>
  <MainModal>
    <div class="modal-card">
      <div class="modal-header">
        <button class="modal-close-btn" @click="$emit('closeModal')">
          <img src="src/img/close.svg" alt="close" />
        </button>
      </div>

      <div class="modal-body">
        <h2 class="modal-body-title">
          The limit of selected items has been reached. Please remove something from favorites and
          try again.
        </h2>

        <div class="modal-confirmation-buttons">
          <button class="modal-confirmation-btn btn" @click="$emit('closeModal')">Ok</button>
        </div>
      </div>
    </div>
  </MainModal>
</template>

<style></style>
