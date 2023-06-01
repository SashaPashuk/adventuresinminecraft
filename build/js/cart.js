import API from"../js/services/api.js";import{ITEM_DELETED_FROM_CART_SUCCESS}from"./contants/errors.js";document.addEventListener("DOMContentLoaded",()=>{API.getShopOrderItems().then(e=>{renderCartItems(e),addHandlersToProductDeleteButtons(),addHandlersToProductIncreaseDecreasButtons(),addOverallSum(e)})});const cartListContainerElements=document.querySelector(".cartPage-list"),renderCartItems=e=>{let r="";e?.forEach(({product_id:e,amount:t,sum_item_price:a})=>{t=`
        <li class="cartPage-list-item" data-cart-id=${e}>
          <img src="../assets/images/product-image/img_product2.png" alt="" />
          <h3>Название товара</h3>
          <div class="cartPage-list-item-amount">
            <span>Количество:</span>
            <div class="cartPage-list-item-amount-actions">
              <img src="../assets/images/icons/arrow_left.svg" alt="" class='cart-item-decrease-button' />
              <span class="cart-item-amount">${t}</span>
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
            <div>
              <span>€</span>
              <span class="cartPage-list-item-sum">${a}</span>
            </div>
          </div>
          <div class="cart-container">
            <img
              class="cart-container-icon cart-item-delete-button"
              src="../assets/images/icons/delete-icon.svg"
              data-id=${e}
              alt=""
            />
          </div>
      </li>
    `;r+=t}),cartListContainerElements.innerHTML=r},cartPaymentButtonElement=document.querySelector("#cart-payment-button"),addHandlersToProductIncreaseDecreasButtons=(cartPaymentButtonElement?.addEventListener("click",e=>{e.preventDefault();document.querySelector(".cartPage-summary-payment-sum"),document.querySelector(".cartPage-summary-payment input")}),()=>{document.querySelectorAll(".cartPage-list-item")?.forEach(t=>{var e=t.querySelector(".cart-item-increase-button"),a=t.querySelector(".cart-item-decrease-button");const r=t.querySelector(".cart-item-amount");e.addEventListener("click",async()=>{var e=await API.updateShopItemInCart(t.getAttribute("data-cart-id"),{amount:Number(r.innerHTML)+1});console.log("response",e),"Amount cannot be changed."!==e&&modifyOverallSum("increase",Number(t.querySelector(".cartPage-list-item-sum")?.innerHTML||0))}),a.addEventListener("click",async()=>{var e=await API.updateShopItemInCart(t.getAttribute("data-cart-id"),{amount:Number(r.innerHTML)+1});console.log("response",e),"Amount cannot be changed."!==e&&modifyOverallSum("decrease",Number(t.querySelector(".cartPage-list-item-sum")?.innerHTML||0))})})}),addHandlersToProductDeleteButtons=()=>{var e=document.querySelectorAll(".cart-item-delete-button");const r=document.querySelector(".cart-container-count");e.forEach(a=>{a.addEventListener("click",e=>{e.stopPropagation(),e.preventDefault();e=API.deleteShopItemFromCart(a.getAttribute("data-id"));const t=document.querySelector(`li[data-cart-id="${a.getAttribute("data-id")}"]`);e.then(e=>{e===ITEM_DELETED_FROM_CART_SUCCESS&&(modifyOverallSum("decrease",Number(t.querySelector(".cartPage-list-item-sum")?.innerHTML||0)),t?.remove(),r.innerHTML=Number(r.innerHTML)-1)})})})},addOverallSum=e=>{e=e.reduce((e,t)=>e+t.sum_item_price,0);document.querySelector(".cartPage-summary-payment-sum").innerHTML=e},modifyOverallSum=(e,t)=>{var a=document.querySelector(".cartPage-summary-payment-sum");switch(e){case"increase":a.innerHTML=Number(a.innerHTML)+t;break;case"decrease":a.innerHTML=Number(a.innerHTML)-t}};