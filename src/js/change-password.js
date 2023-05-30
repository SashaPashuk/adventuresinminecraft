const changePasswordButtonElement = document.querySelector(
  "#change-password-button"
);
const changePasswordFormButtonElement = document.querySelector(
  "#change-password-form-button"
);
const changePasswordFirstStepContainerElement = document.querySelector(
  ".changePassword-container-firstStep"
);
const changePasswordSecondStepContainerElement = document.querySelector(
  ".changePassword-container-secondStep"
);

changePasswordButtonElement?.addEventListener("click", () => {
  changePasswordFirstStepContainerElement.classList.add("container-hidden");
  changePasswordSecondStepContainerElement.classList.remove("container-hidden");
});

changePasswordFormButtonElement?.addEventListener("click", (e) => {
  e.preventDefault();
});
