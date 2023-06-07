import { SHOP_ITEM_TIME_USAGE } from "../contants/constants.js";

/**
 * @param {Object} param
 * @param {String} param.message
 * @param {Number} param.duration
 * @returns {void}
 */
export const addToastNotification = ({ message, duration = 3000 }) => {
  const toastsWrapperElement = document.querySelector(".toasts-wrapper");

  const toastContainer = document.createElement("div");
  toastContainer.className = "toast-container";

  const toastContainerInner = document.createElement("div");
  const messageParagraph = document.createElement("p");

  messageParagraph.innerHTML = message;
  toastContainerInner.appendChild(messageParagraph);
  toastContainer.appendChild(toastContainerInner);

  toastsWrapperElement.appendChild(toastContainer);

  setTimeout(() => {
    toastContainer.remove();
  }, duration);
};

// Render HTML Functions

/**
 * @param {string} shopItemName
 * @param {string} shopItemType
 * @returns {HTMLImageElement}
 */
export const renderShopItemImgHTML = ({
  shopItemName,
  shopItemType,
  imageClass,
}) => {
  const classAttribute = imageClass ? `class="${imageClass}"` : "";

  return `<img ${classAttribute} src="../assets/images/products/${shopItemType}/${shopItemName}" alt=${shopItemName}-image />`;
};

export const renderShopItemInfoHTML = ({
  description,
  price,
  market_name,
  image_name,
  type,
  time_to_use,
}) => {
  const productInfoContainerElement = document.querySelector(
    ".product-info__content"
  );

  const itemInfo = `
    <h2 class="content__title">${market_name}</h2>
    <h4 data-i18n-key="productPage__desc" class="content__subtitle">Описание товара:</h4>
    <p class="content__text">${description}</p>
    <div class="content__info">
      <div class="content__price-block price-block">
        <span data-i18n-key="productPage__price" class="price-block__title">Цeна:</span>
        <span class="price-block__price" id="product_price">€${Number(
          price
        ).toFixed(2)}</span>
      </div>
      <div class="content__usage-actions-wrapper">
        <span data-i18n-key="productPage__usage" class="price-block__title">Срок действия покупки:</span>
        <div class="content__usage-actions">
          <button 
            data-i18n-key="productPage__usage_30"
            id="item-usage-days" 
            data-type=${SHOP_ITEM_TIME_USAGE["30_DAYS"]} 
            class="${
              time_to_use === SHOP_ITEM_TIME_USAGE["30_DAYS"]
                ? "button-primary selected"
                : ""
            } selected button-primary"
          >30 Дней</button>
          <button 
            data-i18n-key="productPage__usage_forever"
            id="item-usage-forever" 
            data-type=${SHOP_ITEM_TIME_USAGE.Forever} 
            class="${
              time_to_use === SHOP_ITEM_TIME_USAGE.Forever
                ? "button-primary selected"
                : "button-shade"
            }"
          >Навсегда</button>
        </div>
      </div>
    </div>
    <div class="content__buy-block buy-block">
      <p data-i18n-key="productPage__amount" class="buy-block__quantity-title quantity-title">
        Количество:
      </p>
      <div class="buy-block__quantity-control quantity-control">
        <div class="quantity-control__number">
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
  `;

  const productSliderContainerElement = document.querySelector(
    ".product-info__slider"
  );
  const itemSlider = `
    ${renderShopItemImgHTML({
      shopItemName: image_name,
      shopItemType: type.toLowerCase(),
      imageClass: "slider__main-img",
    })}
  `;

  productSliderContainerElement.innerHTML = itemSlider;
  productInfoContainerElement.innerHTML = itemInfo;
};

export const renderCartItemsHTML = (items) => {
  const cartItemsContainerElement = document.querySelector(".cartPage-list");
  let html = "";

  items?.forEach(
    ({ product_id, amount, sum_item_price, time_to_use, image_name }) => {
      const item = `
        <li class="cartPage-list-item" data-cart-id=${product_id}>
          <h3>${image_name.slice(0, -4)}</h3>
          <div class="cartPage-list-item-amount">
            <span data-i18n-key="cartPage__amount">Количество:</span>
            <div class="cartPage-list-item-amount-actions">
              <img src="../assets/images/icons/arrow_left.svg" alt="" class='cart-item-decrease-button' />
              <span class="cart-item-amount">${amount}</span>
              <img src="../assets/images/icons/arrow_right.svg" alt="" class='cart-item-increase-button' />
            </div>
          </div>
          <div class="cartPage-list-item-usage">
            <span data-i18n-key="cartPage__usage">Срок действия покупки:</span>
            <div class="cartPage-list-item-usage-actions">
              <button
                data-i18n-key="cartPage__usage_30"
                id="item-usage-days" data-type=${
                  SHOP_ITEM_TIME_USAGE["30_DAYS"]
                } 
                class="${
                  time_to_use === SHOP_ITEM_TIME_USAGE["30_DAYS"]
                    ? "selected"
                    : ""
                }">30 Дней</button>
              <button 
                data-i18n-key="cartPage__usage_forever"
                id="item-usage-forever" 
                data-type=${SHOP_ITEM_TIME_USAGE.Forever} 
                class="${
                  time_to_use === SHOP_ITEM_TIME_USAGE.Forever ? "selected" : ""
                }"
              >Навсегда</button>
            </div>
          </div>
          <div>
            <span data-i18n-key="cartPage__price">Цена:</span>
            <div>
              <span>€</span>
              <span class="cartPage-list-item-sum">${sum_item_price}</span>
            </div>
          </div>
          <div class="cart-container">
            <img
              class="cart-container-icon cart-item-delete-button"
              src="../assets/images/icons/delete-icon.svg"
              data-id=${product_id}
              alt="delete-icon"
            />
          </div>
      </li>
    `;

      html += item;
    }
  );

  cartItemsContainerElement.innerHTML = html;
};

export const renderServerDropdownItemsHTML = (items) => {
  const dropdownServersContainerElement = document.querySelector(
    ".dropdown-custom__container"
  );
  let html = "";

  items?.forEach(({ server_type }) => {
    const item = `
      <li class="dropdown-custom__container__item">${server_type}</li>
    `;

    html += item;
  });

  dropdownServersContainerElement.innerHTML = html;
};

export const renderOrderHistoryItemsHTML = (data) => {
  const ordersHistoryContainerElements = document.querySelector(
    ".orderHistory-orders"
  );
  let html = "";

  data?.results?.forEach(({ id, total_price, order_item }) => {
    const item = `
        <li class="orderHistory-orders-order-container">
        <div class="orderHistory-orders-order">
          <div><span>Заказ ${id}</span><span data-i18n-key="orderHistoryPage__orderDone">Выполнен</span></div>
          <div class="orderHistory-orders-order__amount-container"><span data-i18n-key="orderHistoryPage__amount">Количество:</span><span>${
            order_item?.length
          }</span></div>
          <div><span data-i18n-key="orderHistoryPage__totalPrice">Цена:</span><span>€${Number(
            total_price
          ).toFixed()}</span></div>
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
          ${order_item.map(
            ({ amount, price, sum_item_price, time_to_use, image_name }) => {
              return `
              <li class="orderHistory-orders-order-details-list-item">
                <h3>${image_name.slice(0, -4)}</h3>
                <div>
                  <span data-i18n-key="orderHistoryPage__itemDuration">Срок действия покупки:</span>
                  <span>${time_to_use}</span>
                </div>
                <div>
                  <span data-i18n-key="orderHistoryPage__itemAmount">Количество:</span>
                  <span>${amount}</span>
                </div>
                <div>
                  <span data-i18n-key="orderHistoryPage__itemPrice">Цена</span>
                  <span>€${sum_item_price}</span>
                </div>
                <div>
                  <span data-i18n-key="orderHistoryPage__overallPrice">Общая цена</span>
                  <span>€${price}</span>
                </div>
              </li>
            `;
            }
          )}
          </ul>
        </div>
      </li>
    `;

    html += item;
  });

  ordersHistoryContainerElements.innerHTML = html;
};

export const renderShopItemsListHTML = (items) => {
  const productListContainerElements =
    document.querySelector(".products__list");

  let html = "";

  items?.results?.forEach(({ price, market_name, image_name, id, type }) => {
    const item = `
          <div class="products-card">
            ${renderShopItemImgHTML({
              shopItemName: image_name,
              shopItemType: type.toLowerCase(),
            })}
            <p class="products-card__title">
              ${market_name}
            </p>
            <div class="products-card__block">
                <p class="products-card__price">
                  €${Number(price).toFixed(2)}
                </p>
                <button class="products-card__buy" data-id=${id}></button>
            </div>
          </div>
      `;

    html += item;
  });

  productListContainerElements.innerHTML = html;
};
