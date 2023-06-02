import API from"./services/api.js";import{renderShopItemInfoHTML,addToastNotification}from"./utils/helpers.js";import{DEFAULT_LANGUAGE,SHOP_ITEM_TIME_USAGE}from"./contants/constants.js";import{ITEM_ADDED_TO_CART_ERROR,ITEM_ADDED_TO_CART_SUCCESS}from"./contants/errors.js";document.addEventListener("DOMContentLoaded",async()=>{const t=localStorage.getItem("item_data");var e=(await API.getShopItems(DEFAULT_LANGUAGE,{type:JSON.parse(t)?.type||""}))?.results?.find(e=>e.id===JSON.parse(t)?.id);renderShopItemInfoHTML(e),addCarouselEventListeners(),addBuyShopItemEventListener(e),addShopItemAmountEventListener()});const addBuyShopItemEventListener=n=>{var e=document.querySelector(".buy-block__buy-btn");const o=document.querySelector(".quantity-control__number-title"),r=document.querySelector(".cart-container-count");e?.addEventListener("click",async e=>{e.preventDefault();var e=await API.addShopItemToCart({amount:o.innerHTML,item_id:n.id,time_to_use:SHOP_ITEM_TIME_USAGE["30_DAYS"]}),t=e?.amount&&e?.amount[0]||"";"Authentication credentials were not provided."===e?.detail&&addToastNotification({message:"You should login first."}),Boolean(t)&&addToastNotification({message:e?.amount[0]}),e===ITEM_ADDED_TO_CART_ERROR&&addToastNotification({message:ITEM_ADDED_TO_CART_ERROR}),e===ITEM_ADDED_TO_CART_SUCCESS&&"Authentication credentials were not provided."!==e?.detail&&(addToastNotification({message:ITEM_ADDED_TO_CART_SUCCESS}),r.innerHTML=Number(r.innerHTML)+1)})};let currentSlide=0;const addCarouselEventListeners=()=>{var e=document.querySelector(".slider__button-prev"),t=document.querySelector(".slider__button-next");const n=document.querySelector(".slider__main-img"),o=document.querySelectorAll(".slider__row img");function r(){n.src=o[currentSlide].src}t.addEventListener("click",()=>{++currentSlide>=o.length&&(currentSlide=0),r()}),e.addEventListener("click",()=>{--currentSlide<0&&(currentSlide=o.length-1),r()})},addShopItemAmountEventListener=()=>{const e=document.querySelector(".quantity-control__number-title");var t=document.querySelector(".quantity-control__number-btn-reduce"),n=document.querySelector(".quantity-control__number-btn-increase");let o=parseInt(e.textContent);function r(){e.textContent=o}t.addEventListener("click",()=>{1<o&&(o--,r(),d())}),n.addEventListener("click",()=>{o++,r(),d()});const i=document.getElementById("product_price");let a=parseFloat(i.textContent.slice(1));function d(){var e=Number(a*o).toFixed(2);i.textContent="€"+e}};