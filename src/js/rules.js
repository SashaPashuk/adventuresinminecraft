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
