const switchButtonDD = document.querySelectorAll(".switch__button");
const donationDescriptionSection = document.querySelectorAll(
  ".donation-description__section"
);

let lastSwitchButtonId = null;

switchButtonDD.forEach((button) => {
  button.addEventListener("click", () => {
    const blockId = button.getAttribute("data-name");
    const targetBlock = document.getElementById(blockId);

    if (targetBlock) {
      donationDescriptionSection.forEach((block) => {
        block.classList.add("d-none");
      });

      targetBlock.classList.remove("d-none");

      switchButtonDD.forEach((btn) => {
        btn.classList.remove("switch__button--active");
      });
      button.classList.add("switch__button--active");

      lastSwitchButtonId = blockId;
    }
  });
});

const donationDescriptionNavBtn = document.querySelectorAll(
  ".donation-description__nav-btn"
);
const donationDescriptionBlock = document.querySelectorAll(
  ".donation-description__block"
);

donationDescriptionNavBtn.forEach((button) => {
  button.addEventListener("click", () => {
    const blockId = button.getAttribute("data-name");
    const targetBlock = document.getElementById(blockId);

    if (targetBlock) {
      donationDescriptionBlock.forEach((block) => {
        block.classList.add("d-none");
      });

      targetBlock.classList.remove("d-none");

      donationDescriptionNavBtn.forEach((btn) => {
        btn.classList.remove("donation-description__nav-btn--active");
      });
      button.classList.add("donation-description__nav-btn--active");

      lastSwitchButtonId = null; 
    }
  });
});

window.addEventListener("DOMContentLoaded", () => {
  if (lastSwitchButtonId) {
    const lastSwitchButton = document.querySelector(
      `.switch__button[data-name="${lastSwitchButtonId}"]`
    );
    if (lastSwitchButton) {
      lastSwitchButton.classList.add("switch__button--active");
    }
  }
});

const faqButtons = document.querySelectorAll(".faq__button");
const faqBlocks = document.querySelectorAll(".faq__block");

faqButtons.forEach((button) => {
  button.addEventListener("click", () => {
    const blockId = button.getAttribute("data-name");
    const targetBlock = document.getElementById(blockId);

    if (targetBlock) {
      // hidden all blocks
      faqBlocks.forEach((block) => {
        block.classList.add("d-none");
      });

      // visible elect block
      targetBlock.classList.remove("d-none");

      // change the active button
      faqButtons.forEach((btn) => {
        btn.classList.remove("faq__button--active");
      });
      button.classList.add("faq__button--active");
    }
  });
});


const menuItems = document.querySelectorAll(".nav-link");

menuItems.forEach(function (item) {
  if (item.getAttribute("href") === window.location.pathname) {
    item.classList.add("active");
  }
});


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

const rulesButtons = document.querySelectorAll(".rules__nav-btn");
const rulesBlocks = document.querySelectorAll(".rules__block");

rulesButtons.forEach((button) => {
  button.addEventListener("click", () => {
    const blockId = button.getAttribute("data-name");
    const targetBlock = document.getElementById(blockId);

    if (targetBlock) {
      // hidden all blocks
      rulesBlocks.forEach((block) => {
        block.classList.add("d-none");
      });

      // visible elect block
      targetBlock.classList.remove("d-none");

      // change the active button
      rulesButtons.forEach((btn) => {
        btn.classList.remove("rules__nav-btn--active");
      });
      button.classList.add("rules__nav-btn--active");
    }
  });
});
