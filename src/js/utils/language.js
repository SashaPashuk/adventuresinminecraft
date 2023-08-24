import { APP_LANGUAGES } from "../contants/constants.js";

export const getLanguageFromURLWithoutEN = () => {
  return APP_LANGUAGES.slice(1).includes(getLanguageFromUrl())
    ? `/${getLanguageFromUrl()}`
    : "";
};
