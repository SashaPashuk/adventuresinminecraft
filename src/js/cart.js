import API from "../js/services/api.js";
import {
  addToastNotification,
  renderCartItemsHTML,
  renderServerDropdownItemsHTML,
} from "./utils/helpers.js";
import { getLocalizedError } from "./services/errorsLanguageLocalization.js";
import {
  FIELD_NOT_EMPTY_ERROR,
  ITEM_AMOUNT_CAN_NOT_BE_CHANGED_ERROR,
  ITEM_AMOUNT_CHANGED_SUCCESS,
  ITEM_DELETED_FROM_CART_SUCCESS,
  ITEM_DURATION_SUCCESS,
  errorsLanguageLocalizationsEnum,
} from "./contants/errors.js";
import { SHOP_ITEM_TIME_USAGE } from "./contants/constants.js";

// Event Listeners

document.addEventListener("DOMContentLoaded", async () => {
  const shopOrderItemsResponse = await API.getShopOrderItems();
  const shopServersResponse = await API.getShopServersRequest();

  renderCartItemsHTML(shopOrderItemsResponse);
  renderOverallPaymentSumHTML(shopOrderItemsResponse);
  renderServerDropdownItemsHTML(shopServersResponse);

  addProductDeleteButtonEventListener();
  addProductIncreaseDecreasButtonsEventListener();
  addCartPaymentButtonEventListener();
  addServersDropdownEventListener();
  addOrderItemsUsageButtonsEventListener();
});

const addCartPaymentButtonEventListener = () => {
  const cartPaymentButtonElement = document.querySelector(
    "#cart-payment-button"
  );

  cartPaymentButtonElement?.addEventListener("click", async (e) => {
    e.preventDefault();

    const paymentSummaryElement = document.querySelector(
      ".cartPage-summary-payment"
    );
    const cartPaymentNicknameElement = document.querySelector(
      "#cart-payment-nickname"
    );
    const selectedServer = document.querySelector("#dropdown-selected-item");

    const createdPaymentResponse = await API.createPaymentRequest({
      user_nickname: cartPaymentNicknameElement.value,
      server: selectedServer.innerHTML,
    });

    const nicknameErrors =
      (createdPaymentResponse?.user_nickname &&
        createdPaymentResponse?.user_nickname[0]) ||
      "";

    if ([FIELD_NOT_EMPTY_ERROR].includes(nicknameErrors)) {
      const labelForNicknameError = paymentSummaryElement?.querySelector(
        'label[for="nickname"]'
      );
      labelForNicknameError.innerHTML = "Enter valid nickname.";
    }

    if (createdPaymentResponse?.redirect_url) {
      window.open(createdPaymentResponse.redirect_url, "_blank");
      window.location.reload();
    }
  });
};

const addServersDropdownEventListener = () => {
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

      dropdownServersContainerItemsElements?.forEach((item) => {
        item.addEventListener("click", () => {
          selected.innerHTML = item.innerHTML;
          dropdownServersContainerElement.classList.add("hidden");
        });
      });
    };

    addDropdownHandlers();
  });
};

const addProductIncreaseDecreasButtonsEventListener = () => {
  const productsCartElements = document.querySelectorAll(".cartPage-list-item");

  productsCartElements?.forEach((item) => {
    const increase = item.querySelector(".cart-item-increase-button");
    const decrease = item.querySelector(".cart-item-decrease-button");
    const amount = item.querySelector(".cart-item-amount");

    increase.addEventListener("click", async () => {
      const response = await API.updateShopItemInCart(
        item.getAttribute("data-cart-id"),
        { amount: Number(amount.innerHTML) + 1 }
      );

      // errors
      response === ITEM_AMOUNT_CAN_NOT_BE_CHANGED_ERROR &&
        addToastNotification({
          message: getLocalizedError(
            errorsLanguageLocalizationsEnum.ITEM_AMOUNT_CAN_NOT_BE_CHANGED_ERROR
          ),
        });

      // success
      if (response === ITEM_AMOUNT_CHANGED_SUCCESS) {
        modifyOverallPaymentSumHTML(
          "increase",
          Number(item.querySelector(".cartPage-list-item-sum")?.innerHTML || 0)
        );
        amount.textContent = Number(amount.innerHTML) + 1;
      }
    });

    decrease.addEventListener("click", async () => {
      const response = await API.updateShopItemInCart(
        item.getAttribute("data-cart-id"),
        { amount: Number(amount.innerHTML) + 1 }
      );

      // errors
      response === ITEM_AMOUNT_CAN_NOT_BE_CHANGED_ERROR &&
        addToastNotification({
          message: getLocalizedError(
            errorsLanguageLocalizationsEnum.ITEM_AMOUNT_CAN_NOT_BE_CHANGED_ERROR
          ),
        });

      // success
      if (response === ITEM_AMOUNT_CHANGED_SUCCESS) {
        modifyOverallPaymentSumHTML(
          "decrease",
          Number(item.querySelector(".cartPage-list-item-sum")?.innerHTML || 0)
        );
        amount.textContent = Number(amount.innerHTML) - 1;
      }
    });
  });
};

const addProductDeleteButtonEventListener = () => {
  const productsCartButtonElements = document.querySelectorAll(
    ".cart-item-delete-button"
  );
  const cartContainerCountElement = document.querySelector(
    ".cart-container-count"
  );

  productsCartButtonElements.forEach((button) => {
    button.addEventListener("click", (e) => {
      e.stopPropagation();
      e.preventDefault();

      const response = API.deleteShopItemFromCart(
        button.getAttribute("data-id")
      );
      const cartElement = document.querySelector(
        `li[data-cart-id="${button.getAttribute("data-id")}"]`
      );

      response.then((data) => {
        if (data === ITEM_DELETED_FROM_CART_SUCCESS) {
          modifyOverallPaymentSumHTML(
            "decrease",
            Number(
              cartElement.querySelector(".cartPage-list-item-sum")?.innerHTML ||
                0
            )
          );
          addToastNotification({
            message: getLocalizedError(
              errorsLanguageLocalizationsEnum.ITEM_DELETED_FROM_CART_SUCCESS
            ),
          });
          cartElement?.remove();
          cartContainerCountElement.innerHTML =
            Number(cartContainerCountElement.innerHTML) - 1;
        }
      });
    });
  });
};

const addOrderItemsUsageButtonsEventListener = () => {
  const productsCartElements = document.querySelectorAll(".cartPage-list-item");

  productsCartElements?.forEach((item) => {
    const buttonsContainer = item.querySelector(
      ".cartPage-list-item-usage-actions"
    );
    const buttons = item.querySelectorAll(
      ".cartPage-list-item-usage-actions button"
    );
    const usageDaysButton = buttonsContainer.querySelector("#item-usage-days");
    const usageForeverButton = buttonsContainer.querySelector(
      "#item-usage-forever"
    );

    buttons?.forEach((button) => {
      button.addEventListener("click", async () => {
        if (button.getAttribute("data-type") === "30") {
          const response = await API.updateShopItemDurationInCart({
            item_id: item.getAttribute("data-cart-id"),
            time_to_use: SHOP_ITEM_TIME_USAGE["30_DAYS"],
          });

          const timeToUserError =
            (response?.time_to_use && response?.time_to_use[0]) || "";

          // errors
          if (timeToUserError) {
            addToastNotification({ message: timeToUserError });
          }

          // success
          if (response === ITEM_DURATION_SUCCESS) {
            addToastNotification({
              message: getLocalizedError(
                errorsLanguageLocalizationsEnum.ITEM_DURATION_SUCCESS
              ),
            });

            usageDaysButton.classList.add("selected");
            usageForeverButton.classList.remove("selected");
          }
        } else {
          const response = await API.updateShopItemDurationInCart({
            item_id: item.getAttribute("data-cart-id"),
            time_to_use: SHOP_ITEM_TIME_USAGE.Forever,
          });

          const timeToUserError =
            (response?.time_to_use && response?.time_to_use[0]) || "";

          // errors
          if (timeToUserError) {
            addToastNotification({ message: timeToUserError });
          }

          // success
          if (response === ITEM_DURATION_SUCCESS) {
            addToastNotification({
              message: getLocalizedError(
                errorsLanguageLocalizationsEnum.ITEM_DURATION_SUCCESS
              ),
            });

            usageDaysButton.classList.remove("selected");
            usageForeverButton.classList.add("selected");
          }
        }
      });
    });
  });
};
// Render HTML Functions

const renderOverallPaymentSumHTML = (data) => {
  const sum = data.reduce((acc, cur) => (acc += cur.sum_item_price), 0);
  const sumContainer = document.querySelector(".cartPage-summary-payment-sum");

  sumContainer.innerHTML = sum;
};

const modifyOverallPaymentSumHTML = (action, amount) => {
  const sumContainer = document.querySelector(".cartPage-summary-payment-sum");

  switch (action) {
    case "increase":
      sumContainer.innerHTML = Number(sumContainer.innerHTML) + amount;
      break;
    case "decrease":
      sumContainer.innerHTML = Number(sumContainer.innerHTML) - amount;
      break;
    default:
      break;
  }
};
