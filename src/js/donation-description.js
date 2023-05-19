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
