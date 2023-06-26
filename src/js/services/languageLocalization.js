import { languageLocalizations } from "../contants/languageLocalizations.js";
import {
  ContentLoadingEventObserever,
  LanguageEventObserever,
} from "../utils/observer.js";
import { APP_LANGUAGES, DEFAULT_LANGUAGE } from "../contants/constants.js";

const getDefaultLanguage = () => {
  const languageFromURL = window.location.pathname.includes("/ru/")
    ? "ru"
    : "en";

  const browserUserLanguage = navigator.language || navigator.userLanguage;
  const browserUserLanguageSupportedInApp = APP_LANGUAGES.includes(
    browserUserLanguage.split("-")[0]
  )
    ? browserUserLanguage.split("-")[0]
    : null;

  const defaultLang =
    languageFromURL ||
    localStorage.getItem("language") ||
    browserUserLanguageSupportedInApp ||
    DEFAULT_LANGUAGE;

  localStorage.setItem("language", defaultLang);
  return defaultLang;
};
// The locale our app first shows
let defaultLocale = getDefaultLanguage();

// The active locale
let locale;

export const getActiveLocale = () => locale;
export const setActiveLocale = (newLocale) => {
  locale = newLocale;
  defaultLocale = newLocale;
};

// Gets filled with active locale translations
let translations = {};

ContentLoadingEventObserever.subscribe((dataLoaded) => {
  if (dataLoaded) {
    translatePage();
  }
});

// When the page content is ready...
document.addEventListener("DOMContentLoaded", () => {
  // Translate the page to the default locale
  setLocale(defaultLocale);
  bindLocaleSwitcher(defaultLocale);
});

function bindLocaleSwitcher(initialValue) {
  const switcher = document.querySelector("[data-i18n-switcher]");

  if (switcher) {
    switcher.value = initialValue;
    switcher.onchange = (e) => {
      const hasRepalceLanguageCode =
        window.location.pathname.includes("/en") ||
        window.location.pathname.includes("/ru");

      if (hasRepalceLanguageCode) {
        window.open(
          `${window.location.origin}${window.location.pathname.replace(
            e.target.value === "ru" ? "/en" : "/ru",
            e.target.value === "ru" ? "/ru" : "/en"
          )}`,
          "_self"
        );
      }

      // Set the locale to the selected option[value]
      setLocale(e.target.value);
      localStorage.setItem("language", e.target.value);
      LanguageEventObserever.broadcast({ language: e.target.value });
    };
  }
}

// Load translations for the given locale and translate the page to this locale
export async function setLocale(newLocale) {
  if (newLocale === locale) return;

  const newTranslations = await fetchTranslationsFor(newLocale);

  locale = newLocale;

  translations = newTranslations;

  translatePage();
}

// Retrieve translations object for the given locale
const fetchTranslationsFor = (newLocale) => languageLocalizations[newLocale];

// Replace the inner text of each element that has a
// data-i18n-key attribute with the translation corresponding
// to its data-i18n-key
const translatePage = () =>
  document.querySelectorAll("[data-i18n-key]").forEach(translateElement);

// Replace the inner text of the given HTML element
// with the translation in the active locale,
// corresponding to the element's data-i18n-key
function translateElement(element) {
  const key = element.getAttribute("data-i18n-key");
  const translation = translations[key];

  if (
    element.nodeName === "INPUT" &&
    element.dataset.i18nKey.includes("Placeholder")
  ) {
    element.placeholder = translation;
  }

  if (
    element.dataset.i18nKey.includes("_desc") &&
    element.dataset.i18nKey.includes("meta")
  ) {
    element.content = translation;
    return;
  }

  if (element.dataset.i18nKey.includes("InnerHTML")) {
    element.innerHTML = translation;
    return;
  }

  element.innerText = translation;
}
