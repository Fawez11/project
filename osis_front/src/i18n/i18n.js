// src/i18n/i18n.js
import i18n from "i18next";
import { initReactI18next } from "react-i18next";
import Backend from "i18next-http-backend";

// Translation files
import translationEN from "./locales/en/translation.json";
import translationFR from "./locales/fr/translation.json";
import translationAR from "./locales/ar/translation.json";

// Define the translations for each language
const resources = {
  en: {
    translation: translationEN,
  },
  fr: {
    translation: translationFR,
  },
  ar: {
    translation: translationAR, // Arabic translations
  },
};

i18n
  .use(Backend)
  .use(initReactI18next) // Passes i18n down to react-i18next
  .init({
    resources,
    lng: "fr", // Default language
    fallbackLng: "fr", // Fallback language if the translation key is missing
    interpolation: {
      escapeValue: false, // React already protects from XSS
    },
    backend: {
      loadPath: "/locales/{{lng}}/translation.json", // Define the path to load translation files dynamically
    },
  });

export default i18n;
