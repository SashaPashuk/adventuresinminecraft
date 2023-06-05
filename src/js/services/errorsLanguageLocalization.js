import { DEFAULT_LANGUAGE } from "../contants/constants.js";
import { errorsLanguageLocalizations } from "../contants/errors.js";
import { LanguageEventObserever } from "../utils/observer.js";

// The locale our app first shows
let defaultLocale = localStorage.getItem("language") || DEFAULT_LANGUAGE;

LanguageEventObserever.subscribe((data) => {
  defaultLocale = data.language;
});

export const getLocalizedError = (errorName, params) => {
  const error = errorsLanguageLocalizations[defaultLocale][errorName];

  if (typeof error === "function") {
    return error(params.firstParam);
  }

  return error;
};
