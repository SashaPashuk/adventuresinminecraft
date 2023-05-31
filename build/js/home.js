import API from"../js/services/api.js";const ITEM_TYPES={Survival:"Survival",Anarchy:"Anarchy"},itemTypeSwitchElement=(document.addEventListener("DOMContentLoaded",()=>{API.getShopItems("ru",{type:ITEM_TYPES.Survival}).then(t=>{renderProductListItems(t.results),addHandlersToProductCartButtons()})}),document.querySelector(".products-svitch")),productListContainerElements=(itemTypeSwitchElement?.addEventListener("change",t=>{t=t.target.value;API.getShopItems("ru",{type:t}).then(t=>{renderProductListItems(t.results)})}),document.querySelector(".products__list")),imageURLs=["assets/images/product-image/img_product1.png","assets/images/product-image/img_product2.png","assets/images/product-image/img_product3.png","assets/images/product-image/img-product4.png"],getRandomImage=()=>{var t=Math.floor(3*Math.random())+1;return imageURLs[t]},renderProductListItems=t=>{let a="";t.forEach(({price:t,market_name:e,id:r})=>{e=`
        <a href="/pages/product.html">
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
        </a>
      `;a+=e}),productListContainerElements.innerHTML=a},addHandlersToProductCartButtons=()=>{document.querySelectorAll(".products-card__buy").forEach(e=>{e.addEventListener("click",t=>{t.stopPropagation(),t.preventDefault(),console.log(e.getAttribute("data-id")),API.addShopItemToCart(e.getAttribute("data-id"))})})};