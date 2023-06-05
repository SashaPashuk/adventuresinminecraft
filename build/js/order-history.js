import{ITEM_ADDED_TO_CART_ERROR}from"./contants/errors.js";import{ITEM_ALREADY_ADDED_TO_CART_WITH_NAME}from"./contants/notifications.js";import API from"./services/api.js";import{addToastNotification,renderOrderHistoryItemsHTML}from"./utils/helpers.js";document.addEventListener("DOMContentLoaded",async()=>{var r=await API.getShopOrdersRequest();renderOrderHistoryItemsHTML(r),addShopOrderItemsDropdownEventListener(),addRepeatOrderEventListener(r)});const addShopOrderItemsDropdownEventListener=()=>{document.querySelectorAll(".orderHistory-orders-order-container")?.forEach(o=>{o.querySelector("#arrow-order-button")?.addEventListener("click",()=>{var r=o?.querySelector(".orderHistory-orders-order-details"),e=o?.querySelector("hr"),t=o?.querySelector(".orderHistory-orders-order-actions-arrow");e.classList.toggle("hidden"),r.classList.toggle("hidden"),t.classList.toggle("orderHistory-orders-order-actions-arrow-open")})})},addRepeatOrderEventListener=o=>{document.querySelectorAll(".orderHistory-orders-order-container")?.forEach((r,e)=>{const t=o?.results[e].order_item;r.querySelector(".button-primary").addEventListener("click",()=>{t.forEach(async r=>{await API.addShopItemToCart({amount:r.amount,time_to_use:r.time_to_use,item_id:r.product_id})===ITEM_ADDED_TO_CART_ERROR&&addToastNotification({message:ITEM_ALREADY_ADDED_TO_CART_WITH_NAME(r?.name||"Название товара")})})})})};