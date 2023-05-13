<script lang="ts">
import { defineComponent } from 'vue';
import MainModal from '@/components/Modals/MainModal.vue';

export default defineComponent({
  name: 'DeletingModal',
  emits: ['closeModal', 'confirmDelete'],
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
        <h2 class="modal-body-title">Are you sure you want to delete this city?</h2>

        <div class="modal-confirmation-buttons">
          <button class="modal-confirmation-btn btn" @click="$emit('confirmDelete')">Yes</button>
          <button class="modal-confirmation-btn btn" @click="$emit('closeModal')">No</button>
        </div>
      </div>
    </div>
  </MainModal>
</template>

<style></style>
