import API from"./services/api.js";import{renderShopItemInfoHTML,addToastNotification}from"./utils/helpers.js";import{ContentLoadingEventObserever,LanguageEventObserever}from"./utils/observer.js";import{getLocalizedError}from"./services/errorsLanguageLocalization.js";import{DEFAULT_LANGUAGE,SHOP_ITEM_TIME_USAGE}from"./contants/constants.js";import{ITEM_ADDED_TO_CART_ERROR,ITEM_ADDED_TO_CART_SUCCESS,ITEM_DURATION_SERVER_ERROR,TOKEN_NOT_EXISTS,errorsLanguageLocalizationsEnum}from"./contants/errors.js";const lsTokens=localStorage.getItem("tokens");let lsShopOrderItems=localStorage.getItem("orderItems")&&JSON.parse(localStorage.getItem("orderItems"))||[];LanguageEventObserever.subscribe(async e=>{var t=localStorage.getItem("item_data"),e=await API.getOneShopItem({languageCode:e.language,itemId:JSON.parse(t)?.id||""});renderShopItemInfoHTML(e),addBuyShopItemEventListener(e),addShopItemAmountEventListener(e),addShopItemUsageEventListener(e)}),document.addEventListener("DOMContentLoaded",async()=>{var e=localStorage.getItem("item_data"),t=localStorage.getItem("language")||DEFAULT_LANGUAGE,t=await API.getOneShopItem({languageCode:t,itemId:JSON.parse(e)?.id||""});renderShopItemInfoHTML(t),addBuyShopItemEventListener(t),addShopItemAmountEventListener(t),addShopItemUsageEventListener(t),ContentLoadingEventObserever.broadcast(!0)});const addBuyShopItemEventListener=o=>{var e=document.querySelector(".buy-block__buy-btn");const n=document.querySelector(".quantity-control__number-title"),a=document.querySelector(".cart-container-count");e?.addEventListener("click",async e=>{e.preventDefault();var e=document.querySelector(".content__usage-actions")?.querySelector(".selected");if(!lsTokens)return lsShopOrderItems.find(e=>e.id===o.id)?void addToastNotification({message:getLocalizedError(errorsLanguageLocalizationsEnum.ITEM_ADDED_TO_CART_ERROR)}):o.is_one_time&&1!==Number(n.innerHTML)?void addToastNotification({message:getLocalizedError(errorsLanguageLocalizationsEnum.ITEM_AMOUNT_CAN_NOT_BE_BIGGER_THEN_ONE_ERROR)}):!o.forever_price&&e&&e.getAttribute("data-type")===SHOP_ITEM_TIME_USAGE.Forever?void addToastNotification({message:getLocalizedError(errorsLanguageLocalizationsEnum.ITEM_DURATION_ERROR)}):(e=[...lsShopOrderItems,{...o,amount:Number(n.innerHTML),time_to_use:o.price?SHOP_ITEM_TIME_USAGE["30_DAYS"]:SHOP_ITEM_TIME_USAGE.Forever,sum_item_price:o.price?Number(n.innerHTML)*Number(o.price):Number(n.innerHTML)*Number(o.forever_price)}],lsShopOrderItems=e,localStorage.setItem("orderItems",JSON.stringify(e)),addToastNotification({message:getLocalizedError(errorsLanguageLocalizationsEnum.ITEM_ADDED_TO_CART_SUCCESS)}),void(a.innerHTML=Number(a.innerHTML)+1));var e=await API.addShopItemToCart({amount:n.innerHTML,item_id:o.id,time_to_use:o.price?SHOP_ITEM_TIME_USAGE["30_DAYS"]:SHOP_ITEM_TIME_USAGE.Forever}),t=e?.time_to_use&&e?.time_to_use[0]||"",r=e?.amount&&e?.amount[0]||"";t&&addToastNotification({message:t===ITEM_DURATION_SERVER_ERROR?getLocalizedError(errorsLanguageLocalizationsEnum.ITEM_DURATION_ERROR):t}),Boolean(r)&&addToastNotification({message:r}),e===ITEM_ADDED_TO_CART_ERROR&&addToastNotification({message:getLocalizedError(errorsLanguageLocalizationsEnum.ITEM_ADDED_TO_CART_ERROR)}),e===ITEM_ADDED_TO_CART_SUCCESS&&e?.detail!==TOKEN_NOT_EXISTS&&(addToastNotification({message:getLocalizedError(errorsLanguageLocalizationsEnum.ITEM_ADDED_TO_CART_SUCCESS)}),a.innerHTML=Number(a.innerHTML)+1)})},addShopItemAmountEventListener=r=>{const e=document.querySelector(".quantity-control__number-title");var t=document.querySelector(".quantity-control__number-btn-reduce"),o=document.querySelector(".quantity-control__number-btn-increase");let n=parseInt(e.textContent);function a(){e.textContent=n}function s(){var e=document.querySelector(".content__usage-actions")?.querySelector(".selected"),t=document.getElementById("product_price");!e||"30"===e.getAttribute("data-type")?t.textContent="€"+Number(r.price*n).toFixed(2):t.textContent="€"+Number(r.forever_price*n).toFixed(2)}t.addEventListener("click",()=>{1<n&&(n--,a(),s())}),o.addEventListener("click",()=>{n++,a(),s()})},addShopItemUsageEventListener=r=>{const o=document.querySelector(".content__usage-actions")?.querySelectorAll("button"),n=document.querySelector("#product_price");o?.forEach(t=>{t.addEventListener("click",async()=>{var e=document.querySelector(".quantity-control__number-title"),e=parseInt(e.textContent);"30"===t.getAttribute("data-type")?(o[0].classList.add("selected"),o[0].classList.add("button-primary"),o[0].classList.remove("button-shade"),o[1].classList.remove("selected"),o[1].classList.remove("button-primary"),o[1].classList.add("button-shade"),n.textContent=n.textContent.slice(0,1)+e*Number(r.price)):(o[1].classList.add("selected"),o[1].classList.add("button-primary"),o[1].classList.remove("button-shade"),o[0].classList.remove("selected"),o[0].classList.remove("button-primary"),o[0].classList.add("button-shade"),n.textContent=n.textContent.slice(0,1)+e*Number(r.forever_price))})})};