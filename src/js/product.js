// Отримати елементи слайдера
const slider = document.querySelector(".slider__row");
const prevButton = document.querySelector(".slider__button-prev");
const nextButton = document.querySelector(".slider__button-next");
const mainImage = document.querySelector(".slider__main-img");
const images = document.querySelectorAll(".slider__row img");

let currentSlide = 0;

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

// --------------------------------------------------------------------------------------
const numberTitle = document.querySelector(".quantity-control__number-title");
const reduceBtn = document.querySelector(
  ".quantity-control__number-btn-reduce"
);
const increaseBtn = document.querySelector(
  ".quantity-control__number-btn-increase"
);

// Отримати початкову кількість
let quantity = parseInt(numberTitle.textContent);

// Додати обробник події на кнопку "Зменшити"
reduceBtn.addEventListener("click", () => {
  if (quantity > 1) {
    quantity--;
    updateQuantity();
    updatePrice();
  }
});

// Додати обробник події на кнопку "Збільшити"
increaseBtn.addEventListener("click", () => {
  quantity++;
  updateQuantity();
  updatePrice();
});

// Функція для оновлення кількості
function updateQuantity() {
  numberTitle.textContent = quantity;
}

const priceElement = document.getElementById("product_price");

// Отримати початкову ціну
let initialPrice = parseFloat(priceElement.textContent.slice(1));

// Функція для оновлення ціни
function updatePrice() {
  const totalPrice = (initialPrice * quantity).toFixed(2);
  priceElement.textContent = `€${totalPrice}`;
}
