import API from "./services/api.js";
import {
  renderShopItemInfoHTML,
  addToastNotification,
} from "./utils/helpers.js";
import {
  ContentLoadingEventObserever,
  LanguageEventObserever,
} from "./utils/observer.js";
import { getLocalizedError } from "./services/errorsLanguageLocalization.js";
import { SHOP_ITEM_TIME_USAGE } from "./contants/constants.js";
import {
  ITEM_ADDED_TO_CART_ERROR,
  ITEM_ADDED_TO_CART_SUCCESS,
  ITEM_DURATION_SERVER_ERROR,
  TOKEN_NOT_EXISTS,
  errorsLanguageLocalizationsEnum,
} from "./contants/errors.js";
import { getActiveLocale } from "./services/languageLocalization.js";

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
  addShopItemAmountEventListener(shopItemsResponse);
  addShopItemUsageEventListener(shopItemsResponse);

  ContentLoadingEventObserever.broadcast(true);
  changeMetadate(shopItemsResponse);
});

// Event Listeners

document.addEventListener("DOMContentLoaded", async () => {
  const itemDataLocalStorage = localStorage.getItem("item_data");
  const lsLanguage = getActiveLocale();
  const shopItemsResponse = await API.getOneShopItem({
    languageCode: lsLanguage,
    itemId: JSON.parse(itemDataLocalStorage)?.id || "",
  });

  renderShopItemInfoHTML(shopItemsResponse);

  addBuyShopItemEventListener(shopItemsResponse);
  addShopItemAmountEventListener(shopItemsResponse);
  addShopItemUsageEventListener(shopItemsResponse);

  ContentLoadingEventObserever.broadcast(true);
  changeMetadate(shopItemsResponse);
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

    const selectedUsageElement = document
      .querySelector(".content__usage-actions")
      ?.querySelector(".selected");

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

      if (
        !item.forever_price &&
        selectedUsageElement &&
        selectedUsageElement.getAttribute("data-type") ===
          SHOP_ITEM_TIME_USAGE.Forever
      ) {
        addToastNotification({
          message: getLocalizedError(
            errorsLanguageLocalizationsEnum.ITEM_DURATION_ERROR
          ),
        });
        return;
      }

      const updatedlsShopOrderItems = [
        ...lsShopOrderItems,
        {
          ...item,
          amount: Number(itemAmountElement.innerHTML),
          time_to_use: item.price
            ? SHOP_ITEM_TIME_USAGE["30_DAYS"]
            : SHOP_ITEM_TIME_USAGE.Forever,
          sum_item_price: item.price
            ? Number(itemAmountElement.innerHTML) * Number(item.price)
            : Number(itemAmountElement.innerHTML) * Number(item.forever_price),
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
      time_to_use: item.price
        ? SHOP_ITEM_TIME_USAGE["30_DAYS"]
        : SHOP_ITEM_TIME_USAGE.Forever,
    });

    // errors
    const timeToUserError =
      (result?.time_to_use && result?.time_to_use[0]) || "";
    const amountErrors = (result?.amount && result?.amount[0]) || "";

    if (timeToUserError) {
      addToastNotification({
        message:
          timeToUserError === ITEM_DURATION_SERVER_ERROR
            ? getLocalizedError(
                errorsLanguageLocalizationsEnum.ITEM_DURATION_ERROR
              )
            : timeToUserError,
      });
    }

    Boolean(amountErrors) && addToastNotification({ message: amountErrors });

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

const addShopItemAmountEventListener = (product) => {
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

  function updatePrice() {
    const usagesButtonElement = document
      .querySelector(".content__usage-actions")
      ?.querySelector(".selected");

    const priceElement = document.getElementById("product_price");

    if (usagesButtonElement) {
      if (usagesButtonElement.getAttribute("data-type") === "30") {
        priceElement.textContent = `€${Number(product.price * quantity).toFixed(
          2
        )}`;
      } else {
        priceElement.textContent = `€${Number(
          product.forever_price * quantity
        ).toFixed(2)}`;
      }
    } else {
      priceElement.textContent = `€${Number(product.price * quantity).toFixed(
        2
      )}`;
    }
  }
};

const addShopItemUsageEventListener = (product) => {
  const usagesButtonElements = document
    .querySelector(".content__usage-actions")
    ?.querySelectorAll("button");
  const productPrice = document.querySelector("#product_price");

  usagesButtonElements?.forEach((button) => {
    button.addEventListener("click", async () => {
      const itemAmountElement = document.querySelector(
        ".quantity-control__number-title"
      );
      const quantity = parseInt(itemAmountElement.textContent);

      if (button.getAttribute("data-type") === "30") {
        usagesButtonElements[0].classList.add("selected");
        usagesButtonElements[0].classList.add("button-primary");
        usagesButtonElements[0].classList.remove("button-shade");
        usagesButtonElements[1].classList.remove("selected");
        usagesButtonElements[1].classList.remove("button-primary");
        usagesButtonElements[1].classList.add("button-shade");
        productPrice.textContent =
          productPrice.textContent.slice(0, 1) +
          quantity * Number(product.price);
      } else {
        usagesButtonElements[1].classList.add("selected");
        usagesButtonElements[1].classList.add("button-primary");
        usagesButtonElements[1].classList.remove("button-shade");
        usagesButtonElements[0].classList.remove("selected");
        usagesButtonElements[0].classList.remove("button-primary");
        usagesButtonElements[0].classList.add("button-shade");
        productPrice.textContent =
          productPrice.textContent.slice(0, 1) +
          quantity * Number(product.forever_price);
      }
    });
  });
};

const changeMetadate = (item) => {
  const title = document.querySelector("title");
  const desc = document.querySelector('meta[name="description"]');

  title.innerText = title.innerText.replace("{product_name}", item.market_name);
  desc.setAttribute(
    "content",
    desc.getAttribute("content").replace("{product_name}", item.market_name)
  );
};
