import{SHOP_ITEM_TIME_USAGE,SHOP_ITEM_TYPES}from"../contants/constants.js";import{errorsLanguageLocalizationsEnum}from"../contants/errors.js";import{getLocalizedError}from"../services/errorsLanguageLocalization.js";const addToastNotification=({message:e,duration:t=3e3})=>{var r=document.querySelector(".toasts-wrapper");const a=document.createElement("div");a.className="toast-container";var s=document.createElement("div"),i=document.createElement("p"),n=document.createElement("img");n.className="toast-container-closeBtn",n.setAttribute("src","../assets/images/icons/cross_icon.svg"),n.addEventListener("click",()=>{a.remove()}),i.innerHTML=e,s.appendChild(i),a.appendChild(s),a.appendChild(n),r.appendChild(a),setTimeout(()=>{a.remove()},t)},renderShopItemImgHTML=({shopItemName:e,shopItemType:t,imageClass:r})=>{return`<img ${r?`class="${r}"`:""} src="../assets/images/products/${t}/${e}" alt=${e}-image />`};function descriptionList(e,r=!0){if(!e?.includes("1."))return`<li>${e}</li>`;var t=e.split(/(\d+\.\s)/).filter(e=>""!==e.trim()),a=[];for(let e=0;e<t.length;e+=2)a.push({number:t[e],text:t[e+1].trim()});return a.map(({number:e,text:t})=>`<li>${r?e:""}${t}</li>`).join("")}const renderShopItemInfoHTML=({description:e,price:t,forever_price:r,market_name:a,image_name:s,type:i,time_to_use:n,is_one_time:o})=>{var d=document.querySelector(".product-info__content"),n=`<div class="content__usage-actions-wrapper ${t&&r?"":"hidden-visibility"}">
    <span data-i18n-key="productPage__usage" class="price-block__title">
      Срок действия покупки:
    </span>
    <div class="content__usage-actions">
      <button
        data-i18n-key="productPage__usage_30"
        id="item-usage-days"
        data-type=${SHOP_ITEM_TIME_USAGE["30_DAYS"]}
        class=${n===SHOP_ITEM_TIME_USAGE["30_DAYS"]?"button-primary selected":""} selected button-primary
      >
        "30 Дней"
      </button>
      <button
        data-i18n-key="productPage__usage_forever"
        id="item-usage-forever"
        data-type=${SHOP_ITEM_TIME_USAGE.Forever}
        class=${n===SHOP_ITEM_TIME_USAGE.Forever?"button-primary selected":"button-shade"}
      >
        Навсегда
      </button>
    </div>
  </div>`,a=`
    <h2 class="content__title">${a}</h2>
    <h4 data-i18n-key="productPage__desc" class="content__subtitle">Описание товара:</h4>
    <ul class="product-description">
      ${descriptionList(e)}
    </ul>
    <div class="content__info">
      <div class="content__price-block price-block">
        <span data-i18n-key="productPage__price" class="price-block__title">Цeна:</span>
        <span class="price-block__price" id="product_price">€${Number(t)||Number(r)}</span>
      </div>
      ${n}
    </div>
    <div class="content__buy-block buy-block">
      <p data-i18n-key="productPage__amount" class="buy-block__quantity-title quantity-title ${o?"hidden":""}">
        Количество:
      </p>
      <div class="buy-block__quantity-control quantity-control">
        <div class="quantity-control__number ${o?"hidden":""}">
          <button
            class="quantity-control__number-btn quantity-control__number-btn-reduce"
          ></button>
          <span class="quantity-control__number-title">1</span>
          <button
            class="quantity-control__number-btn quantity-control__number-btn-increase"
          ></button>
        </div>
        <button data-i18n-key="productPage__button" class="buy-block__buy-btn buy-btn button-primary">Купить</button>
      </div>
    </div>
  `,e=document.querySelector(".product-info__slider"),t=`
    ${renderShopItemImgHTML({shopItemName:s,shopItemType:i.toLowerCase(),imageClass:"slider__main-img"})}
  `;e.innerHTML=t,d.innerHTML=a},renderCartItemsHTML=e=>{var t=document.querySelector(".cartPage-list");let l="";e?.forEach(({product_id:e,id:t,amount:r,sum_item_price:a,time_to_use:s,image_name:i,market_name:n,is_one_time:o,price:d,forever_price:c})=>{t=`
        <li class="cartPage-list-item" data-cart-id=${e||t}>
          <h3>${n||i.slice(0,-4)}</h3>
          <div class="cartPage-list-item-actionContainer">
            <div 
              class="cartPage-list-item-amount ${o?"disabled":""}"
              title="${getLocalizedError(errorsLanguageLocalizationsEnum.ITEM_AMOUNT_CAN_NOT_BE_CHANGED_ERROR)}"
            >
              <span data-i18n-key="cartPage__amount">Количество:</span>
              <div class="cartPage-list-item-amount-actions">
                <img src="../assets/images/icons/arrow_left.svg" alt="" class='cart-item-decrease-button' />
                <span class="cart-item-amount">${r}</span>
                <img src="../assets/images/icons/arrow_right.svg" alt="" class='cart-item-increase-button' />
              </div>
            </div>
            <div 
              class="cartPage-list-item-usage ${d&&c?"":"disabled"}"
              title="${getLocalizedError(errorsLanguageLocalizationsEnum.ITEM_DURATION_ERROR)}"
            >
              <span data-i18n-key="cartPage__usage">Срок действия покупки:</span>
              <div class="cartPage-list-item-usage-actions">
                <button
                  data-i18n-key="cartPage__usage_30"
                  id="item-usage-days" data-type=${SHOP_ITEM_TIME_USAGE["30_DAYS"]} 
                  class="${s===SHOP_ITEM_TIME_USAGE["30_DAYS"]?"selected":""}"
                  >30 Дней</button>
                <button 
                  data-i18n-key="cartPage__usage_forever"
                  id="item-usage-forever" 
                  data-type=${SHOP_ITEM_TIME_USAGE.Forever} 
                  class="${s===SHOP_ITEM_TIME_USAGE.Forever?"selected":""}"
                >Навсегда</button>
              </div>
            </div>
            <div>
              <span data-i18n-key="cartPage__price">Цена:</span>
              <div>
                <span>€</span>
                <span class="cartPage-list-item-sum">${a}</span>
              </div>
            </div>
          </div>
          <div class="cart-container">
            <img
              class="cart-container-icon cart-item-delete-button"
              src="../assets/images/icons/delete-icon.svg"
              data-id=${e}
              alt="delete-icon"
            />
          </div>
      </li>
    `;l+=t}),t.innerHTML=l},renderServerDropdownItemsHTML=e=>{var t=document.querySelector(".dropdown-custom__container");let r="";e?.forEach(({server_type:e})=>{e=`
      <li class="dropdown-custom__container__item">${e}</li>
    `;r+=e}),t.innerHTML=r},renderOrderHistoryItemsHTML=e=>{var t=document.querySelector(".orderHistory-orders");let a="";e?.results?.forEach(({id:e,total_price:t,order_item:r})=>{e=`
        <li class="orderHistory-orders-order-container">
        <div class="orderHistory-orders-order">
          <div>
            <div class="orderHistory-orders-orderId">
              <span data-i18n-key="orderHistoryPage__orderTitle">Заказ</span>
              <span>${e.slice(-5)}</span>
            </div>
            <span data-i18n-key="orderHistoryPage__orderDone">Выполнен</span>
          </div>
          <div class="orderHistory-orders-order__amount-container"><span data-i18n-key="orderHistoryPage__amount">Количество:</span><span>${r?.length}</span></div>
          <div><span data-i18n-key="orderHistoryPage__totalPrice">Цена:</span><span>€${Number(t).toFixed()}</span></div>
          <div class="orderHistory-orders-order-actions">
            <button data-i18n-key="orderHistoryPage__repeatOrderButton" class="button-primary">Повторить заказ</button>
            <span
              class="orderHistory-orders-order-actions-arrow"
              id="arrow-order-button"
            >
              <svg
                width="12"
                height="7"
                viewBox="0 0 12 7"
                fill="currentColor"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M5.9998 6.975C5.86647 6.975 5.73714 6.95 5.6118 6.9C5.48647 6.85 5.38247 6.78334 5.2998 6.7L0.699804 2.1C0.516471 1.91667 0.424805 1.68334 0.424805 1.4C0.424805 1.11667 0.516471 0.883336 0.699804 0.700003C0.883138 0.516669 1.11647 0.425003 1.3998 0.425003C1.68314 0.425003 1.91647 0.516669 2.0998 0.700003L5.9998 4.6L9.8998 0.700003C10.0831 0.516669 10.3165 0.425003 10.5998 0.425003C10.8831 0.425003 11.1165 0.516669 11.2998 0.700003C11.4831 0.883336 11.5748 1.11667 11.5748 1.4C11.5748 1.68334 11.4831 1.91667 11.2998 2.1L6.6998 6.7C6.5998 6.8 6.49147 6.871 6.3748 6.913C6.25814 6.955 6.13314 6.97567 5.9998 6.975Z"
                  fill="currentColor"
                />
              </svg>
            </span>
          </div>
        </div>
        <hr class="hidden" />
        <div class="orderHistory-orders-order-details hidden">
          <h3 data-i18n-key="orderHistoryPage__items" class="orderHistory-orders-order-details-title">Товары</h3>
          <ul class="orderHistory-orders-order-details-list">
          ${r.map(({amount:e,price:t,forever_price:r,sum_item_price:a,time_to_use:s,image_name:i})=>`
              <li class="orderHistory-orders-order-details-list-item">
                <h3>${i.slice(0,-4)}</h3>
                <div>
                  <span data-i18n-key="orderHistoryPage__itemDuration">Срок действия покупки:</span>
                  <span>${s}</span>
                </div>
                <div>
                  <span data-i18n-key="orderHistoryPage__itemAmount">Количество:</span>
                  <span>${e}</span>
                </div>
                <div>
                  <span data-i18n-key="orderHistoryPage__itemPrice">Цена</span>
                  <span>€${t||r}</span>
                </div>
                <div>
                  <span data-i18n-key="orderHistoryPage__overallPrice">Общая цена</span>
                  <span>€${a}</span>
                </div>
              </li>
            `)}
          </ul>
        </div>
      </li>
    `;a+=e}),t.innerHTML=a},renderShopItemsListHTML=e=>{var t=document.querySelector(".products__list");let n="";e?.results?.forEach(({price:e,market_name:t,image_name:r,id:a,type:s,forever_price:i})=>{r=`
          <div class="products-card">
            ${renderShopItemImgHTML({shopItemName:r,shopItemType:s.toLowerCase()})}
            <p class="products-card__title">
              ${t}
            </p>
            <div class="products-card__block">
                <p class="products-card__price">
                  €${Number(e)||Number(i)}
                </p>
                <button class="products-card__buy" data-id=${a}></button>
            </div>
          </div>
      `;n+=r}),t.innerHTML=n},renderDonationDescriptionColumnItemsHTML=(e,t=SHOP_ITEM_TYPES.Survival,a)=>{if(e?.results){var s=document.querySelector("#survival_column"),i=document.querySelector("#anarchy_column");let r="";e?.results.forEach((e,t)=>{t=`
          <button 
            class="donation-description__nav-btn ${(a?a.id===e.id:0===t)?"donation-description__nav-btn--active":""} ${e.type}" 
            data-name="${e.type.toLowerCase()}_${e.market_name.toLowerCase()}"
          >${e.market_name}</button>`;r+=t}),t===SHOP_ITEM_TYPES.Survival?s.innerHTML=r:i.innerHTML=r}},renderDonationDescriptionItemDescHTML=(e,t=SHOP_ITEM_TYPES.Survival)=>{var r=document.querySelector("#survival_desc"),a=document.querySelector("#anarchy_desc"),e=`
    <h4 class="description-block__title">${e.market_name}</h4>
    <div class="description-block__row">
      ${(e=>{if(!e?.includes("1."))return`<ul class="description-block__list"><li>${e}</li></ul>`;var t=e.split(/(\d+\.\s)/).filter(e=>""!==e.trim()),r=[];for(let e=0;e<t.length;e+=2)r.push({number:t[e],text:t[e+1].trim()});return 8<r.length?`
        <ul class="description-block__list">
          ${r.slice(0,Math.round(r.length/2)).map(({text:e})=>`<li>${e}</li>`).join("")}
        </ul>
        <ul class="description-block__list">
          ${r.slice(Math.round(r.length/2),r.length).map(({text:e})=>`<li>${e}</li>`).join("")}
        </ul>
      `:`<ul class="description-block__list">${r.map(({text:e})=>`<li>${e}</li>`).join("")}</ul>`})(e.description)}
    </div>
  `;t===SHOP_ITEM_TYPES.Survival?r.innerHTML=e:a.innerHTML=e},renderListingHTML=e=>{var t=document.querySelector("#mods-listing");let r="";e.forEach(e=>{e=`
      <div>
        <h3>${e}</h2>
        <p>
        </p>
        <a
          data-i18n-key="modsPage_button"
          class="button-primary"
          href="/pages/mods/${e}"
          ></a
        >
      </div>
    `;r+=e}),t.innerHTML=r};export{addToastNotification,renderShopItemImgHTML,renderShopItemInfoHTML,renderCartItemsHTML,renderServerDropdownItemsHTML,renderOrderHistoryItemsHTML,renderShopItemsListHTML,renderDonationDescriptionColumnItemsHTML,renderDonationDescriptionItemDescHTML,renderListingHTML};