const switchButtonDD = document.querySelectorAll(".switch__button");
const donationDescriptionSection = document.querySelectorAll(
  ".donation-description__section"
);

let lastSwitchButtonId = null;

switchButtonDD.forEach((button) => {
  button.addEventListener("click", () => {
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

window.addEventListener("DOMContentLoaded", () => {
  if (lastSwitchButtonId) {
    const lastSwitchButton = document.querySelector(
      `.switch__button[data-name="${lastSwitchButtonId}"]`
    );
    if (lastSwitchButton) {
      lastSwitchButton.classList.add("switch__button--active");
    }
  }
});

const faqButtons = document.querySelectorAll(".faq__button");
const faqBlocks = document.querySelectorAll(".faq__block");

faqButtons.forEach((button) => {
  button.addEventListener("click", () => {
    const blockId = button.getAttribute("data-name");
    const targetBlock = document.getElementById(blockId);

    if (targetBlock) {
      // hidden all blocks
      faqBlocks.forEach((block) => {
        block.classList.add("d-none");
      });

      // visible elect block
      targetBlock.classList.remove("d-none");

      // change the active button
      faqButtons.forEach((btn) => {
        btn.classList.remove("faq__button--active");
      });
      button.classList.add("faq__button--active");
    }
  });
});


const menuItems = document.querySelectorAll(".nav-link");

menuItems.forEach(function (item) {
  if (item.getAttribute("href") === window.location.pathname) {
    item.classList.add("active");
  }
});


const rulesButtons = document.querySelectorAll(".rules__nav-btn");
const rulesBlocks = document.querySelectorAll(".rules__block");

rulesButtons.forEach((button) => {
  button.addEventListener("click", () => {
    const blockId = button.getAttribute("data-name");
    const targetBlock = document.getElementById(blockId);

    if (targetBlock) {
      // hidden all blocks
      rulesBlocks.forEach((block) => {
        block.classList.add("d-none");
      });

      // visible elect block
      targetBlock.classList.remove("d-none");

      // change the active button
      rulesButtons.forEach((btn) => {
        btn.classList.remove("rules__nav-btn--active");
      });
      button.classList.add("rules__nav-btn--active");
    }
  });
});
