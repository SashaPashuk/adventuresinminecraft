import API from "../js/services/api.js";

const menuItems = document.querySelectorAll(".nav-link");
const navItemsForUserLogic = document.querySelectorAll(".nav-item-user-logic");
const navItemForUserDropdownLogic = document.querySelector(
  ".nav-item-user-dd-logic"
);
const usernameElement = document.querySelector("#username");

menuItems.forEach(function (item) {
  if (item.getAttribute("href") === window.location.pathname) {
    item.classList.add("active");
  }
});

// user logic

document.addEventListener("DOMContentLoaded", () => {
  const tokensData = localStorage.getItem("tokens");
  const usernameData = localStorage.getItem("username");

  if (tokensData) {
    navItemsForUserLogic?.forEach((item) => item.classList.add("hidden"));

    if (usernameElement) {
      usernameElement.innerHTML = usernameData.slice(0, 15) + "...";
      usernameElement.setAttribute("title", usernameData);
    }
  } else {
    navItemForUserDropdownLogic?.classList.add("hidden");
  }

  // show amount of items in cart
  const orderItemsResult = API.getShopOrderItems();

  orderItemsResult.then((data) => {
    const cartContainerCountElement = document.querySelector(
      ".cart-container-count"
    );

    if (cartContainerCountElement) {
      cartContainerCountElement.innerHTML = data.length || 0;
    }
  });
});

// dropdown logic

const dropdownElement = document.querySelector(".dropdown");
const dropdownSelectionElement = document.querySelector(".dropdown-selection");
const dropdownItems = document.querySelectorAll(".dropdown-container li a");

dropdownItems?.forEach(function (item) {
  if (item.getAttribute("href") === window.location.pathname) {
    item.classList.add("active");
  }
});

dropdownSelectionElement?.addEventListener("click", () => {
  dropdownElement.classList.toggle("dropdown-open");
});

// modal logic

const closeModalElement = document.querySelector(
  ".exitConfirmation-modal-container-close-icon"
);
closeModalElement?.addEventListener("click", () => {
  window.history.back();
});

// close success payment modal logic

const closeSuccessPaymentModalElement = document.querySelector(
  ".successPayment-modal-container-close-icon"
);

closeSuccessPaymentModalElement?.addEventListener("click", () => {
  window.history.back();
});

// logout logic
const logoutButtonElement = document.querySelector("#logout-button");

logoutButtonElement?.addEventListener("click", () => {
  localStorage.removeItem("tokens");
});

// load items logic
