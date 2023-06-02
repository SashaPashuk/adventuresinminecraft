import { ITEM_ADDED_TO_CART_ERROR } from "./contants/errors.js";
import {
  ITEM_ALREADY_ADDED_TO_CART,
  ITEM_ALREADY_ADDED_TO_CART_WITH_NAME,
} from "./contants/notifications.js";
import API from "./services/api.js";
import {
  addToastNotification,
  renderOrderHistoryItemsHTML,
} from "./utils/helpers.js";

// Event Listeners

document.addEventListener("DOMContentLoaded", async () => {
  const shopOrdersResponse = await API.getShopOrdersRequest();

  renderOrderHistoryItemsHTML(shopOrdersResponse);

  addShopOrderItemsDropdownEventListener();
  addRepeatOrderEventListener(shopOrdersResponse);
});

const addShopOrderItemsDropdownEventListener = () => {
  const ordersHistoryElements = document.querySelectorAll(
    ".orderHistory-orders-order-container"
  );

  ordersHistoryElements?.forEach((orderHistory) => {
    const arrowOrderButton = orderHistory.querySelector("#arrow-order-button");

    arrowOrderButton?.addEventListener("click", () => {
      const orderHistoryDetails = orderHistory?.querySelector(
        ".orderHistory-orders-order-details"
      );
      const orderHistoryHR = orderHistory?.querySelector("hr");
      const orderHistoryArrowElement = orderHistory?.querySelector(
        ".orderHistory-orders-order-actions-arrow"
      );

      orderHistoryHR.classList.toggle("hidden");
      orderHistoryDetails.classList.toggle("hidden");
      orderHistoryArrowElement.classList.toggle(
        "orderHistory-orders-order-actions-arrow-open"
      );
    });
  });
};

const addRepeatOrderEventListener = (shopOrdersResponse) => {
  const ordersHistoryElements = document.querySelectorAll(
    ".orderHistory-orders-order-container"
  );

  ordersHistoryElements?.forEach((item, index) => {
    const orderItems = shopOrdersResponse?.results[index].order_item;
    const button = item.querySelector(".button-primary");

    button.addEventListener("click", () => {
      orderItems.forEach(async (orderItem) => {
        const result = await API.addShopItemToCart({
          amount: orderItem.amount,
          time_to_use: orderItem.time_to_use,
          item_id: orderItem.product_id,
        });
        console.log(result);
        result === ITEM_ADDED_TO_CART_ERROR &&
          addToastNotification({
            message: ITEM_ALREADY_ADDED_TO_CART_WITH_NAME(
              orderItem?.name || "Название товара"
            ),
          });
      });
    });
  });
};
