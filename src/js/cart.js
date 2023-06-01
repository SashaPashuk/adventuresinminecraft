import API from "../js/services/api.js";
import { ITEM_DELETED_FROM_CART_SUCCESS } from "./contants/errors.js";

document.addEventListener("DOMContentLoaded", () => {
  const result = API.getShopOrderItems();

  result.then((data) => {
    renderCartItems(data);
    addHandlersToProductDeleteButtons();
    addHandlersToProductIncreaseDecreasButtons();
    addOverallSum(data);
  });
});

// render HTML
const cartListContainerElements = document.querySelector(".cartPage-list");

const renderCartItems = (items) => {
  let html = "";

  items?.forEach(({ product_id, amount, sum_item_price }) => {
    const item = `
        <li class="cartPage-list-item" data-cart-id=${product_id}>
          <img src="../assets/images/product-image/img_product2.png" alt="" />
          <h3>Название товара</h3>
          <div class="cartPage-list-item-amount">
            <span>Количество:</span>
            <div class="cartPage-list-item-amount-actions">
              <img src="../assets/images/icons/arrow_left.svg" alt="" class='cart-item-decrease-button' />
              <span class="cart-item-amount">${amount}</span>
              <img src="../assets/images/icons/arrow_right.svg" alt="" class='cart-item-increase-button' />
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
            <div>
              <span>€</span>
              <span class="cartPage-list-item-sum">${sum_item_price}</span>
            </div>
          </div>
          <div class="cart-container">
            <img
              class="cart-container-icon cart-item-delete-button"
              src="../assets/images/icons/delete-icon.svg"
              data-id=${product_id}
              alt=""
            />
          </div>
      </li>
    `;

    html += item;
  });

  cartListContainerElements.innerHTML = html;
};

// add event listeners

const cartPaymentButtonElement = document.querySelector("#cart-payment-button");

cartPaymentButtonElement?.addEventListener("click", (e) => {
  e.preventDefault();
  const sumContainer = document.querySelector(".cartPage-summary-payment-sum");
  const paymentInputElement = document.querySelector(
    ".cartPage-summary-payment input"
  );
  // console.log("paymentInputElement", paymentInputElement.value);
  // console.log("sumContainer", sumContainer.innerHTML);
  // window.location.href = "/pages/success-payment.html";
});

const addHandlersToProductIncreaseDecreasButtons = () => {
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
      console.log("response", response);
      if (response !== "Amount cannot be changed.") {
        modifyOverallSum(
          "increase",
          Number(item.querySelector(".cartPage-list-item-sum")?.innerHTML || 0)
        );
      }
    });

    decrease.addEventListener("click", async () => {
      const response = await API.updateShopItemInCart(
        item.getAttribute("data-cart-id"),
        { amount: Number(amount.innerHTML) + 1 }
      );
      console.log("response", response);
      if (response !== "Amount cannot be changed.") {
        modifyOverallSum(
          "decrease",
          Number(item.querySelector(".cartPage-list-item-sum")?.innerHTML || 0)
        );
      }
    });
  });
};

const addHandlersToProductDeleteButtons = () => {
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
          modifyOverallSum(
            "decrease",
            Number(
              cartElement.querySelector(".cartPage-list-item-sum")?.innerHTML ||
                0
            )
          );
          cartElement?.remove();
          cartContainerCountElement.innerHTML =
            Number(cartContainerCountElement.innerHTML) - 1;
        }
      });
    });
  });
};

const addOverallSum = (data) => {
  const sum = data.reduce((acc, cur) => (acc += cur.sum_item_price), 0);
  const sumContainer = document.querySelector(".cartPage-summary-payment-sum");

  sumContainer.innerHTML = sum;
};

const modifyOverallSum = (action, amount) => {
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
