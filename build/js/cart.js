import API from"../js/services/api.js";import{addToastNotification,renderCartItemsHTML,renderServerDropdownItemsHTML}from"./utils/helpers.js";import{FIELD_NOT_EMPTY_ERROR,ITEM_AMOUNT_CAN_NOT_BE_CHANGED_ERROR,ITEM_DELETED_FROM_CART_SUCCESS}from"./contants/errors.js";import{ITEM_SUCCESSFULLY_DELETED_FROM_CART}from"./contants/notifications.js";import{SHOP_ITEM_TIME_USAGE}from"./contants/constants.js";document.addEventListener("DOMContentLoaded",async()=>{var e=await API.getShopOrderItems(),t=await API.getShopServersRequest();renderCartItemsHTML(e),renderOverallPaymentSumHTML(e),renderServerDropdownItemsHTML(t),addProductDeleteButtonEventListener(),addProductIncreaseDecreasButtonsEventListener(),addCartPaymentButtonEventListener(),addServersDropdownEventListener()});const addCartPaymentButtonEventListener=()=>{document.querySelector("#cart-payment-button")?.addEventListener("click",async e=>{e.preventDefault();var e=document.querySelector(".cartPage-summary-payment"),t=document.querySelector("#cart-payment-nickname"),r=document.querySelector("#dropdown-selected-item"),t=await API.createPaymentRequest({user_nickname:t.value,server:r.innerHTML}),r=t?.user_nickname&&t?.user_nickname[0]||"";[FIELD_NOT_EMPTY_ERROR].includes(r)&&((e?.querySelector('label[for="nickname"]')).innerHTML="Enter valid nickname."),t?.redirect_url&&(window.open(t.redirect_url,"_blank"),window.location.reload())})},addServersDropdownEventListener=()=>{const r=document.querySelector(".dropdown-custom__selection"),n=document.querySelector(".dropdown-custom__container");r?.addEventListener("click",()=>{n.classList.toggle("hidden"),r.classList.toggle("dropdown-custom__selection-open");const e=document.querySelectorAll(".dropdown-custom__container__item");{const t=r?.querySelector("span");e?.forEach(e=>{e.addEventListener("click",()=>{t.innerHTML=e.innerHTML,n.classList.add("hidden")})})}})},addProductIncreaseDecreasButtonsEventListener=()=>{document.querySelectorAll(".cartPage-list-item")?.forEach(t=>{var e=t.querySelector(".cart-item-increase-button"),r=t.querySelector(".cart-item-decrease-button");const n=t.querySelector(".cart-item-amount");e.addEventListener("click",async()=>{var e=await API.updateShopItemInCart(t.getAttribute("data-cart-id"),{amount:Number(n.innerHTML)+1});e===ITEM_AMOUNT_CAN_NOT_BE_CHANGED_ERROR&&addToastNotification({message:e}),e!==ITEM_AMOUNT_CAN_NOT_BE_CHANGED_ERROR&&modifyOverallPaymentSumHTML("increase",Number(t.querySelector(".cartPage-list-item-sum")?.innerHTML||0))}),r.addEventListener("click",async()=>{var e=await API.updateShopItemInCart(t.getAttribute("data-cart-id"),{amount:Number(n.innerHTML)+1});e===ITEM_AMOUNT_CAN_NOT_BE_CHANGED_ERROR&&addToastNotification({message:e}),e!==ITEM_AMOUNT_CAN_NOT_BE_CHANGED_ERROR&&modifyOverallPaymentSumHTML("decrease",Number(t.querySelector(".cartPage-list-item-sum")?.innerHTML||0))})})},addProductDeleteButtonEventListener=()=>{var e=document.querySelectorAll(".cart-item-delete-button");const n=document.querySelector(".cart-container-count");e.forEach(r=>{r.addEventListener("click",e=>{e.stopPropagation(),e.preventDefault();e=API.deleteShopItemFromCart(r.getAttribute("data-id"));const t=document.querySelector(`li[data-cart-id="${r.getAttribute("data-id")}"]`);e.then(e=>{e===ITEM_DELETED_FROM_CART_SUCCESS&&(modifyOverallPaymentSumHTML("decrease",Number(t.querySelector(".cartPage-list-item-sum")?.innerHTML||0)),addToastNotification({message:ITEM_SUCCESSFULLY_DELETED_FROM_CART}),t?.remove(),n.innerHTML=Number(n.innerHTML)-1)})})})},addOrderItemsUsageButtonsEventListener=e=>{document.querySelectorAll(".cartPage-list-item")?.forEach(e=>{var t=e.querySelector(".cartPage-list-item-usage-actions"),e=e.querySelectorAll(".cartPage-list-item-usage-actions button");const r=t.querySelector("#item-usage-days"),n=t.querySelector("#item-usage-forever");e?.forEach(e=>{e.addEventListener("click",()=>{"30"===e.getAttribute("data-type")?(r.classList.add("selected"),n.classList.remove("selected")):(r.classList.remove("selected"),n.classList.add("selected"))})})})},renderOverallPaymentSumHTML=e=>{e=e.reduce((e,t)=>e+t.sum_item_price,0);document.querySelector(".cartPage-summary-payment-sum").innerHTML=e},modifyOverallPaymentSumHTML=(e,t)=>{var r=document.querySelector(".cartPage-summary-payment-sum");switch(e){case"increase":r.innerHTML=Number(r.innerHTML)+t;break;case"decrease":r.innerHTML=Number(r.innerHTML)-t}};