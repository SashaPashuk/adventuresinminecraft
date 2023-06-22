import { ContentLoadingEventObserever } from "./utils/observer.js";

document.addEventListener("DOMContentLoaded", async () => {
  const rulesButtons = document.querySelectorAll(".rules__nav-btn");
  const rulesBlocks = document.querySelectorAll(".rules__block");

  rulesButtons.forEach((button) => {
    button.addEventListener("click", () => {
      const blockId = button.getAttribute("data-name");
      const targetBlock = document.getElementById(blockId);

      if (targetBlock) {
        // Сховати всі блоки
        rulesBlocks.forEach((block) => {
          block.classList.add("d-none");
        });

        // Показати вибраний блок
        targetBlock.classList.remove("d-none");

        // Змінити активну кнопку
        rulesButtons.forEach((btn) => {
          btn.classList.remove("rules__nav-btn--active");
        });
        button.classList.add("rules__nav-btn--active");
      }
    });
  });

  ContentLoadingEventObserever.broadcast(true);
});
