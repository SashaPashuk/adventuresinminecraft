import API from"../js/services/api.js";import{addToastNotification,renderShopItemsListHTML}from"./utils/helpers.js";import{ContentLoadingEventObserever,LanguageEventObserever}from"./utils/observer.js";import{getLocalizedError}from"./services/errorsLanguageLocalization.js";import{ITEM_ADDED_TO_CART_ERROR,ITEM_ADDED_TO_CART_SUCCESS,TOKEN_NOT_EXISTS,errorsLanguageLocalizationsEnum}from"./contants/errors.js";import{DEFAULT_LANGUAGE,SHOP_ITEM_TIME_USAGE,SHOP_ITEM_TYPES}from"./contants/constants.js";const lsTokens=localStorage.getItem("tokens");let lsShopOrderItems=localStorage.getItem("orderItems")&&JSON.parse(localStorage.getItem("orderItems"))||[];LanguageEventObserever.subscribe(async e=>{var t=document.querySelector('input[type="radio"]'),t=(t?.setAttribute("checked","true"),t?.classList.add("checked"),await API.getShopItems(e.language,{type:SHOP_ITEM_TYPES.Survival}));renderShopItemsListHTML(t),addProductCartButtonsEventListeners(t),addProductCardsEventListeners(t),addShopItemsTypeSwitchEventListener()}),document.addEventListener("DOMContentLoaded",async()=>{var e=document.querySelector('input[type="radio"]'),e=(e?.setAttribute("checked","true"),e?.classList.add("checked"),await API.getShopItems(DEFAULT_LANGUAGE,{type:SHOP_ITEM_TYPES.Survival}));if(renderShopItemsListHTML(e),addProductCartButtonsEventListeners(e),addProductCardsEventListeners(e),addShopItemsTypeSwitchEventListener(),ContentLoadingEventObserever.broadcast(!0),lsTokens&&lsShopOrderItems.length){const t=document.querySelector(".cart-container-count");lsShopOrderItems.forEach(async e=>{await API.addShopItemToCart({amount:e.amount,time_to_use:e.time_to_use,item_id:e.id})===ITEM_ADDED_TO_CART_SUCCESS&&(t.innerHTML=Number(t.innerHTML)+1),localStorage.removeItem("orderItems")})}});const addProductCardsEventListeners=r=>{document.querySelectorAll(".products-card")?.forEach((e,t)=>{e.addEventListener("click",()=>{localStorage.setItem("item_data",JSON.stringify({id:r?.results[t].id,type:r?.results[t].type})),window.open("/pages/product","_self")})})},addProductCartButtonsEventListeners=o=>{var e=document.querySelectorAll(".products-card__buy");const s=document.querySelector(".cart-container-count");e?.forEach((t,r)=>{t.addEventListener("click",async e=>{if(e.stopPropagation(),e.preventDefault(),!lsTokens)return lsShopOrderItems.find(e=>e.id===o.results[r].id)?void addToastNotification({message:getLocalizedError(errorsLanguageLocalizationsEnum.ITEM_ADDED_TO_CART_ERROR)}):(e=[...lsShopOrderItems,{...o.results[r],amount:1,time_to_use:SHOP_ITEM_TIME_USAGE["30_DAYS"],sum_item_price:Number(o.results[r].price)}],lsShopOrderItems=e,localStorage.setItem("orderItems",JSON.stringify(e)),addToastNotification({message:getLocalizedError(errorsLanguageLocalizationsEnum.ITEM_ADDED_TO_CART_SUCCESS)}),void(s.innerHTML=Number(s.innerHTML)+1));e=await API.addShopItemToCart({amount:1,item_id:t.getAttribute("data-id"),time_to_use:SHOP_ITEM_TIME_USAGE["30_DAYS"]});e===ITEM_ADDED_TO_CART_ERROR&&addToastNotification({message:getLocalizedError(errorsLanguageLocalizationsEnum.ITEM_ADDED_TO_CART_ERROR)}),e!==ITEM_ADDED_TO_CART_ERROR&&e?.detail!==TOKEN_NOT_EXISTS&&(addToastNotification({message:getLocalizedError(errorsLanguageLocalizationsEnum.ITEM_ADDED_TO_CART_SUCCESS)}),s.innerHTML=Number(s.innerHTML)+1)})})},addShopItemsTypeSwitchEventListener=()=>{var e=document.querySelector(".products-svitch");const r=document.querySelectorAll(".products-svitch input");e?.addEventListener("change",async e=>{const t=e.target.value;e=await API.getShopItems(DEFAULT_LANGUAGE,{type:t});r?.forEach(e=>{e.value===t?(e.setAttribute("checked","true"),e.classList.add("checked")):(e.removeAttribute("checked"),e.classList.remove("checked"))}),renderShopItemsListHTML(e),addProductCartButtonsEventListeners(e),addProductCardsEventListeners(e)})};