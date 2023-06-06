import API from "./services/api.js";
import {
  renderShopItemInfoHTML,
  addToastNotification,
} from "./utils/helpers.js";
import { LanguageEventObserever } from "./utils/observer.js";
import { getLocalizedError } from "./services/errorsLanguageLocalization.js";
import {
  DEFAULT_LANGUAGE,
  SHOP_ITEM_TIME_USAGE,
} from "./contants/constants.js";
import {
  ITEM_ADDED_TO_CART_ERROR,
  ITEM_ADDED_TO_CART_SUCCESS,
  TOKEN_NOT_EXISTS,
  errorsLanguageLocalizationsEnum,
} from "./contants/errors.js";

// Constants
const lsTokens = localStorage.getItem("tokens");
let lsShopOrderItems =
  (localStorage.getItem("orderItems") &&
    JSON.parse(localStorage.getItem("orderItems"))) ||
  [];

// Observer

LanguageEventObserever.subscribe(async (data) => {
  const itemDataLocalStorage = localStorage.getItem("item_data");
  const shopItemsResponse = await API.getOneShopItem({
    languageCode: data.language,
    itemId: JSON.parse(itemDataLocalStorage)?.id || "",
  });

  renderShopItemInfoHTML(shopItemsResponse);

  addBuyShopItemEventListener(shopItemsResponse);
  addShopItemAmountEventListener();
});

// Event Listeners

document.addEventListener("DOMContentLoaded", async () => {
  const itemDataLocalStorage = localStorage.getItem("item_data");
  const shopItemsResponse = await API.getOneShopItem({
    languageCode: DEFAULT_LANGUAGE,
    itemId: JSON.parse(itemDataLocalStorage)?.id || "",
  });

  renderShopItemInfoHTML(shopItemsResponse);

  addBuyShopItemEventListener(shopItemsResponse);
  addShopItemAmountEventListener();
});

const addBuyShopItemEventListener = (item) => {
  const buyButtonElement = document.querySelector(".buy-block__buy-btn");
  const itemAmountElement = document.querySelector(
    ".quantity-control__number-title"
  );
  const cartContainerCountElement = document.querySelector(
    ".cart-container-count"
  );

  buyButtonElement?.addEventListener("click", async (event) => {
    event.preventDefault();

    // Logic for unauthorized user
    if (!lsTokens) {
      // Item can be added to cart once
      if (lsShopOrderItems.find((orderItem) => orderItem.id === item.id)) {
        addToastNotification({
          message: getLocalizedError(
            errorsLanguageLocalizationsEnum.ITEM_ADDED_TO_CART_ERROR
          ),
        });
        return;
      }

      if (item.is_one_time && Number(itemAmountElement.innerHTML) !== 1) {
        addToastNotification({
          message: getLocalizedError(
            errorsLanguageLocalizationsEnum.ITEM_AMOUNT_CAN_NOT_BE_BIGGER_THEN_ONE_ERROR
          ),
        });
        return;
      }

      const updatedlsShopOrderItems = [
        ...lsShopOrderItems,
        {
          ...item,
          amount: Number(itemAmountElement.innerHTML),
          time_to_use: SHOP_ITEM_TIME_USAGE["30_DAYS"],
          sum_item_price: Number(item.price),
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
    const result = await API.addShopItemToCart({
      amount: itemAmountElement.innerHTML,
      item_id: item.id,
      time_to_use: SHOP_ITEM_TIME_USAGE["30_DAYS"],
    });

    // errors
    const amountErrors = (result?.amount && result?.amount[0]) || "";

    Boolean(amountErrors) &&
      addToastNotification({ message: result?.amount[0] });

    result === ITEM_ADDED_TO_CART_ERROR &&
      addToastNotification({
        message: getLocalizedError(
          errorsLanguageLocalizationsEnum.ITEM_ADDED_TO_CART_ERROR
        ),
      });

    // success
    if (
      result === ITEM_ADDED_TO_CART_SUCCESS &&
      result?.detail !== TOKEN_NOT_EXISTS
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
};

const addShopItemAmountEventListener = () => {
  const itemAmountElement = document.querySelector(
    ".quantity-control__number-title"
  );
  const reduceBtn = document.querySelector(
    ".quantity-control__number-btn-reduce"
  );
  const increaseBtn = document.querySelector(
    ".quantity-control__number-btn-increase"
  );

  let quantity = parseInt(itemAmountElement.textContent);

  reduceBtn.addEventListener("click", () => {
    if (quantity > 1) {
      quantity--;
      updateQuantity();
      updatePrice();
    }
  });

  increaseBtn.addEventListener("click", () => {
    quantity++;
    updateQuantity();
    updatePrice();
  });

  function updateQuantity() {
    itemAmountElement.textContent = quantity;
  }

  const priceElement = document.getElementById("product_price");

  let initialPrice = parseFloat(priceElement.textContent.slice(1));

  function updatePrice() {
    const totalPrice = Number(initialPrice * quantity).toFixed(2);
    priceElement.textContent = `€${totalPrice}`;
  }
};
