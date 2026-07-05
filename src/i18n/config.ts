import i18n from "i18next";
import { initReactI18next } from "react-i18next";
import LanguageDetector from "i18next-browser-languagedetector";

import pt from "./locales/pt.json";
import en from "./locales/en.json";
import es from "./locales/es.json";

export const SUPPORTED_LANGUAGES = [
  { code: "pt", label: "Português", flag: "🇵🇹" },
  { code: "en", label: "English", flag: "🇬🇧" },
  { code: "es", label: "Español", flag: "🇪🇸" },
] as const;

export type LanguageCode = (typeof SUPPORTED_LANGUAGES)[number]["code"];

if (!i18n.isInitialized) {
  i18n
    .use(LanguageDetector)
    .use(initReactI18next)
    .init({
      resources: {
        pt: { translation: pt },
        en: { translation: en },
        es: { translation: es },
      },
      fallbackLng: "pt",
      lng: undefined,
      supportedLngs: ["pt", "en", "es"],
      load: "languageOnly",
      interpolation: { escapeValue: false },
      detection: {
        order: ["localStorage"],
        caches: ["localStorage"],
        lookupLocalStorage: "kyveron.lang",
      },
      react: { useSuspense: false },
    });
}

export default i18n;
