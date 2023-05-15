import { useTranslationsStore } from '@/stores/translations';

export const getTranslation = (translationKey: string): string => {
  const translationStore = useTranslationsStore();
  const translationList = translationStore.translations;
  const locale = translationStore.locale;
  const translationOptions = translationList[translationKey];

  return translationOptions ? translationOptions[locale] : translationKey;
};
