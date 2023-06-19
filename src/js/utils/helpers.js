import {
  SHOP_ITEM_TIME_USAGE,
  SHOP_ITEM_TYPES,
} from "../contants/constants.js";
import { errorsLanguageLocalizationsEnum } from "../contants/errors.js";
import { getLocalizedError } from "../services/errorsLanguageLocalization.js";

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
  const closeBtn = document.createElement("img");
  closeBtn.className = "toast-container-closeBtn";
  closeBtn.setAttribute("src", "../assets/images/icons/cross_icon.svg");
  closeBtn.addEventListener("click", () => {
    toastContainer.remove();
  });

  messageParagraph.innerHTML = message;
  toastContainerInner.appendChild(messageParagraph);
  toastContainer.appendChild(toastContainerInner);
  toastContainer.appendChild(closeBtn);

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

function descriptionList(description, hasItemNumber = true) {
  if (!description?.includes("1.")) {
    return `<li>${description}</li>`;
  }

  const regex = /(\d+\.\s)/;

  const items = description.split(regex).filter((item) => item.trim() !== "");

  let formattedItems = [];
  for (let i = 0; i < items.length; i += 2) {
    formattedItems.push({
      number: items[i],
      text: items[i + 1].trim(),
    });
  }

  return formattedItems
    .map(({ number, text }) => `<li>${hasItemNumber ? number : ""}${text}</li>`)
    .join("");
}

export const renderShopItemInfoHTML = ({
  description,
  price,
  forever_price,
  market_name,
  image_name,
  type,
  time_to_use,
  is_one_time,
}) => {
  const productInfoContainerElement = document.querySelector(
    ".product-info__content"
  );

  const usagesContainerElement = `<div class="content__usage-actions-wrapper ${
    price && forever_price ? "" : "hidden-visibility"
  }">
    <span data-i18n-key="productPage__usage" class="price-block__title">
      Срок действия покупки:
    </span>
    <div class="content__usage-actions">
      <button
        data-i18n-key="productPage__usage_30"
        id="item-usage-days"
        data-type=${SHOP_ITEM_TIME_USAGE["30_DAYS"]}
        class=${
          time_to_use === SHOP_ITEM_TIME_USAGE["30_DAYS"]
            ? "button-primary selected"
            : ""
        } selected button-primary
      >
        "30 Дней"
      </button>
      <button
        data-i18n-key="productPage__usage_forever"
        id="item-usage-forever"
        data-type=${SHOP_ITEM_TIME_USAGE.Forever}
        class=${
          time_to_use === SHOP_ITEM_TIME_USAGE.Forever
            ? "button-primary selected"
            : "button-shade"
        }
      >
        Навсегда
      </button>
    </div>
  </div>`;

  const itemInfo = `
    <h2 class="content__title">${market_name}</h2>
    <h4 data-i18n-key="productPage__desc" class="content__subtitle">Описание товара:</h4>
    <ul class="product-description">
      ${descriptionList(description)}
    </ul>
    <div class="content__info">
      <div class="content__price-block price-block">
        <span data-i18n-key="productPage__price" class="price-block__title">Цeна:</span>
        <span class="price-block__price" id="product_price">€${
          Number(price) || Number(forever_price)
        }</span>
      </div>
      ${usagesContainerElement}
    </div>
    <div class="content__buy-block buy-block">
      <p data-i18n-key="productPage__amount" class="buy-block__quantity-title quantity-title ${
        is_one_time ? "hidden" : ""
      }">
        Количество:
      </p>
      <div class="buy-block__quantity-control quantity-control">
        <div class="quantity-control__number ${is_one_time ? "hidden" : ""}">
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
    ({
      product_id,
      id,
      amount,
      sum_item_price,
      time_to_use,
      image_name,
      market_name,
      is_one_time,
      price,
      forever_price,
    }) => {
      const item = `
        <li class="cartPage-list-item" data-cart-id=${product_id || id}>
          <h3>${market_name || image_name.slice(0, -4)}</h3>
          <div class="cartPage-list-item-actionContainer">
            <div 
              class="cartPage-list-item-amount ${is_one_time ? "disabled" : ""}"
              title="${getLocalizedError(
                errorsLanguageLocalizationsEnum.ITEM_AMOUNT_CAN_NOT_BE_CHANGED_ERROR
              )}"
            >
              <span data-i18n-key="cartPage__amount">Количество:</span>
              <div class="cartPage-list-item-amount-actions">
                <img src="../assets/images/icons/arrow_left.svg" alt="" class='cart-item-decrease-button' />
                <span class="cart-item-amount">${amount}</span>
                <img src="../assets/images/icons/arrow_right.svg" alt="" class='cart-item-increase-button' />
              </div>
            </div>
            <div 
              class="cartPage-list-item-usage ${
                price && forever_price ? "" : "disabled"
              }"
              title="${getLocalizedError(
                errorsLanguageLocalizationsEnum.ITEM_DURATION_ERROR
              )}"
            >
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
                  }"
                  >30 Дней</button>
                <button 
                  data-i18n-key="cartPage__usage_forever"
                  id="item-usage-forever" 
                  data-type=${SHOP_ITEM_TIME_USAGE.Forever} 
                  class="${
                    time_to_use === SHOP_ITEM_TIME_USAGE.Forever
                      ? "selected"
                      : ""
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
          <div>
            <div class="orderHistory-orders-orderId">
              <span data-i18n-key="orderHistoryPage__orderTitle">Заказ</span>
              <span>${id.slice(-5)}</span>
            </div>
            <span data-i18n-key="orderHistoryPage__orderDone">Выполнен</span>
          </div>
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
            ({
              amount,
              price,
              forever_price,
              sum_item_price,
              time_to_use,
              image_name,
            }) => {
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
                  <span>€${price || forever_price}</span>
                </div>
                <div>
                  <span data-i18n-key="orderHistoryPage__overallPrice">Общая цена</span>
                  <span>€${sum_item_price}</span>
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

  items?.results?.forEach(
    ({ price, market_name, image_name, id, type, forever_price }) => {
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
                  €${Number(price) || Number(forever_price)}
                </p>
                <button class="products-card__buy" data-id=${id}></button>
            </div>
          </div>
      `;

      html += item;
    }
  );

  productListContainerElements.innerHTML = html;
};

// Donation Description Page
export const renderDonationDescriptionColumnItemsHTML = (
  items,
  itemType = SHOP_ITEM_TYPES.Survival,
  prevSelectedShopItem
) => {
  if (!items?.results) return;

  const survivalColumn = document.querySelector("#survival_column");
  const anarchyColumn = document.querySelector("#anarchy_column");

  let html = "";

  items?.results.forEach((el, index) => {
    const hasAddActiveClass = prevSelectedShopItem
      ? prevSelectedShopItem.id === el.id
      : index === 0;

    const buttonHTML = `
          <button 
            class="donation-description__nav-btn ${
              hasAddActiveClass ? "donation-description__nav-btn--active" : ""
            } ${el.type}" 
            data-name="${el.type.toLowerCase()}_${el.market_name.toLowerCase()}"
          >${el.market_name}</button>`;

    html += buttonHTML;
  });

  itemType === SHOP_ITEM_TYPES.Survival
    ? (survivalColumn.innerHTML = html)
    : (anarchyColumn.innerHTML = html);
};

export const renderDonationDescriptionItemDescHTML = (
  item,
  itemType = SHOP_ITEM_TYPES.Survival
) => {
  const survivalDescription = document.querySelector("#survival_desc");
  const anarchyDescription = document.querySelector("#anarchy_desc");

  const descriptionListDonate = (description) => {
    if (!description?.includes("1.")) {
      return `<ul class="description-block__list"><li>${description}</li></ul>`;
    }

    const regex = /(\d+\.\s)/;

    const items = description.split(regex).filter((item) => item.trim() !== "");

    let formattedItems = [];
    for (let i = 0; i < items.length; i += 2) {
      formattedItems.push({
        number: items[i],
        text: items[i + 1].trim(),
      });
    }

    return formattedItems.length > 8
      ? `
        <ul class="description-block__list">
          ${formattedItems
            .slice(0, Math.round(formattedItems.length / 2))
            .map(({ text }) => `<li>${text}</li>`)
            .join("")}
        </ul>
        <ul class="description-block__list">
          ${formattedItems
            .slice(Math.round(formattedItems.length / 2), formattedItems.length)
            .map(({ text }) => `<li>${text}</li>`)
            .join("")}
        </ul>
      `
      : `<ul class="description-block__list">${formattedItems
          .map(({ text }) => `<li>${text}</li>`)
          .join("")}</ul>`;
  };

  const html = `
    <h4 class="description-block__title">${item.market_name}</h4>
    <div class="description-block__row">
      ${descriptionListDonate(item.description)}
    </div>
  `;

  itemType === SHOP_ITEM_TYPES.Survival
    ? (survivalDescription.innerHTML = html)
    : (anarchyDescription.innerHTML = html);
};

export const renderListingHTML = (mods) => {
  const container = document.querySelector("#mods-listing");

  let html = "";

  mods.forEach(({ name, url, imageName }) => {
    const item = `
      <div>
        ${
          imageName
            ? `<img src="../../assets/images/mods/${imageName}" alt="" />`
            : `<div class="lol"></div>`
        }
        <h3>${name}</h2>
        <a
          data-i18n-key="modsPage_button"
          class="button-primary"
          href="${url}"
          ></a
        >
      </div>
    `;

    html += item;
  });

  container.innerHTML = html;
};
