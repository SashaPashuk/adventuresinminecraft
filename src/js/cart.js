// render HTML
const cartListContainerElements = document.querySelector(".cartPage-list");

const renderCartItems = (items) => {
  let html = "";

  items.forEach(({}) => {
    const item = `
        <li class="cartPage-list-item">
        <img src="../assets/images/product-image/img_product2.png" alt="" />
        <h3>Название товара</h3>
        <div class="cartPage-list-item-amount">
          <span>Количество:</span>
          <div class="cartPage-list-item-amount-actions">
            <img src="../assets/images/icons/arrow_left.svg" alt="" />
            <span>2</span>
            <img src="../assets/images/icons/arrow_right.svg" alt="" />
          </div>
        </div>
        <div class="cartPage-list-item-expiration">
          <span>Срок действия покупки:</span>
          <div class="cartPage-list-item-expiration-actions">
            <button>30 Дней</button>
            <button>Навсегда</button>
          </div>
        </div>
        <div>
          <span>Цена:</span>
          <span>€15</span>
        </div>
        <div class="cart-container">
          <img
            class="cart-container-icon"
            src="../assets/images/icons/delete-icon.svg"
            alt=""
          />
        </div>
      </li>
    `;

    html += item;
  });

  cartListContainerElements.innerHTML = html;
};

renderCartItems([1, 2, 3]);

// add event listeners

const cartPaymentButtonElement = document.querySelector("#cart-payment-button");

cartPaymentButtonElement?.addEventListener("click", (e) => {
  e.preventDefault();
  window.location.href = "/pages/success-payment.html";
});
