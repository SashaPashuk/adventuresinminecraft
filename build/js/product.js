import API from"./services/api.js";import{renderShopItemInfoHTML,addToastNotification}from"./utils/helpers.js";import{LanguageEventObserever}from"./utils/observer.js";import{DEFAULT_LANGUAGE,SHOP_ITEM_TIME_USAGE}from"./contants/constants.js";import{ITEM_ADDED_TO_CART_ERROR,ITEM_ADDED_TO_CART_SUCCESS}from"./contants/errors.js";LanguageEventObserever.subscribe(async e=>{var t=localStorage.getItem("item_data"),e=await API.getOneShopItem({languageCode:e.language,itemId:JSON.parse(t)?.id||""});renderShopItemInfoHTML(e),addBuyShopItemEventListener(e),addShopItemAmountEventListener()}),document.addEventListener("DOMContentLoaded",async()=>{var e=localStorage.getItem("item_data"),e=await API.getOneShopItem({languageCode:DEFAULT_LANGUAGE,itemId:JSON.parse(e)?.id||""});renderShopItemInfoHTML(e),addBuyShopItemEventListener(e),addShopItemAmountEventListener()});const addBuyShopItemEventListener=n=>{var e=document.querySelector(".buy-block__buy-btn");const o=document.querySelector(".quantity-control__number-title"),a=document.querySelector(".cart-container-count");e?.addEventListener("click",async e=>{e.preventDefault();var e=await API.addShopItemToCart({amount:o.innerHTML,item_id:n.id,time_to_use:SHOP_ITEM_TIME_USAGE["30_DAYS"]}),t=e?.amount&&e?.amount[0]||"";"Authentication credentials were not provided."===e?.detail&&addToastNotification({message:"You should login first."}),Boolean(t)&&addToastNotification({message:e?.amount[0]}),e===ITEM_ADDED_TO_CART_ERROR&&addToastNotification({message:ITEM_ADDED_TO_CART_ERROR}),e===ITEM_ADDED_TO_CART_SUCCESS&&"Authentication credentials were not provided."!==e?.detail&&(addToastNotification({message:ITEM_ADDED_TO_CART_SUCCESS}),a.innerHTML=Number(a.innerHTML)+1)})},addShopItemAmountEventListener=()=>{const e=document.querySelector(".quantity-control__number-title");var t=document.querySelector(".quantity-control__number-btn-reduce"),n=document.querySelector(".quantity-control__number-btn-increase");let o=parseInt(e.textContent);function a(){e.textContent=o}t.addEventListener("click",()=>{1<o&&(o--,a(),d())}),n.addEventListener("click",()=>{o++,a(),d()});const r=document.getElementById("product_price");let i=parseFloat(r.textContent.slice(1));function d(){var e=Number(i*o).toFixed(2);r.textContent="€"+e}},localStorageSetHandler=function(e){alert('localStorage.set("'+e.key+'", "'+e.value+'") was called')};document.addEventListener("itemInserted",localStorageSetHandler,!1);