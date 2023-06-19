const replacePath = () => {
  const pathname = window.location.pathname;
  const dots = pathname?.includes("1122/") ? "../../../" : "../../";

  // header
  const cartIcon = document.querySelector(".cart-container-icon");
  const logoIcon = document.querySelector(".logo__icon");

  cartIcon.setAttribute("src", `${dots}assets/images/icons/cart-icon.svg`);
  logoIcon.setAttribute("src", `${dots}assets/images/logo.svg`);

  // footer
  const footerlogoIcon = document.querySelector(".footer__icon");
  footerlogoIcon.setAttribute("src", `${dots}assets/images/logo.svg`);
};

document.addEventListener("DOMContentLoaded", () => {
  replacePath();
});
