const cartPaymentButtonElement = document.querySelector("#cart-payment-button");

cartPaymentButtonElement?.addEventListener("click", (e) => {
  e.preventDefault();
  window.location.href = "/pages/success-payment.html";
});
