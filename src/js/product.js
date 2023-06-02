import API from "./services/api.js";
import {
  renderShopItemInfoHTML,
  addToastNotification,
} from "./utils/helpers.js";
import {
  DEFAULT_LANGUAGE,
  SHOP_ITEM_TIME_USAGE,
} from "./contants/constants.js";
import {
  ITEM_ADDED_TO_CART_ERROR,
  ITEM_ADDED_TO_CART_SUCCESS,
} from "./contants/errors.js";

// Event Listeners

document.addEventListener("DOMContentLoaded", async () => {
  const itemDataLocalStorage = localStorage.getItem("item_data");
  const shopItemsResponse = await API.getShopItems(DEFAULT_LANGUAGE, {
    type: JSON.parse(itemDataLocalStorage)?.type || "",
  });

  const item = shopItemsResponse?.results?.find(
    (el) => el.id === JSON.parse(itemDataLocalStorage)?.id
  );

  renderShopItemInfoHTML(item);

  addCarouselEventListeners();
  addBuyShopItemEventListener(item);
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

    const result = await API.addShopItemToCart({
      amount: itemAmountElement.innerHTML,
      item_id: item.id,
      time_to_use: SHOP_ITEM_TIME_USAGE["30_DAYS"],
    });

    const amountErrors = (result?.amount && result?.amount[0]) || "";

    // errors
    result?.detail === "Authentication credentials were not provided." &&
      addToastNotification({ message: "You should login first." });

    Boolean(amountErrors) &&
      addToastNotification({ message: result?.amount[0] });

    result === ITEM_ADDED_TO_CART_ERROR &&
      addToastNotification({ message: ITEM_ADDED_TO_CART_ERROR });

    // success
    if (
      result === ITEM_ADDED_TO_CART_SUCCESS &&
      result?.detail !== "Authentication credentials were not provided."
    ) {
      addToastNotification({ message: ITEM_ADDED_TO_CART_SUCCESS });
      cartContainerCountElement.innerHTML =
        Number(cartContainerCountElement.innerHTML) + 1;
    }
  });
};

let currentSlide = 0;
const addCarouselEventListeners = () => {
  const prevButton = document.querySelector(".slider__button-prev");
  const nextButton = document.querySelector(".slider__button-next");
  const mainImage = document.querySelector(".slider__main-img");
  const images = document.querySelectorAll(".slider__row img");

  // Функція для оновлення великої картинки
  function updateMainImage() {
    mainImage.src = images[currentSlide].src;
  }

  // Додати обробник події на кнопку "Наступний"
  nextButton.addEventListener("click", () => {
    currentSlide++;
    if (currentSlide >= images.length) {
      currentSlide = 0;
    }
    updateMainImage();
  });

  // Додати обробник події на кнопку "Попередній"
  prevButton.addEventListener("click", () => {
    currentSlide--;
    if (currentSlide < 0) {
      currentSlide = images.length - 1;
    }
    updateMainImage();
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
