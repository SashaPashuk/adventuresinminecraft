import { DEFAULT_LANGUAGE } from "../contants/constants.js";
import { getActiveLocale } from "../services/languageLocalization.js";
import { CurrencyObserever } from "./observer.js";

// rediractions

export const redirectForHomePaths = () => {
  const pathsForRedirect = {
    "/ru/home": "/ru",
    "/home": "/",
  };

  if (pathsForRedirect[window.location.pathname]) {
    window.open(pathsForRedirect[window.location.pathname], "_self");
  }
};

export const redirectForEnPaths = () => {
  if (window.location.pathname.includes("/en")) {
    window.open(
      `${window.location.origin}${window.location.pathname.replace("/en", "")}${
        window.location.search
      }`,
      "_self"
    );
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

// currencies

export const addCurrenciesSelectorEventListener = () => {
  const selector = document.querySelector(".custom-currencies-select");

  if (selector) {
    selector.addEventListener("change", () => {
      selector.querySelector("select").classList.remove("active");
    });

    selector.addEventListener("mousedown", (e) => {
      selector.querySelector("select").classList.add("active");

      if (window.innerWidth >= 420) {
        e.preventDefault();

        if (!selector.querySelector(".selector-options")) {
          const select = selector.children[0];
          const dropDown = document.createElement("ul");
          dropDown.className = "selector-options";

          [...select.children].forEach((option) => {
            const dropDownOption = document.createElement("li");
            dropDownOption.textContent = option.textContent;

            dropDownOption.addEventListener("mousedown", (e) => {
              if (select.value === option.value) {
                return;
              }
              e.stopPropagation();
              select.value = option.value;
              selector.value = option.value;
              localStorage.setItem("currency", option.value);
              select.dispatchEvent(new Event("change"));
              selector.dispatchEvent(new Event("change"));
              CurrencyObserever.broadcast(select.value);
              dropDown.remove();
            });

            dropDown.appendChild(dropDownOption);
          });

          selector.appendChild(dropDown);

          // handle click out
          document.addEventListener("click", (e) => {
            if (!selector.contains(e.target)) {
              selector.querySelector("select").classList.remove("active");
              dropDown.remove();
            }
          });
        }
      }
    });
  }
};

export const bindCurrenciesSwitcher = () => {
  const switcher = document.querySelector("[data-currencies-switcher]");

  if (switcher) {
    switcher.value = localStorage.getItem("currency") || "EUR";
    CurrencyObserever.broadcast(localStorage.getItem("currency") || "EUR");
  }
};
