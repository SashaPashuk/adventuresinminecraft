import API from "../js/services/api.js";
import { ContentLoadingEventObserever } from "./utils/observer.js";

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

document.addEventListener("DOMContentLoaded", async () => {
  const tokensData = localStorage.getItem("tokens");
  const usernameData = localStorage.getItem("username");

  if (tokensData) {
    navItemForUserDropdownLogic?.classList.remove("hidden");
  

    if (usernameElement) {
      usernameElement.innerHTML = usernameData.slice(0, 15) + "...";
      usernameElement.setAttribute("title", usernameData);
    }
  } else {
    navItemsForUserLogic?.forEach((item) => item.classList.remove("hidden"));
  }

  ContentLoadingEventObserever.broadcast(true);

  // Show amount of items in cart
  const lsShopOrderItems = localStorage.getItem("orderItems");
  const serverShopOrderItemsResponse = await API.getShopOrderItems();

  const shopOrderItemsResponse = !tokensData
    ? (lsShopOrderItems && JSON.parse(lsShopOrderItems)) || []
    : serverShopOrderItemsResponse;

  const cartContainerCountElement = document.querySelector(
    ".cart-container-count"
  );

  if (cartContainerCountElement) {
    cartContainerCountElement.innerHTML = shopOrderItemsResponse.length || 0;
  }
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
