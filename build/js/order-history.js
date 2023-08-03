import{ITEM_ADDED_TO_CART_ERROR,ITEM_ADDED_TO_CART_SUCCESS,errorsLanguageLocalizationsEnum}from"./contants/errors.js";import API from"./services/api.js";import{getLocalizedError}from"./services/errorsLanguageLocalization.js";import{addToastNotification,renderOrderHistoryItemsHTML}from"./utils/helpers.js";import{ContentLoadingEventObserever}from"./utils/observer.js";document.addEventListener("DOMContentLoaded",async()=>{var r=await API.getShopOrdersRequest();renderOrderHistoryItemsHTML(r),addShopOrderItemsDropdownEventListener(),addRepeatOrderEventListener(r),ContentLoadingEventObserever.broadcast(!0)});const addShopOrderItemsDropdownEventListener=()=>{document.querySelectorAll(".orderHistory-orders-order-container")?.forEach(t=>{t.querySelector("#arrow-order-button")?.addEventListener("click",()=>{var r=t?.querySelector(".orderHistory-orders-order-details"),e=t?.querySelector("hr"),o=t?.querySelector(".orderHistory-orders-order-actions-arrow");e.classList.toggle("hidden"),r.classList.toggle("hidden"),o.classList.toggle("orderHistory-orders-order-actions-arrow-open")})})},addRepeatOrderEventListener=t=>{var r=document.querySelectorAll(".orderHistory-orders-order-container");const a=document.querySelector(".cart-container-count");r?.forEach((r,e)=>{const o=t?.results[e].order_item;r.querySelector(".button-primary").addEventListener("click",()=>{o.forEach(async r=>{var e=await API.addShopItemToCart({amount:r.amount,time_to_use:r.time_to_use,item_id:r.product_id,currency:r.currency});e===ITEM_ADDED_TO_CART_ERROR&&addToastNotification({message:getLocalizedError(errorsLanguageLocalizationsEnum.ITEM_ALREADY_ADDED_TO_CART_WITH_NAME,{firstParam:r?.image_name.slice(0,-4)})}),e===ITEM_ADDED_TO_CART_SUCCESS&&(addToastNotification({message:getLocalizedError(errorsLanguageLocalizationsEnum.ITEM_ADDED_TO_CART_WITH_NAME_SUCCESS,{firstParam:r?.image_name.slice(0,-4)})}),a.innerHTML=Number(a.innerHTML)+1)})})})};