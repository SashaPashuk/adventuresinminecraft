import API from "../js/services/api.js";
import {
  addToastNotification,
  renderShopItemsListHTML,
} from "./utils/helpers.js";
import {
  ContentLoadingEventObserever,
  LanguageEventObserever,
} from "./utils/observer.js";
import { getLocalizedError } from "./services/errorsLanguageLocalization.js";
import {
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
  });

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
      });

      // if (result === ITEM_ADDED_TO_CART_ERROR) {
      //   addToastNotification({
      //     message: getLocalizedError(
      //       errorsLanguageLocalizationsEnum.ITEM_ALREADY_ADDED_TO_CART_WITH_NAME,
      //       { firstParam: orderItem?.image_name.slice(0, -4) }
      //     ),
      //   });
      // }

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
      window.open("/pages/product", "_self");
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
        const updatedlsShopOrderItems = [
          ...lsShopOrderItems,
          {
            ...items.results[index],
            amount: 1,
            time_to_use: SHOP_ITEM_TIME_USAGE["30_DAYS"],
            sum_item_price: Number(items.results[index].price),
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
        time_to_use: SHOP_ITEM_TIME_USAGE["30_DAYS"],
      });

      // errors
      if (response === ITEM_ADDED_TO_CART_ERROR) {
        addToastNotification({
          message: getLocalizedError(
            errorsLanguageLocalizationsEnum.ITEM_ADDED_TO_CART_ERROR
          ),
        });
      }
      // success
      if (
        response !== ITEM_ADDED_TO_CART_ERROR &&
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
