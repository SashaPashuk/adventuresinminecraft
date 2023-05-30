const arrowOrderButton = document.querySelector("#arrow-order-button");
const ordersHistoryElements = document.querySelectorAll(
  ".orderHistory-orders-order-container"
);

arrowOrderButton?.addEventListener("click", () => {
  ordersHistoryElements?.forEach((orderHistory) => {
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
