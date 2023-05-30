// render HTML
const ordersHistoryContainerElements = document.querySelector(
  ".orderHistory-orders"
);

const renderOrderHistoryItems = (items) => {
  let html = "";

  items.forEach(({}) => {
    const item = `
        <li class="orderHistory-orders-order-container">
        <div class="orderHistory-orders-order">
          <div><span>Заказ 12345678</span><span>Выполнен</span></div>
          <div><span>Количество:</span><span>6</span></div>
          <div><span>Количество:</span><span>€15</span></div>
          <div class="orderHistory-orders-order-actions">
            <button class="button-primary">Повторить заказ</button>
            <span
              class="orderHistory-orders-order-actions-arrow"
              id="arrow-order-button"
            >
              <svg
                width="12"
                height="7"
                viewBox="0 0 12 7"
                fill="currentColor"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M5.9998 6.975C5.86647 6.975 5.73714 6.95 5.6118 6.9C5.48647 6.85 5.38247 6.78334 5.2998 6.7L0.699804 2.1C0.516471 1.91667 0.424805 1.68334 0.424805 1.4C0.424805 1.11667 0.516471 0.883336 0.699804 0.700003C0.883138 0.516669 1.11647 0.425003 1.3998 0.425003C1.68314 0.425003 1.91647 0.516669 2.0998 0.700003L5.9998 4.6L9.8998 0.700003C10.0831 0.516669 10.3165 0.425003 10.5998 0.425003C10.8831 0.425003 11.1165 0.516669 11.2998 0.700003C11.4831 0.883336 11.5748 1.11667 11.5748 1.4C11.5748 1.68334 11.4831 1.91667 11.2998 2.1L6.6998 6.7C6.5998 6.8 6.49147 6.871 6.3748 6.913C6.25814 6.955 6.13314 6.97567 5.9998 6.975Z"
                  fill="currentColor"
                />
              </svg>
            </span>
          </div>
        </div>
        <hr class="hidden" />
        <div class="orderHistory-orders-order-details hidden">
          <h3 class="orderHistory-orders-order-details-title">Товары</h3>
          <ul class="orderHistory-orders-order-details-list">
            <li class="orderHistory-orders-order-details-list-item">
              <div>
                <img
                  src="../assets/images/product-image/img_product2.png"
                  alt=""
                />
                <span>Название товара</span>
              </div>
              <div>
                <span>Срок действия покупки:</span>
                <span>30 дней</span>
              </div>
              <div>
                <span>Количество:</span>
                <span>2</span>
              </div>
              <div>
                <span>Цена</span>
                <span>€15</span>
              </div>
              <div>
                <span>Общая цена</span>
                <span>€30</span>
              </div>
            </li>
          </ul>
        </div>
      </li>
    `;

    html += item;
  });

  ordersHistoryContainerElements.innerHTML = html;
};

renderOrderHistoryItems([1, 2, 3]);

// add event listeners

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
