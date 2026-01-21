import i18n from "i18next";
import { initReactI18next } from "react-i18next";
import LanguageDetector from "i18next-browser-languagedetector";
import HttpBackend from "i18next-http-backend";

/**
 * i18n Configuration File
 *
 * This file initializes i18next and configures:
 * - Default language
 * - Supported languages
 * - Where to load translations
 * - How to handle missing translations
 */

i18n
  .use(HttpBackend) // Load from HTTP backend (public/locales)
  .use(LanguageDetector) // Auto Detect users's browser language
  .use(initReactI18next) // Connect to React
  .init({
    // Initialize i18next with options
    fallbackLng: "en", // Default language if nothing else works
    supportedLngs: ["en", "es", "fr"], // Supported languages

    // ============ NAMESPACE SETTINGS ============

    // Namespaces to load
    // common: shared across all pages/features
    // todo: only for todo-related components
    // header: only for header-related components
    ns: ["common", "todo", "header"],
    defaultNS: "common", // Default namespace if none specified

    nsSeparator: ":", // Character to separate namespace from key (namespaces:key.path)

    // ============ INTERPOLATION SETTINGS ============
    interpolation: {
      escapeValue: false, // React already handles HTML escaping, so disable it here
    },

    // ============ BACKEND SETTINGS ============
    // path pattern where translations are loaded from
    // {{lng}} = language code (en, es, fr)
    // {{ns}} = namespace (common, todo, header)
    backend: {
      loadPath: "/locales/{{lng}}/{{ns}}.json",
    },

    // ============ DETECTION SETTINGS ============
    // Language detection options
    detection: {
      order: ["querystring", "localStorage", "navigator"],
      caches: ["localStorage"],
    },

    // ============ REACT SETTINGS ============
    react: {
      // Don't wait for translations to load
      // Better user experience
      useSuspense: false,
    },

    // Debug mode (set to false for production, true for development)
    debug: true,
  });

export default i18n;
