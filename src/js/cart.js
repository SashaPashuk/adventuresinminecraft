import API from "../js/services/api.js";
import {
  addToastNotification,
  renderCartItemsHTML,
  renderServerDropdownItemsHTML,
} from "./utils/helpers.js";
import { getLocalizedError } from "./services/errorsLanguageLocalization.js";
import {
  ContentLoadingEventObserever,
  ShopOrderItemsEventObserever,
} from "./utils/observer.js";
import {
  FIELD_NOT_EMPTY_ERROR,
  ITEM_AMOUNT_CAN_NOT_BE_CHANGED_ERROR,
  ITEM_AMOUNT_CHANGED_SUCCESS,
  ITEM_DELETED_FROM_CART_SUCCESS,
  ITEM_DURATION_SERVER_ERROR,
  ITEM_DURATION_SUCCESS,
  NO_ACTIVE_ORDER_ERROR,
  errorsLanguageLocalizationsEnum,
} from "./contants/errors.js";
import { SHOP_ITEM_TIME_USAGE } from "./contants/constants.js";

// Constants
const lsTokens = localStorage.getItem("tokens");
let lsShopOrderItems = localStorage.getItem("orderItems");

// Observer

ShopOrderItemsEventObserever.subscribe((shopOrderItemsResponse) => {
  renderCartItemsHTML(shopOrderItemsResponse);
  renderOverallPaymentSumHTML(shopOrderItemsResponse);

  addProductDeleteButtonEventListener(shopOrderItemsResponse);
  addProductIncreaseDecreasButtonsEventListener(shopOrderItemsResponse);
  addOrderItemsUsageButtonsEventListener(shopOrderItemsResponse);

  ContentLoadingEventObserever.broadcast(true);
});

// Event Listeners

document.addEventListener("DOMContentLoaded", async () => {
  const serverShopOrderItemsResponse = await API.getShopOrderItems();
  const shopServersResponse = await API.getShopServersRequest();

  const shopOrderItemsResponse =
    (lsShopOrderItems && JSON.parse(lsShopOrderItems)) ||
    serverShopOrderItemsResponse;

  renderCartItemsHTML(shopOrderItemsResponse);
  renderOverallPaymentSumHTML(shopOrderItemsResponse);
  renderServerDropdownItemsHTML(shopServersResponse);

  addProductDeleteButtonEventListener(shopOrderItemsResponse);
  addProductIncreaseDecreasButtonsEventListener(shopOrderItemsResponse);
  addOrderItemsUsageButtonsEventListener(shopOrderItemsResponse);
  addCartPaymentButtonEventListener();
  addServersDropdownEventListener();

  ContentLoadingEventObserever.broadcast(true);
});

const addCartPaymentButtonEventListener = () => {
  const cartPaymentButtonElement = document.querySelector(
    "#cart-payment-button"
  );
  const checkPolicyWrapper = document.getElementById("check_policy_wrapper");
  const checkPolicy = document.querySelector("#check_policy");

  cartPaymentButtonElement?.addEventListener("click", async (e) => {
    e.preventDefault();

    // Якщо політика не підтверджена, просто поверніться
    if (!checkPolicy.checked) {
      checkPolicyWrapper.classList.add("cartPage-policy--error");
      return;
    }

    // Видаліть помилку у випадку успішного натискання
    checkPolicyWrapper.classList.remove("cartPage-policy--error");

    if (!lsTokens) {
      addToastNotification({
        message: getLocalizedError(
          errorsLanguageLocalizationsEnum.USER_SHOULD_LOGIN_FIRST
        ),
      });
      return;
    }

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

    // errors
    const nicknameErrors =
      (createdPaymentResponse?.user_nickname &&
        createdPaymentResponse?.user_nickname[0]) ||
      "";

    if ([FIELD_NOT_EMPTY_ERROR].includes(nicknameErrors)) {
      const labelForNicknameError = paymentSummaryElement?.querySelector(
        'label[for="nickname"]'
      );
      labelForNicknameError.innerHTML = getLocalizedError(
        errorsLanguageLocalizationsEnum.USER_VALID_NICKNAME_ERROR
      );
    }

    if (createdPaymentResponse === NO_ACTIVE_ORDER_ERROR) {
      addToastNotification({
        message: getLocalizedError(
          errorsLanguageLocalizationsEnum.NO_ACTIVE_ORDER_ERROR
        ),
      });
    }

    // success
    if (createdPaymentResponse?.redirect_url) {
      window.open(createdPaymentResponse.redirect_url, "_blank");
      window.open("/home", "_self");
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

const addProductIncreaseDecreasButtonsEventListener = (items) => {
  const productsCartElements = document.querySelectorAll(".cartPage-list-item");

  productsCartElements?.forEach((item, index) => {
    const increase = item.querySelector(".cart-item-increase-button");
    const decrease = item.querySelector(".cart-item-decrease-button");
    const amount = item.querySelector(".cart-item-amount");

    increase.addEventListener("click", async () => {
      // Logic for unauthorized user
      if (!lsTokens) {
        if (items[index].is_one_time) {
          addToastNotification({
            message: getLocalizedError(
              errorsLanguageLocalizationsEnum.ITEM_AMOUNT_CAN_NOT_BE_CHANGED_ERROR
            ),
          });
          return;
        }

        modifyOverallPaymentSumHTML("increase", items[index].price || 0);
        amount.textContent = Number(amount.innerHTML) + 1;

        const updatedlsShopOrderItems = items.map((orderItem) => ({
          ...orderItem,
          amount:
            orderItem.id === items[index].id
              ? orderItem.amount + 1
              : orderItem.amount,
          sum_item_price:
            orderItem.id === items[index].id
              ? orderItem.time_to_use === SHOP_ITEM_TIME_USAGE.Forever
                ? (orderItem.amount + 1) * orderItem.forever_price
                : (orderItem.amount + 1) * orderItem.price
              : orderItem.sum_item_price,
        }));

        lsShopOrderItems = updatedlsShopOrderItems;
        localStorage.setItem(
          "orderItems",
          JSON.stringify(updatedlsShopOrderItems)
        );

        ShopOrderItemsEventObserever.broadcast(updatedlsShopOrderItems);

        return;
      }

      // Logic for authorized user
      const response = await API.updateShopItemInCart(
        item.getAttribute("data-cart-id"),
        { amount: Number(amount.innerHTML) + 1 }
      );

      // errors
      if (response === ITEM_AMOUNT_CAN_NOT_BE_CHANGED_ERROR) {
        addToastNotification({
          message: getLocalizedError(
            errorsLanguageLocalizationsEnum.ITEM_AMOUNT_CAN_NOT_BE_CHANGED_ERROR
          ),
        });
      }

      // success
      if (response === ITEM_AMOUNT_CHANGED_SUCCESS) {
        modifyOverallPaymentSumHTML("increase", items[index].price || 0);
        amount.textContent = Number(amount.innerHTML) + 1;

        ShopOrderItemsEventObserever.broadcast(
          items.map((el) => ({
            ...el,
            amount: el.id === items[index].id ? el.amount + 1 : el.amount,
            sum_item_price:
              el.id === items[index].id
                ? el.time_to_use === SHOP_ITEM_TIME_USAGE.Forever
                  ? (el.amount + 1) * el.forever_price
                  : (el.amount + 1) * el.price
                : el.sum_item_price,
          }))
        );
      }
    });

    decrease.addEventListener("click", async () => {
      // Logic for unauthorized user
      if (!lsTokens) {
        if (items[index].is_one_time) {
          addToastNotification({
            message: getLocalizedError(
              errorsLanguageLocalizationsEnum.ITEM_AMOUNT_CAN_NOT_BE_CHANGED_ERROR
            ),
          });
          return;
        }
        if (Number(amount.innerHTML) === 1) {
          addToastNotification({
            message: getLocalizedError(
              errorsLanguageLocalizationsEnum.ITEM_AMOUNT_CAN_NOT_BE_LESS_THEN_ONE_ERROR
            ),
          });
          return;
        }

        modifyOverallPaymentSumHTML("decrease", items[index].price || 0);
        amount.textContent = Number(amount.innerHTML) - 1;

        const updatedlsShopOrderItems = items.map((orderItem) => ({
          ...orderItem,
          amount:
            orderItem.id === items[index].id
              ? orderItem.amount - 1
              : orderItem.amount,
          sum_item_price:
            orderItem.id === items[index].id
              ? (orderItem.amount - 1) * orderItem.price
              : orderItem.sum_item_price,
        }));

        lsShopOrderItems = updatedlsShopOrderItems;
        localStorage.setItem(
          "orderItems",
          JSON.stringify(updatedlsShopOrderItems)
        );
        ShopOrderItemsEventObserever.broadcast(updatedlsShopOrderItems);

        return;
      }

      // Logic for authorized user
      const response = await API.updateShopItemInCart(
        item.getAttribute("data-cart-id"),
        { amount: Number(amount.innerHTML) - 1 }
      );

      // errors
      if (response === ITEM_AMOUNT_CAN_NOT_BE_CHANGED_ERROR) {
        addToastNotification({
          message: getLocalizedError(
            errorsLanguageLocalizationsEnum.ITEM_AMOUNT_CAN_NOT_BE_CHANGED_ERROR
          ),
        });
      }

      // success
      if (response === ITEM_AMOUNT_CHANGED_SUCCESS) {
        modifyOverallPaymentSumHTML("decrease", items[index].price || 0);
        amount.textContent = Number(amount.innerHTML) - 1;

        ShopOrderItemsEventObserever.broadcast(
          items.map((el) => ({
            ...el,
            amount: el.id === items[index].id ? el.amount - 1 : el.amount,
            sum_item_price:
              el.id === items[index].id
                ? el.time_to_use === SHOP_ITEM_TIME_USAGE.Forever
                  ? (el.amount - 1) * el.forever_price
                  : (el.amount - 1) * el.price
                : el.sum_item_price,
          }))
        );
      }
    });
  });
};

const addProductDeleteButtonEventListener = (items) => {
  const productsCartButtonElements = document.querySelectorAll(
    ".cart-item-delete-button"
  );
  const cartContainerCountElement = document.querySelector(
    ".cart-container-count"
  );

  productsCartButtonElements.forEach((button, index) => {
    button.addEventListener("click", async (e) => {
      e.stopPropagation();
      e.preventDefault();

      const cartElement = document.querySelector(
        `li[data-cart-id="${button.getAttribute("data-id")}"]`
      );

      // Logic for unauthorized user
      if (!lsTokens) {
        const updatedlsShopOrderItems = items.filter(
          (order) => order.id !== items[index].id
        );

        lsShopOrderItems = updatedlsShopOrderItems;
        localStorage.setItem(
          "orderItems",
          JSON.stringify(updatedlsShopOrderItems)
        );

        ShopOrderItemsEventObserever.broadcast(updatedlsShopOrderItems);

        addToastNotification({
          message: getLocalizedError(
            errorsLanguageLocalizationsEnum.ITEM_DELETED_FROM_CART_SUCCESS
          ),
        });

        cartContainerCountElement.innerHTML =
          Number(cartContainerCountElement.innerHTML) - 1;

        return;
      }

      // Logic for authorized user
      const response = await API.deleteShopItemFromCart(
        items[index].product_id
      );

      if (response === ITEM_DELETED_FROM_CART_SUCCESS) {
        addToastNotification({
          message: getLocalizedError(
            errorsLanguageLocalizationsEnum.ITEM_DELETED_FROM_CART_SUCCESS
          ),
        });

        ShopOrderItemsEventObserever.broadcast(
          items.filter((el) => el.id !== items[index].id)
        );

        cartContainerCountElement.innerHTML =
          Number(cartContainerCountElement.innerHTML) - 1;
      }
    });
  });
};

const addOrderItemsUsageButtonsEventListener = (items) => {
  const productsCartElements = document.querySelectorAll(".cartPage-list-item");

  productsCartElements?.forEach((item, index) => {
    const buttons = item.querySelectorAll(
      ".cartPage-list-item-usage-actions button"
    );

    buttons?.forEach((button) => {
      button.addEventListener("click", async () => {
        if (button.getAttribute("data-type") === "30") {
          // Logic for unauthorized user
          if (!lsTokens) {
            if (!items[index].forever_price) {
              addToastNotification({
                message: getLocalizedError(
                  errorsLanguageLocalizationsEnum.ITEM_DURATION_ERROR
                ),
              });
              return;
            }

            const updatedlsShopOrderItems = items.map((orderItem) => ({
              ...orderItem,
              time_to_use:
                orderItem.id === items[index].id
                  ? SHOP_ITEM_TIME_USAGE["30_DAYS"]
                  : orderItem.time_to_use,
              sum_item_price:
                orderItem.id === items[index].id
                  ? +orderItem.amount * +orderItem.price
                  : orderItem.sum_item_price,
            }));

            lsShopOrderItems = updatedlsShopOrderItems;
            localStorage.setItem(
              "orderItems",
              JSON.stringify(updatedlsShopOrderItems)
            );

            ShopOrderItemsEventObserever.broadcast(updatedlsShopOrderItems);

            return;
          }

          // Logic for authorized user
          const response = await API.updateShopItemDurationInCart({
            item_id: item.getAttribute("data-cart-id"),
            time_to_use: SHOP_ITEM_TIME_USAGE["30_DAYS"],
          });

          const timeToUserError =
            (response?.time_to_use && response?.time_to_use[0]) || "";

          // errors
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

          // success
          if (response === ITEM_DURATION_SUCCESS) {
            addToastNotification({
              message: getLocalizedError(
                errorsLanguageLocalizationsEnum.ITEM_DURATION_SUCCESS
              ),
            });

            ShopOrderItemsEventObserever.broadcast(
              items.map((el) => ({
                ...el,
                time_to_use:
                  el.id === items[index].id
                    ? SHOP_ITEM_TIME_USAGE["30_DAYS"]
                    : el.time_to_use,
                sum_item_price:
                  el.id === items[index].id
                    ? +el.amount * +el.price
                    : el.sum_item_price,
              }))
            );
          }
        } else {
          // Logic for unauthorized user
          if (!lsTokens) {
            if (!items[index].forever_price) {
              addToastNotification({
                message: getLocalizedError(
                  errorsLanguageLocalizationsEnum.ITEM_DURATION_ERROR
                ),
              });
              return;
            }

            const updatedlsShopOrderItems = items.map((orderItem) => ({
              ...orderItem,
              time_to_use:
                orderItem.id === items[index].id
                  ? SHOP_ITEM_TIME_USAGE.Forever
                  : orderItem.time_to_use,
              sum_item_price:
                orderItem.id === items[index].id
                  ? +orderItem.amount * +orderItem.forever_price
                  : orderItem.sum_item_price,
            }));

            lsShopOrderItems = updatedlsShopOrderItems;
            localStorage.setItem(
              "orderItems",
              JSON.stringify(updatedlsShopOrderItems)
            );

            ShopOrderItemsEventObserever.broadcast(updatedlsShopOrderItems);

            return;
          }

          // Logic for authorized user
          const response = await API.updateShopItemDurationInCart({
            item_id: item.getAttribute("data-cart-id"),
            time_to_use: SHOP_ITEM_TIME_USAGE.Forever,
          });

          const timeToUserError =
            (response?.time_to_use && response?.time_to_use[0]) || "";

          // errors
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

          // success
          if (response === ITEM_DURATION_SUCCESS) {
            addToastNotification({
              message: getLocalizedError(
                errorsLanguageLocalizationsEnum.ITEM_DURATION_SUCCESS
              ),
            });

            ShopOrderItemsEventObserever.broadcast(
              items.map((el) => ({
                ...el,
                time_to_use:
                  el.id === items[index].id
                    ? SHOP_ITEM_TIME_USAGE.Forever
                    : el.time_to_use,
                sum_item_price:
                  el.id === items[index].id
                    ? +el.amount * +el.forever_price
                    : el.sum_item_price,
              }))
            );
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
