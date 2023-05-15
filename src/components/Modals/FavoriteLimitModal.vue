<script lang="ts">
import { defineComponent } from 'vue';
import MainModal from '@/components/Modals/MainModal.vue';
import { getTranslation } from '@/helpers/getTranslation';

export default defineComponent({
  name: 'FavoriteLimitModal',
  methods: { getTranslation },
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
          {{ getTranslation('translation::modal_favorite') }}
        </h2>

        <div class="modal-confirmation-buttons">
          <button class="modal-confirmation-btn btn" @click="$emit('closeModal')">
            {{ getTranslation('translation::ok') }}
          </button>
        </div>
      </div>
    </div>
  </MainModal>
</template>
