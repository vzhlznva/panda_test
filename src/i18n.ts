import { useStorage } from "@vueuse/core";
import { createI18n as createClientI18n } from "vue-i18n";
import messages from "@intlify/unplugin-vue-i18n/messages";
import moment from "moment";

const fallbackLocale = "en";
export const locales = ["en", "uk"] as const;
export type localeType = (typeof locales)[number];
export const navigatorLanguage: localeType =
  (navigator?.language.slice(0, 2) as localeType) || fallbackLocale;

export const locale = useStorage<localeType>("locale", fallbackLocale);

export function createI18n() {
  const i18n = createClientI18n({
    globalInjection: true,
    fallbackWarn: false,
    missingWarn: false,
    locale: locale.value,
    fallbackLocale: fallbackLocale,
    messages,
  });
  moment.locale(locale.value);
  return i18n;
}

export const i18n = createI18n();

export function changeLocale(lang: localeType) {
  locale.value = lang;
  moment.locale(lang);
}
