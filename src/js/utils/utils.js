import { DEFAULT_LANGUAGE } from "../contants/constants.js";
import { getActiveLocale } from "../services/languageLocalization.js";

export const redirectForPaths = () => {
  const pathsForRedirect = {
    "/ru/home": "/ru",
    "/home": "/",
  };

  if (pathsForRedirect[window.location.pathname]) {
    window.open(pathsForRedirect[window.location.pathname], "_self");
  }
};

export const redirectPaymentPaths = () => {
  const lang = getActiveLocale();

  if (lang !== DEFAULT_LANGUAGE || window.location.pathname.includes("/ru/"))
    return;

  if (lang === DEFAULT_LANGUAGE) {
    window.open(`/${lang}${window.location.pathname}`, "_self");
  }
};
