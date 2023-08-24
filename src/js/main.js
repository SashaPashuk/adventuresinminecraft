import API from "../js/services/api.js";
import { APP_LANGUAGES, DEFAULT_LANGUAGE } from "./contants/constants.js";
import {
  renderCurrenciesToDropdownHTML,
  renderLanguagesToDropdownHTML,
} from "./utils/helpers.js";
import { ContentLoadingEventObserever } from "./utils/observer.js";
import {
  addCurrenciesSelectorEventListener,
  bindCurrenciesSwitcher,
  redirectForEnPaths,
  redirectForHomePaths,
} from "./utils/utils.js";

const menuItems = document.querySelectorAll(".nav-link");
const navItemsForUserLogic = document.querySelectorAll(".nav-item-user-logic");
const navItemForUserDropdownLogic = document.querySelector(
  ".nav-item-user-dd-logic"
);
const usernameElement = document.querySelector("#username");

menuItems.forEach(function (item) {
  if (item.getAttribute("href") === window.location.pathname) {
    item.classList.add("active");
  }
});

document.addEventListener("DOMContentLoaded", async () => {
  redirectForHomePaths();
  redirectForEnPaths();

  await new Promise((resolve) => setTimeout(resolve, 100));

  const detectedLanguage = window.location.pathname.includes("/ru/")
    ? "ru"
    : localStorage.getItem("language") || DEFAULT_LANGUAGE;

  if (detectedLanguage === "ru" && window.location.pathname === "/") {
    window.open(`${window.location.origin}/ru`, "_self");
  }

  const tokensData = localStorage.getItem("tokens");
  const usernameData = localStorage.getItem("username");

  renderUserOptions(tokensData, usernameData);

  // Show amount of items in cart
  const lsShopOrderItems = localStorage.getItem("orderItems");
  const serverShopCurrenciesResponse = await API.getShopCurrenciesRequest();
  const serverShopOrderItemsResponse = tokensData
    ? await API.getShopOrderItems()
    : [];

  const shopOrderItemsResponse = !tokensData
    ? (lsShopOrderItems && JSON.parse(lsShopOrderItems)) || []
    : serverShopOrderItemsResponse;

  const cartContainerCountElement = document.querySelector(
    ".cart-container-count"
  );

  if (cartContainerCountElement) {
    cartContainerCountElement.innerHTML = shopOrderItemsResponse.length || 0;
  }

  setTimeout(bindCurrenciesSwitcher, 100);

  renderCurrenciesToDropdownHTML(serverShopCurrenciesResponse);
  renderLanguagesToDropdownHTML(APP_LANGUAGES);

  addCurrenciesSelectorEventListener();
  addLanguageSelectorEventListener();
  addCookieEventListener();

  ContentLoadingEventObserever.broadcast(true);
});

// dropdown logic

const dropdownElement = document.querySelector(".dropdown");
const dropdownSelectionElement = document.querySelector(".dropdown-selection");
const dropdownItems = document.querySelectorAll(".dropdown-container li a");

dropdownItems?.forEach(function (item) {
  if (item.getAttribute("href") === window.location.pathname) {
    item.classList.add("active");
  }
});

dropdownSelectionElement?.addEventListener("click", () => {
  dropdownElement.classList.toggle("dropdown-open");
});

// modal logic

const closeModalElement = document.querySelector(
  ".exitConfirmation-modal-container-close-icon"
);
closeModalElement?.addEventListener("click", () => {
  window.history.back();
});

// close success payment modal logic

const closeSuccessPaymentModalElement = document.querySelector(
  ".successPayment-modal-container-close-icon"
);

closeSuccessPaymentModalElement?.addEventListener("click", () => {
  window.history.back();
});

// logout logic
const logoutButtonElement = document.querySelector("#logout-button");

logoutButtonElement?.addEventListener("click", () => {
  localStorage.removeItem("tokens");
});

const addLanguageSelectorEventListener = () => {
  const selector = document.querySelector(".custom-select");

  if (selector) {
    selector.addEventListener("change", (e) => {
      selector.querySelector("select").classList.remove("active");
    });
    selector.addEventListener("mousedown", (e) => {
      selector.querySelector("select").classList.add("active");

      if (window.innerWidth >= 420) {
        // override look for non mobile
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
              select.dispatchEvent(new Event("change"));
              selector.dispatchEvent(new Event("change"));
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

// cookie
const addCookieEventListener = () => {
  const cookie = localStorage.getItem("hasAcceptedCookie");
  if (!document?.querySelector(".cookie_container")) return;

  if (!cookie) {
    document?.querySelector(".cookie_container")?.classList.remove("hidden");
  }

  const cookieButton = document.querySelector("#cookieButton");

  cookieButton.addEventListener("click", () => {
    localStorage.setItem("hasAcceptedCookie", "true");
    document?.querySelector(".cookie_container")?.classList.add("hidden");
  });
};

const renderUserOptions = (tokensData, usernameData) => {
  if (tokensData) {
    navItemForUserDropdownLogic?.classList.remove("hidden-visibility");
    navItemsForUserLogic?.forEach((item) => item.classList.add("hidden"));

    if (usernameData && usernameElement) {
      usernameElement.innerHTML = usernameData.slice(0, 15) + "...";
      usernameElement.setAttribute("title", usernameData);
    }
  } else {
    navItemForUserDropdownLogic?.classList.add("hidden");
    navItemsForUserLogic?.forEach((item) =>
      item.classList.remove("hidden-visibility")
    );
  }
};
