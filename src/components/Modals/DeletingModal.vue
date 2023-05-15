<script lang="ts">
import { defineComponent } from 'vue';
import MainModal from '@/components/Modals/MainModal.vue';
import { getTranslation } from '../../helpers/getTranslation';

export default defineComponent({
  name: 'DeletingModal',
  methods: { getTranslation },
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
        <h2 class="modal-body-title">{{ getTranslation('translation::modal_delete') }}</h2>

        <div class="modal-confirmation-buttons">
          <button class="modal-confirmation-btn btn" @click="$emit('confirmDelete')">
            {{ getTranslation('translation::yes') }}
          </button>
          <button class="modal-confirmation-btn btn" @click="$emit('closeModal')">
            {{ getTranslation('translation::no') }}
          </button>
        </div>
      </div>
    </div>
  </MainModal>
</template>

<style></style>
