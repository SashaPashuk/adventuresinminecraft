import API from "../js/services/api.js";
import {
  addToastNotification,
  getCurrencySign,
  productSchemaGenerator,
  renderShopItemsListHTML,
} from "./utils/helpers.js";
import {
  ContentLoadingEventObserever,
  CurrencyObserever,
  LanguageEventObserever,
} from "./utils/observer.js";
import { getLocalizedError } from "./services/errorsLanguageLocalization.js";
import {
  ITEM_ADDED_TO_CART_CURRENCY_ERROR,
  ITEM_ADDED_TO_CART_ERROR,
  ITEM_ADDED_TO_CART_SUCCESS,
  TOKEN_NOT_EXISTS,
  errorsLanguageLocalizationsEnum,
} from "./contants/errors.js";
import {
  DEFAULT_LANGUAGE,
  SHOP_ITEM_SORT_PRICE_TYPES,
  SHOP_ITEM_TIME_USAGE,
  SHOP_ITEM_TYPES,
} from "./contants/constants.js";
import { getActiveLocale } from "./services/languageLocalization.js";

// Constants

const lsTokens = localStorage.getItem("tokens");
let lsShopOrderItems =
  (localStorage.getItem("orderItems") &&
    JSON.parse(localStorage.getItem("orderItems"))) ||
  [];

// Observer

LanguageEventObserever.subscribe(async (data) => {
  const checkedShopItemType = document
    .querySelector(".products-svitch")
    ?.querySelector("input[checked]");
  const selectedSortPriceType =
    document
      .querySelector(".dropdown-custom__selection span")
      ?.getAttribute("data-selected-sort-name") ||
    SHOP_ITEM_SORT_PRICE_TYPES.FROM_CHEAP_TO_EXPENSIVE;

  const shopItemsResult = await API.getShopItems(data.language, {
    type: checkedShopItemType?.value || SHOP_ITEM_TYPES.Survival,
    sort_price: selectedSortPriceType,
    currency: localStorage.getItem("currency") || "EUR",
  });

  renderShopItemsListHTML(shopItemsResult);

  addProductCartButtonsEventListeners(shopItemsResult);
  addProductCardsEventListeners(shopItemsResult);
  addShopItemsTypeSwitchEventListener();
});

CurrencyObserever.subscribe(async (currency) => {
  const lsLanguage = localStorage.getItem("language") || DEFAULT_LANGUAGE;
  const checkedShopItemType = document
    .querySelector(".products-svitch")
    ?.querySelector("input[checked]");
  const selectedSortPriceType =
    document
      .querySelector(".dropdown-custom__selection span")
      ?.getAttribute("data-selected-sort-name") ||
    SHOP_ITEM_SORT_PRICE_TYPES.FROM_CHEAP_TO_EXPENSIVE;

  const shopItemsResult = await API.getShopItems(lsLanguage, {
    type: checkedShopItemType?.value || SHOP_ITEM_TYPES.Survival,
    sort_price: selectedSortPriceType,
    currency: currency,
  });

  renderShopItemsListHTML(shopItemsResult);

  addProductCartButtonsEventListeners(shopItemsResult);
  addProductCardsEventListeners(shopItemsResult);
  addShopItemsTypeSwitchEventListener();
});

// Event Listeners

document.addEventListener("DOMContentLoaded", async () => {
  const lsLanguage = localStorage.getItem("language") || DEFAULT_LANGUAGE;
  // Make <Survival> type checked by default after page rendering
  const checkedShopItemType = document.querySelector('input[type="radio"]');
  checkedShopItemType?.setAttribute("checked", "true");
  checkedShopItemType?.classList.add("checked");
  // Sort price type
  const selectedSortPriceType =
    document
      .querySelector(".dropdown-custom__selection span")
      ?.getAttribute("data-selected-sort-name") ||
    SHOP_ITEM_SORT_PRICE_TYPES.FROM_CHEAP_TO_EXPENSIVE;

  const shopItemsResult = await API.getShopItems(lsLanguage, {
    type: SHOP_ITEM_TYPES.Survival,
    sort_price: selectedSortPriceType,
    currency: localStorage.getItem("currency") || "EUR",
  });

  if (shopItemsResult?.results.length) {
    shopItemsResult?.results.forEach((shopItemsResponse) =>
      productSchemaGenerator({
        price:
          shopItemsResponse?.forever_price || shopItemsResponse?.price || 0,
        name: shopItemsResponse?.market_name || "",
      })
    );
  }

  renderShopItemsListHTML(shopItemsResult);

  addProductCartButtonsEventListeners(shopItemsResult);
  addProductCardsEventListeners(shopItemsResult);
  addShopItemsTypeSwitchEventListener();
  addPriceSortingDropdownEventListener();

  ContentLoadingEventObserever.broadcast(true);

  // After first login, we add all order items from lsShopOrderItems to server
  if (lsTokens && lsShopOrderItems.length) {
    const cartContainerCountElement = document.querySelector(
      ".cart-container-count"
    );

    lsShopOrderItems.forEach(async (orderItem) => {
      const result = await API.addShopItemToCart({
        amount: orderItem.amount,
        time_to_use: orderItem.time_to_use,
        item_id: orderItem.id,
        currency: orderItem.currency,
      });

      if (result === ITEM_ADDED_TO_CART_SUCCESS) {
        cartContainerCountElement.innerHTML =
          Number(cartContainerCountElement.innerHTML) + 1;
      }

      localStorage.removeItem("orderItems");
    });
  }
});

const addProductCardsEventListeners = (cards) => {
  const productsCartElements = document.querySelectorAll(".products-card");

  productsCartElements?.forEach((item, index) => {
    item.addEventListener("click", () => {
      localStorage.setItem(
        "item_data",
        JSON.stringify({
          id: cards?.results[index].id,
          type: cards?.results[index].type,
        })
      );

      const productUrl =
        getActiveLocale() === "ru"
          ? `/ru/pages/product?id=${cards?.results[index].id}`
          : `/pages/product?id=${cards?.results[index].id}`;
      window.open(productUrl, "_self");
    });
  });
};

const addProductCartButtonsEventListeners = (items) => {
  const productsCartButtonElements = document.querySelectorAll(
    ".products-card__buy"
  );
  const cartContainerCountElement = document.querySelector(
    ".cart-container-count"
  );

  productsCartButtonElements?.forEach((button, index) => {
    button.addEventListener("click", async (e) => {
      e.stopPropagation();
      e.preventDefault();

      // Logic for unauthorized user
      if (!lsTokens) {
        // Item can be added to cart once
        if (
          lsShopOrderItems.find((item) => item.id === items.results[index].id)
        ) {
          addToastNotification({
            message: getLocalizedError(
              errorsLanguageLocalizationsEnum.ITEM_ADDED_TO_CART_ERROR
            ),
          });
          return;
        }
        // Item can be with different currency
        if (
          lsShopOrderItems.find(
            (item) =>
              item.currency !== (localStorage.getItem("currency") || "EUR")
          )
        ) {
          addToastNotification({
            message: getLocalizedError(
              errorsLanguageLocalizationsEnum.ITEM_ADDED_TO_CART_CURRENCY_ERROR
            ),
          });
          return;
        }

        const updatedlsShopOrderItems = [
          ...lsShopOrderItems,
          {
            ...items.results[index],
            amount: 1,
            time_to_use: items.results[index].price
              ? SHOP_ITEM_TIME_USAGE["30_DAYS"]
              : SHOP_ITEM_TIME_USAGE.Forever,
            sum_item_price: items.results[index].price
              ? Number(items.results[index].price).toFixed(2)
              : Number(items.results[index].forever_price).toFixed(2),
            currency: localStorage.getItem("currency") || "EUR",
          },
        ];
        lsShopOrderItems = updatedlsShopOrderItems;
        localStorage.setItem(
          "orderItems",
          JSON.stringify(updatedlsShopOrderItems)
        );

        addToastNotification({
          message: getLocalizedError(
            errorsLanguageLocalizationsEnum.ITEM_ADDED_TO_CART_SUCCESS
          ),
        });

        cartContainerCountElement.innerHTML =
          Number(cartContainerCountElement.innerHTML) + 1;

        return;
      }

      // Logic for authorized user
      const response = await API.addShopItemToCart({
        amount: 1,
        item_id: button.getAttribute("data-id"),
        time_to_use: items.results[index].price
          ? SHOP_ITEM_TIME_USAGE["30_DAYS"]
          : SHOP_ITEM_TIME_USAGE.Forever,
        currency: localStorage.getItem("currency") || "EUR",
      });

      // errors
      if (
        [ITEM_ADDED_TO_CART_ERROR, ITEM_ADDED_TO_CART_CURRENCY_ERROR].includes(
          response
        )
      ) {
        addToastNotification({
          message: getLocalizedError(
            response === ITEM_ADDED_TO_CART_ERROR
              ? errorsLanguageLocalizationsEnum.ITEM_ADDED_TO_CART_ERROR
              : errorsLanguageLocalizationsEnum.ITEM_ADDED_TO_CART_CURRENCY_ERROR
          ),
        });
      }
      // success
      if (
        ![ITEM_ADDED_TO_CART_ERROR, ITEM_ADDED_TO_CART_CURRENCY_ERROR].includes(
          response
        ) &&
        response?.detail !== TOKEN_NOT_EXISTS
      ) {
        addToastNotification({
          message: getLocalizedError(
            errorsLanguageLocalizationsEnum.ITEM_ADDED_TO_CART_SUCCESS
          ),
        });

        cartContainerCountElement.innerHTML =
          Number(cartContainerCountElement.innerHTML) + 1;
      }
    });
  });
};

const addShopItemsTypeSwitchEventListener = () => {
  const itemTypeSwitchElement = document.querySelector(".products-svitch");
  const itemTypeSwitchInputElements = document.querySelectorAll(
    ".products-svitch input"
  );

  itemTypeSwitchElement?.addEventListener("change", async (e) => {
    const lsLanguage = localStorage.getItem("language") || DEFAULT_LANGUAGE;
    const selectedItemType = e.target.value;
    const selectedSortPriceType =
      document
        .querySelector(".dropdown-custom__selection span")
        ?.getAttribute("data-selected-sort-name") ||
      SHOP_ITEM_SORT_PRICE_TYPES.FROM_CHEAP_TO_EXPENSIVE;

    const shopItemsResult = await API.getShopItems(lsLanguage, {
      type: selectedItemType,
      sort_price: selectedSortPriceType,
      currency: localStorage.getItem("currency") || "EUR",
    });

    itemTypeSwitchInputElements?.forEach((item) => {
      if (item.value === selectedItemType) {
        item.setAttribute("checked", "true");
        item.classList.add("checked");
      } else {
        item.removeAttribute("checked");
        item.classList.remove("checked");
      }
    });

    renderShopItemsListHTML(shopItemsResult);

    addProductCartButtonsEventListeners(shopItemsResult);
    addProductCardsEventListeners(shopItemsResult);
  });
};

const addPriceSortingDropdownEventListener = () => {
  const dropdownServersSelectionElement = document.querySelector(
    ".dropdown-custom__selection"
  );
  const dropdownServersContainerElement = document.querySelector(
    ".dropdown-custom__container"
  );

  dropdownServersSelectionElement?.addEventListener("click", () => {
    dropdownServersContainerElement.classList.toggle("hidden");
    dropdownServersSelectionElement.classList.toggle(
      "dropdown-custom__selection-open"
    );

    const dropdownServersContainerItemsElements = document.querySelectorAll(
      ".dropdown-custom__container__item"
    );

    const addDropdownHandlers = () => {
      const selected = dropdownServersSelectionElement?.querySelector("span");

      dropdownServersContainerItemsElements?.forEach(async (item) => {
        // for making selected el after dd opening
        item.getAttribute("data-sort-name") ===
        selected.getAttribute("data-selected-sort-name")
          ? item.classList.add("selected")
          : item.classList.remove("selected");

        item.addEventListener("click", async () => {
          selected.textContent = item.textContent;
          selected.setAttribute(
            "data-selected-sort-name",
            item.getAttribute("data-sort-name")
          );
          dropdownServersContainerElement.classList.add("hidden");

          // update shop items
          const lsLanguage =
            localStorage.getItem("language") || DEFAULT_LANGUAGE;
          const selectedItemType = document.querySelector(
            ".products-svitch .checked"
          );

          const shopItemsResult = await API.getShopItems(lsLanguage, {
            type: selectedItemType?.value || SHOP_ITEM_TYPES.Survival,
            sort_price: item.getAttribute("data-sort-name"),
            currency: localStorage.getItem("currency") || "EUR",
          });

          renderShopItemsListHTML(shopItemsResult);

          addProductCartButtonsEventListeners(shopItemsResult);
          addProductCardsEventListeners(shopItemsResult);
        });
      });
    };

    addDropdownHandlers();
  });
};
