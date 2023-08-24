import { APP_LANGUAGES } from "../contants/constants.js";
import { getLanguageFromUrl } from "../services/languageLocalization.js";

export const getLanguageFromURLWithoutEN = () => {
  return APP_LANGUAGES.slice(1).includes(getLanguageFromUrl())
    ? `/${getLanguageFromUrl()}`
    : "";
};
