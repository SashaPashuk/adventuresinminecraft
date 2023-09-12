import { languageLocalizations } from "../contants/languageLocalizations.js";
import {
  ContentLoadingEventObserever,
  LanguageEventObserever,
} from "../utils/observer.js";
import { APP_LANGUAGES, DEFAULT_LANGUAGE } from "../contants/constants.js";

export const getLanguageFromUrl = (url = window.location) => {
  const urlParts = new URL(url);
  const pathnameParts = urlParts.pathname.split("/");
  const languageIndex = pathnameParts.findIndex((part) =>
    /^[a-z]{2}(-[a-zA-Z]+)?$/.test(part)
  );

  if (languageIndex !== -1) {
    return pathnameParts[languageIndex];
  }

  // Default language if no language code is found in the URL
  return "en";
};

const getDefaultLanguage = () => {
  // Check if we have language in ls and if not redirect only to en website version
  if (!localStorage.getItem("language")) {
    window.open(
      `${window.location.origin}${window.location.pathname.replace("/ru", "")}${
        window.location.search
      }`,
      "_self"
    );

    localStorage.setItem("language", "en");

    return "en";
  }

  const browserUserLanguage = navigator.language || navigator.userLanguage;
  const browserUserLanguageSupportedInApp = APP_LANGUAGES.includes(
    browserUserLanguage.split("-")[0]
  )
    ? browserUserLanguage.split("-")[0]
    : null;

  const defaultLang =
    getLanguageFromUrl() ||
    localStorage.getItem("language") ||
    browserUserLanguageSupportedInApp ||
    DEFAULT_LANGUAGE;
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

document.addEventListener("DOMContentLoaded", () => {
  // Translate the page to the default locale
  setLocale(defaultLocale);
  setTimeout(() => bindLocaleSwitcher(defaultLocale), 1000);
});

function bindLocaleSwitcher(initialValue) {
  const switcher = document.querySelector("[data-i18n-switcher]");

  if (switcher) {
    switcher.value = initialValue;

    switcher.onchange = (e) => {
      // onChange logic for langs except for EN
      if (APP_LANGUAGES.slice(1).includes(e.target.value)) {
        const pathname =
          window.location.pathname === "/" ? "" : window.location.pathname;
        const modifiedPathname = pathname.replace(
          `/${getLanguageFromUrl()}`,
          ""
        );
        window.open(
          `/${e.target.value}${modifiedPathname}${window.location.search}`,
          "_self"
        );
      }

      // onChnage logic for EN lang
      if (e.target.value === "en") {
        const pathname =
          window.location.pathname === `/${getLanguageFromUrl}`
            ? "/"
            : window.location.pathname.replace(`/${getLanguageFromUrl()}`, "");

        window.open(
          `${window.location.origin}${pathname}${window.location.search}`,
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
