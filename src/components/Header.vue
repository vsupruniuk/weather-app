<script lang="ts">
import { defineComponent } from 'vue';
import { useTranslationsStore } from '@/stores/translations';
import type { Locale } from '@/types/Translations';
import { getTranslation } from '@/helpers/getTranslation';

export default defineComponent({
  name: 'HeaderNav',
  setup() {
    const translations = useTranslationsStore();

    return { translations, setLocale: translations.setLocale };
  },
  beforeMount() {
    this.setLocale(this.$cookies.get('locale') || 'en');
  },
  computed: {
    currentUrl(): string {
      return this.$route.path;
    }
  },
  methods: {
    getTranslation,
    changeLocale(event: Event): void {
      const locale = (event.target as HTMLSelectElement).value;
      this.setLocale(locale as Locale);
      this.$cookies.set('locale', locale, Number(import.meta.env.VITE_COOKIE_LOCALE_EXPIRE_TIME));
      location.reload();
    }
  }
});
</script>

<template>
  <header class="header wrapper">
    <div class="header-nav">
      <router-link to="/" class="btn" :class="{ 'is-active': currentUrl === '/' }">{{
        getTranslation('translation::header_home')
      }}</router-link>

      <router-link
        to="/favorite"
        class="btn"
        :class="{ 'is-active': currentUrl === '/favorite' }"
        >{{ getTranslation('translation::header_favorite') }}</router-link
      >
    </div>

    <select class="header-select" :value="translations.locale" @change="changeLocale">
      <option value="en">En</option>
      <option value="uk">Укр</option>
    </select>
  </header>
</template>
