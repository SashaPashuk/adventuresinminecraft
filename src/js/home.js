import API from "../js/services/api.js";
import { addToastNotification } from "./utils/helpers.js";
import { ITEM_ADDED_TO_CART_ERROR } from "./contants/errors.js";
import {
  ITEM_ALREADY_ADDED_TO_CART,
  ITEM_SUCCESSFULLY_ADDED_TO_CART,
} from "./contants/notifications.js";
import {
  DEFAULT_LANGUAGE,
  SHOP_ITEM_TIME_USAGE,
} from "./contants/constants.js";

const ITEM_TYPES = { Survival: "Survival", Anarchy: "Anarchy" };

document.addEventListener("DOMContentLoaded", () => {
  const result = API.getShopItems(DEFAULT_LANGUAGE, {
    type: ITEM_TYPES.Survival,
  });

  result.then((data) => {
    renderProductListItems(data.results);
    addHandlersToProductCartButtons();
    addHandlersToProductCards(data.results);
  });
});

// item type switching logic

const itemTypeSwitchElement = document.querySelector(".products-svitch");

itemTypeSwitchElement?.addEventListener("change", (e) => {
  const selectedItemType = e.target.value;

  const result = API.getShopItems(DEFAULT_LANGUAGE, { type: selectedItemType });

  result.then((data) => {
    renderProductListItems(data.results);
  });
});

// render HTML
const productListContainerElements = document.querySelector(".products__list");

const imageURLs = [
  "assets/images/product-image/img_product1.png",
  "assets/images/product-image/img_product2.png",
  "assets/images/product-image/img_product3.png",
  "assets/images/product-image/img-product4.png",
];

const getRandomImage = () => {
  const randomNum = Math.floor(Math.random() * 3) + 1;

  return imageURLs[randomNum];
};

const renderProductListItems = (items) => {
  let html = "";

  items.forEach(({ price, market_name, id }) => {
    const item = `
          <div class="products-card">
            <img
                class="products-card__img"
                src=${getRandomImage()}
                alt=""
            />
            <p class="products-card__title">
              ${market_name || "Название товара"}
            </p>
            <div class="products-card__block">
                <p class="products-card__price">
                  €${Number(price).toFixed(2)}
                </p>
                <button class="products-card__buy" data-id=${id}></button>
            </div>
          </div>
      `;

    html += item;
  });

  productListContainerElements.innerHTML = html;
};

const addHandlersToProductCards = (cards) => {
  const productsCartElements = document.querySelectorAll(".products-card");
  productsCartElements?.forEach((item, index) => {
    item.addEventListener("click", () => {
      localStorage.setItem(
        "item_data",
        JSON.stringify({
          id: cards[index].id,
          type: cards[index].type,
        })
      );
      window.open("/pages/product", "_self");
    });
  });
};

const addHandlersToProductCartButtons = () => {
  const productsCartButtonElements = document.querySelectorAll(
    ".products-card__buy"
  );
  const cartContainerCountElement = document.querySelector(
    ".cart-container-count"
  );

  productsCartButtonElements.forEach((button) => {
    button.addEventListener("click", (e) => {
      e.stopPropagation();
      e.preventDefault();

      const response = API.addShopItemToCart({
        amount: 1,
        item_id: button.getAttribute("data-id"),
        time_to_use: SHOP_ITEM_TIME_USAGE["30_DAYS"],
      });

      response.then((data) => {
        data?.detail === "Authentication credentials were not provided." &&
          addToastNotification({ message: "You should login first." });
        data === ITEM_ADDED_TO_CART_ERROR &&
          addToastNotification({ message: ITEM_ALREADY_ADDED_TO_CART });

        if (
          data !== ITEM_ADDED_TO_CART_ERROR &&
          data?.detail !== "Authentication credentials were not provided."
        ) {
          addToastNotification({ message: ITEM_SUCCESSFULLY_ADDED_TO_CART });

          cartContainerCountElement.innerHTML =
            Number(cartContainerCountElement.innerHTML) + 1;
        }
      });
    });
  });
};
