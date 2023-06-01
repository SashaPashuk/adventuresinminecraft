import API from"../js/services/api.js";import{ITEM_DELETED_FROM_CART_SUCCESS}from"./contants/errors.js";document.addEventListener("DOMContentLoaded",()=>{API.getShopOrderItems().then(t=>{renderCartItems(t),addHandlersToProductDeleteButtons(),addHandlersToProductIncreaseDecreasButtons()})});const cartListContainerElements=document.querySelector(".cartPage-list"),renderCartItems=t=>{let r="";t?.forEach(({product_id:t,amount:e,sum_item_price:a})=>{e=`
        <li class="cartPage-list-item" data-cart-id=${t}>
          <img src="../assets/images/product-image/img_product2.png" alt="" />
          <h3>Название товара</h3>
          <div class="cartPage-list-item-amount">
            <span>Количество:</span>
            <div class="cartPage-list-item-amount-actions">
              <img src="../assets/images/icons/arrow_left.svg" alt="" class='cart-item-decrease-button' />
              <span class="cart-item-amount">${e}</span>
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
            <span>€${a}</span>
          </div>
          <div class="cart-container">
            <img
              class="cart-container-icon cart-item-delete-button"
              src="../assets/images/icons/delete-icon.svg"
              data-id=${t}
              alt=""
            />
          </div>
      </li>
    `;r+=e}),cartListContainerElements.innerHTML=r},cartPaymentButtonElement=document.querySelector("#cart-payment-button"),addHandlersToProductIncreaseDecreasButtons=(cartPaymentButtonElement?.addEventListener("click",t=>{t.preventDefault(),window.location.href="/pages/success-payment.html"}),()=>{document.querySelectorAll(".cartPage-list-item")?.forEach(e=>{var t=e.querySelector(".cart-item-increase-button"),a=e.querySelector(".cart-item-decrease-button");const r=e.querySelector(".cart-item-amount");t.addEventListener("click",async()=>{var t=await API.updateShopItemInCart(e.getAttribute("data-cart-id"),{amount:Number(r.innerHTML)+1});console.log("response",t)}),a.addEventListener("click",async()=>{var t=await API.updateShopItemInCart(e.getAttribute("data-cart-id"),{amount:Number(r.innerHTML)+1});console.log("response",t)})})}),addHandlersToProductDeleteButtons=()=>{var t=document.querySelectorAll(".cart-item-delete-button");const r=document.querySelector(".cart-container-count");t.forEach(a=>{a.addEventListener("click",t=>{t.stopPropagation(),t.preventDefault();t=API.deleteShopItemFromCart(a.getAttribute("data-id"));const e=document.querySelector(`li[data-cart-id="${a.getAttribute("data-id")}"]`);t.then(t=>{t===ITEM_DELETED_FROM_CART_SUCCESS&&(e?.remove(),r.innerHTML=Number(r.innerHTML)-1)})})})};