import API from "../js/services/api.js";
import {
  DEFAULT_LANGUAGE,
  SHOP_ITEM_SORT_PRICE_TYPES,
  SHOP_ITEM_TYPES,
} from "./contants/constants.js";
import {
  renderDonationDescriptionColumnItemsHTML,
  renderDonationDescriptionItemDescHTML,
} from "./utils/helpers.js";
import { LanguageEventObserever } from "./utils/observer.js";

const switchButtonDD = document.querySelectorAll(".switch__button");
const donationDescriptionSection = document.querySelectorAll(
  ".donation-description__section"
);

let lastSwitchButtonId = null;

switchButtonDD.forEach((button) => {
  button.addEventListener("click", async () => {
    const blockId = button.getAttribute("data-name");
    const targetBlock = document.getElementById(blockId);

    if (targetBlock) {
      donationDescriptionSection.forEach((block) => {
        block.classList.add("d-none");
      });

      targetBlock.classList.remove("d-none");

      switchButtonDD.forEach((btn) => {
        btn.classList.remove("switch__button--active");
      });
      button.classList.add("switch__button--active");

      if (
        button.getAttribute("data-name") ===
        SHOP_ITEM_TYPES.Anarchy.toLowerCase()
      ) {
        const lsLanguage = localStorage.getItem("language") || DEFAULT_LANGUAGE;
        const shopAnarchyItemsResult = await API.getShopItems(lsLanguage, {
          type: SHOP_ITEM_TYPES.Anarchy,
          sort_price: SHOP_ITEM_SORT_PRICE_TYPES.FROM_CHEAP_TO_EXPENSIVE,
        });

        renderDonationDescriptionColumnItemsHTML(
          shopAnarchyItemsResult,
          SHOP_ITEM_TYPES.Anarchy
        );
        renderDonationDescriptionItemDescHTML(
          shopAnarchyItemsResult?.results[0],
          SHOP_ITEM_TYPES.Anarchy
        );

        addColumnEventListeners(
          shopAnarchyItemsResult?.results || null,
          SHOP_ITEM_TYPES.Anarchy
        );
      } else {
        const lsLanguage = localStorage.getItem("language") || DEFAULT_LANGUAGE;
        const shopItemsResult = await API.getShopItems(lsLanguage, {
          type: SHOP_ITEM_TYPES.Survival,
          sort_price: SHOP_ITEM_SORT_PRICE_TYPES.FROM_CHEAP_TO_EXPENSIVE,
        });

        renderDonationDescriptionColumnItemsHTML(shopItemsResult);
        renderDonationDescriptionItemDescHTML(shopItemsResult?.results[0]);

        addColumnEventListeners(shopItemsResult?.results || null);
      }
      lastSwitchButtonId = blockId;
    }
  });
});

const donationDescriptionNavBtn = document.querySelectorAll(
  ".donation-description__nav-btn"
);
const donationDescriptionBlock = document.querySelectorAll(
  ".donation-description__block"
);

donationDescriptionNavBtn.forEach((button) => {
  button.addEventListener("click", () => {
    const blockId = button.getAttribute("data-name");
    const targetBlock = document.getElementById(blockId);

    if (targetBlock) {
      donationDescriptionBlock.forEach((block) => {
        block.classList.add("d-none");
      });

      targetBlock.classList.remove("d-none");

      donationDescriptionNavBtn.forEach((btn) => {
        btn.classList.remove("donation-description__nav-btn--active");
      });
      button.classList.add("donation-description__nav-btn--active");

      lastSwitchButtonId = null;
    }
  });
});

// Observers

LanguageEventObserever.subscribe(async (data) => {
  const selectedItemType = document.querySelector(".switch__button--active");

  if (
    selectedItemType.getAttribute("data-name") ===
    SHOP_ITEM_TYPES.Anarchy.toLowerCase()
  ) {
    const selectedShopItemType = document.querySelector(
      `.donation-description__nav-btn--active.${SHOP_ITEM_TYPES.Anarchy}`
    );
    const shopAnarchyItemsResult = await API.getShopItems(data.language, {
      type: SHOP_ITEM_TYPES.Anarchy,
      sort_price: SHOP_ITEM_SORT_PRICE_TYPES.FROM_CHEAP_TO_EXPENSIVE,
    });

    const prevSelectedShopItem =
      shopAnarchyItemsResult?.results?.find(
        (el) =>
          selectedShopItemType.getAttribute("data-name") ===
          `${el.type.toLowerCase()}_${el.market_name.toLowerCase()}`
      ) || shopAnarchyItemsResult?.results[0];

    renderDonationDescriptionColumnItemsHTML(
      shopAnarchyItemsResult,
      SHOP_ITEM_TYPES.Anarchy,
      prevSelectedShopItem
    );
    renderDonationDescriptionItemDescHTML(
      prevSelectedShopItem,
      SHOP_ITEM_TYPES.Anarchy
    );

    addColumnEventListeners(
      shopAnarchyItemsResult?.results || null,
      SHOP_ITEM_TYPES.Anarchy
    );
  } else {
    const shopItemsResult = await API.getShopItems(data.language, {
      type: SHOP_ITEM_TYPES.Survival,
      sort_price: SHOP_ITEM_SORT_PRICE_TYPES.FROM_CHEAP_TO_EXPENSIVE,
    });

    const selectedShopItemType = document.querySelector(
      `.donation-description__nav-btn--active.${SHOP_ITEM_TYPES.Survival}`
    );
    const prevSelectedShopItem =
      shopItemsResult?.results?.find(
        (el) =>
          selectedShopItemType.getAttribute("data-name") ===
          `${el.type.toLowerCase()}_${el.market_name.toLowerCase()}`
      ) || shopItemsResult?.results[0];

    renderDonationDescriptionColumnItemsHTML(
      shopItemsResult,
      SHOP_ITEM_TYPES.Survival,
      prevSelectedShopItem
    );
    renderDonationDescriptionItemDescHTML(prevSelectedShopItem);

    addColumnEventListeners(shopItemsResult?.results || null);
  }
});

// Event Listeners

window.addEventListener("DOMContentLoaded", async () => {
  const lsLanguage = localStorage.getItem("language") || DEFAULT_LANGUAGE;

  const shopItemsResult = await API.getShopItems(lsLanguage, {
    type: SHOP_ITEM_TYPES.Survival,
    sort_price: SHOP_ITEM_SORT_PRICE_TYPES.FROM_CHEAP_TO_EXPENSIVE,
  });

  renderDonationDescriptionColumnItemsHTML(shopItemsResult);
  renderDonationDescriptionItemDescHTML(shopItemsResult?.results[0]);

  addColumnEventListeners(shopItemsResult?.results || null);

  if (lastSwitchButtonId) {
    const lastSwitchButton = document.querySelector(
      `.switch__button[data-name="${lastSwitchButtonId}"]`
    );
    if (lastSwitchButton) {
      lastSwitchButton.classList.add("switch__button--active");
    }
  }
});

const addColumnEventListeners = (
  items,
  itemType = SHOP_ITEM_TYPES.Survival
) => {
  if (!items) return;

  const allAnarchy = document.querySelectorAll(
    `.donation-description__nav-btn.${SHOP_ITEM_TYPES.Anarchy}`
  );
  const allSurvival = document.querySelectorAll(
    `.donation-description__nav-btn.${SHOP_ITEM_TYPES.Survival}`
  );

  const all = itemType !== SHOP_ITEM_TYPES.Survival ? allAnarchy : allSurvival;

  all?.forEach((item, index) => {
    item?.addEventListener("click", (event) => {
      event.preventDefault();

      all?.forEach((itemForIteration) => {
        const shopItemName = itemForIteration.getAttribute("data-name");
        renderDonationDescriptionItemDescHTML(items[index], items[index].type);

        shopItemName === item.getAttribute("data-name")
          ? itemForIteration.classList.add(
              "donation-description__nav-btn--active"
            )
          : itemForIteration.classList.remove(
              "donation-description__nav-btn--active"
            );
      });
    });
  });
};
