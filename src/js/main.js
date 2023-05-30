const menuItems = document.querySelectorAll(".nav-link");

menuItems.forEach(function (item) {
  if (item.getAttribute("href") === window.location.pathname) {
    item.classList.add("active");
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
  console.log("ss");
  window.history.back();
});
