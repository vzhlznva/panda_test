import { useStorage } from "@vueuse/core";
import { createI18n as createClientI18n } from "vue-i18n";
import messages from "@intlify/unplugin-vue-i18n/messages";

const fallbackLocale = "en";
export const locales = ["ru", "en"] as const;
type localeType = (typeof locales)[number];
export const navigatorLanguage: localeType =
  (navigator?.language.slice(0, 2) as localeType) || fallbackLocale;

export const locale = useStorage<localeType>(
  "locale",
  locales.includes(navigatorLanguage) ? navigatorLanguage : fallbackLocale
);

export function createI18n() {
  const i18n = createClientI18n({
    globalInjection: true,
    fallbackWarn: false,
    missingWarn: false,
    locale: locale.value,
    fallbackLocale: fallbackLocale,
    messages,
  });
  return i18n;
}

export const i18n = createI18n();

export function changeLocale(lang: localeType) {
  locale.value = lang;
}
