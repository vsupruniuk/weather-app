export interface TranslationsList {
  [key: string]: TranslationItem;
}

export interface TranslationItem {
  en: string;
  uk: string;
}

export type Locale = 'en' | 'uk';
