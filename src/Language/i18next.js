/* eslint-disable no-unused-vars */
import i18n from "i18next";
import { initReactI18next } from "react-i18next";
import LanguageDetector from "i18next-browser-languagedetector";
import TranslationRU from "../../public/Locales/RU/Translation.json";
import TranslationTJ from "../../public/Locales/TJ/Translation.json";

const availableLanguages = ["ru", "tj"];

i18n
  .use(LanguageDetector)
  .use(initReactI18next)
  .init({
    debug: true,
    fallbackLng: "ru",
    returnObjects: true,
    resources: {
      ru: {
        translation: TranslationRU,
      },
      tj: {
        translation: TranslationTJ,
      },
    },
    detection: {
      order: [
        "localStorage", // Check localStorage first
        "cookie",
        "querystring",
        "navigator",
        "htmlTag",
        "path",
        "subdomain",
      ],
      caches: ["localStorage", "cookie"], // Cache the language in localStorage and cookie
    },
    react: {
      useSuspense: false,
    },
    lng: localStorage.getItem("i18nextLng") || "ru", // Use language from localStorage or fallback to 'en'
  });

export default i18n;
