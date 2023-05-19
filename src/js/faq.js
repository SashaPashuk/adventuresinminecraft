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
