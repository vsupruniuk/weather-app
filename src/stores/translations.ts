import { defineStore } from 'pinia';
import type { Locale, TranslationsList } from '@/types/Translations';
import translations from '../translations.json';

export const useTranslationsStore = defineStore('translations', {
  state(): { translations: TranslationsList; locale: Locale } {
    return {
      translations,
      locale: 'en'
    };
  },
  actions: {
    setLocale(locale: Locale): void {
      this.locale = locale;
    }
  }
});
