import API from "../js/services/api.js";
import {
  addToastNotification,
  renderShopItemsListHTML,
} from "./utils/helpers.js";
import { LanguageEventObserever } from "./utils/observer.js";
import { getLocalizedError } from "./services/errorsLanguageLocalization.js";
import {
  ITEM_ADDED_TO_CART_ERROR,
  TOKEN_NOT_EXISTS,
  errorsLanguageLocalizationsEnum,
} from "./contants/errors.js";
import {
  DEFAULT_LANGUAGE,
  SHOP_ITEM_TIME_USAGE,
  SHOP_ITEM_TYPES,
} from "./contants/constants.js";

// Observer

LanguageEventObserever.subscribe(async (data) => {
  const checkedShopItemType = document.querySelector('input[type="radio"]');
  checkedShopItemType?.setAttribute("checked", "true");
  checkedShopItemType?.classList.add("checked");

  const shopItemsResult = await API.getShopItems(data.language, {
    type: SHOP_ITEM_TYPES.Survival,
  });

  renderShopItemsListHTML(shopItemsResult);

  addProductCartButtonsEventListeners();
  addProductCardsEventListeners(shopItemsResult);
  addShopItemsTypeSwitchEventListener();
});

// Event Listeners

document.addEventListener("DOMContentLoaded", async () => {
  // Make <Survival> type checked by default after page rendering
  const checkedShopItemType = document.querySelector('input[type="radio"]');
  checkedShopItemType?.setAttribute("checked", "true");
  checkedShopItemType?.classList.add("checked");

  const shopItemsResult = await API.getShopItems(DEFAULT_LANGUAGE, {
    type: SHOP_ITEM_TYPES.Survival,
  });

  renderShopItemsListHTML(shopItemsResult);

  addProductCartButtonsEventListeners();
  addProductCardsEventListeners(shopItemsResult);
  addShopItemsTypeSwitchEventListener();
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

const addProductCartButtonsEventListeners = () => {
  const productsCartButtonElements = document.querySelectorAll(
    ".products-card__buy"
  );
  const cartContainerCountElement = document.querySelector(
    ".cart-container-count"
  );

  productsCartButtonElements?.forEach((button) => {
    button.addEventListener("click", async (e) => {
      e.stopPropagation();
      e.preventDefault();

      const response = await API.addShopItemToCart({
        amount: 1,
        item_id: button.getAttribute("data-id"),
        time_to_use: SHOP_ITEM_TIME_USAGE["30_DAYS"],
      });

      // errors
      response?.detail === TOKEN_NOT_EXISTS &&
        addToastNotification({
          message: getLocalizedError(
            errorsLanguageLocalizationsEnum.USER_SHOULD_LOGIN_FIRST
          ),
        });

      response === ITEM_ADDED_TO_CART_ERROR &&
        addToastNotification({
          message: getLocalizedError(
            errorsLanguageLocalizationsEnum.ITEM_ADDED_TO_CART_ERROR
          ),
        });

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
    const selectedItemType = e.target.value;

    const shopItemsResult = await API.getShopItems(DEFAULT_LANGUAGE, {
      type: selectedItemType,
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

    addProductCartButtonsEventListeners();
    addProductCardsEventListeners(shopItemsResult);
  });
};
