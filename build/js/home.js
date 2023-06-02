import API from"../js/services/api.js";import{addToastNotification}from"./utils/helpers.js";import{ITEM_ADDED_TO_CART_ERROR}from"./contants/errors.js";import{ITEM_ALREADY_ADDED_TO_CART,ITEM_SUCCESSFULLY_ADDED_TO_CART}from"./contants/notifications.js";import{DEFAULT_LANGUAGE,SHOP_ITEM_TIME_USAGE}from"./contants/constants.js";const ITEM_TYPES={Survival:"Survival",Anarchy:"Anarchy"},itemTypeSwitchElement=(document.addEventListener("DOMContentLoaded",()=>{API.getShopItems(DEFAULT_LANGUAGE,{type:ITEM_TYPES.Survival}).then(t=>{renderProductListItems(t.results),addHandlersToProductCartButtons(),addHandlersToProductCards(t.results)})}),document.querySelector(".products-svitch")),productListContainerElements=(itemTypeSwitchElement?.addEventListener("change",t=>{t=t.target.value;API.getShopItems(DEFAULT_LANGUAGE,{type:t}).then(t=>{renderProductListItems(t.results)})}),document.querySelector(".products__list")),imageURLs=["assets/images/product-image/img_product1.png","assets/images/product-image/img_product2.png","assets/images/product-image/img_product3.png","assets/images/product-image/img-product4.png"],getRandomImage=()=>{var t=Math.floor(3*Math.random())+1;return imageURLs[t]},renderProductListItems=t=>{let o="";t.forEach(({price:t,market_name:e,id:r})=>{e=`
          <div class="products-card">
            <img
                class="products-card__img"
                src=${getRandomImage()}
                alt=""
            />
            <p class="products-card__title">
              ${e||"Название товара"}
            </p>
            <div class="products-card__block">
                <p class="products-card__price">
                  €${Number(t).toFixed(2)}
                </p>
                <button class="products-card__buy" data-id=${r}></button>
            </div>
          </div>
      `;o+=e}),productListContainerElements.innerHTML=o},addHandlersToProductCards=r=>{document.querySelectorAll(".products-card")?.forEach((t,e)=>{t.addEventListener("click",()=>{localStorage.setItem("item_data",JSON.stringify({id:r[e].id,type:r[e].type})),window.open("/pages/product","_self")})})},addHandlersToProductCartButtons=()=>{var t=document.querySelectorAll(".products-card__buy");const r=document.querySelector(".cart-container-count");t.forEach(e=>{e.addEventListener("click",t=>{t.stopPropagation(),t.preventDefault(),API.addShopItemToCart({amount:1,item_id:e.getAttribute("data-id"),time_to_use:SHOP_ITEM_TIME_USAGE["30_DAYS"]}).then(t=>{"Authentication credentials were not provided."===t?.detail&&addToastNotification({message:"You should login first."}),t===ITEM_ADDED_TO_CART_ERROR&&addToastNotification({message:ITEM_ALREADY_ADDED_TO_CART}),t!==ITEM_ADDED_TO_CART_ERROR&&"Authentication credentials were not provided."!==t?.detail&&(addToastNotification({message:ITEM_SUCCESSFULLY_ADDED_TO_CART}),r.innerHTML=Number(r.innerHTML)+1)})})})};