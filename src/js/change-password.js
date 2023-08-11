import API from "../js/services/api.js";
import {
  FIELD_NOT_EMPTY_ERROR,
  INCORRECT_OLD_PASSWORDS_ERROR,
  PASSWORD_CHANGED_SUCCESS,
  errorsLanguageLocalizationsEnum,
} from "./contants/errors.js";
import { getLocalizedError } from "./services/errorsLanguageLocalization.js";
import { addToastNotification } from "./utils/helpers.js";

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

changePasswordFormButtonElement?.addEventListener("click", async (e) => {
  e.preventDefault();

  cleanFormFromErrors(document.querySelector("form"));

  const formInputs = document.querySelectorAll("form input");

  let newPassword = "";

  if (formInputs[1].value !== formInputs[2].value) {
    const labelForNicknameError = document?.querySelector(
      'label[for="repeat-password"]'
    );
    labelForNicknameError.innerHTML = getLocalizedError(
      errorsLanguageLocalizationsEnum.PASSWORDS_NOT_MATCHED_ERROR
    );

    return;
  } else {
    newPassword = formInputs[2].value;
  }

  const response = await API.changePasswordRequest({
    old_password: formInputs[0].value,
    new_password: newPassword,
  });

  // old_password errors
  const oldPasswordError =
    (response.old_password && response?.old_password[0]) ||
    response?.error ||
    "";

  if (
    [FIELD_NOT_EMPTY_ERROR, INCORRECT_OLD_PASSWORDS_ERROR].includes(
      oldPasswordError
    )
  ) {
    const labelForNicknameError = document?.querySelector(
      'label[for="old-password"]'
    );
    labelForNicknameError.innerHTML = getLocalizedError(
      FIELD_NOT_EMPTY_ERROR === oldPasswordError
        ? errorsLanguageLocalizationsEnum.FIELD_NOT_EMPTY_ERROR
        : errorsLanguageLocalizationsEnum.INCORRECT_OLD_PASSWORDS_ERROR
    );
  }

  // new_password errors
  const newPasswordError =
    (response.new_password && response?.new_password[0]) || "";

  if ([FIELD_NOT_EMPTY_ERROR].includes(newPasswordError)) {
    const labelForNicknameError = document?.querySelector(
      'label[for="new-password"]'
    );
    labelForNicknameError.innerHTML = getLocalizedError(
      errorsLanguageLocalizationsEnum.FIELD_NOT_EMPTY_ERROR
    );
  }

  if (response?.message === PASSWORD_CHANGED_SUCCESS) {
    cleanFormFromErrors(document.querySelector("form"));

    addToastNotification({
      message: getLocalizedError(
        errorsLanguageLocalizationsEnum.PASSWORD_CHANGED_SUCCESS
      ),
    });
  }
});

const cleanFormFromErrors = (form) => {
  const labels = form?.querySelectorAll("label");

  Array.from(labels).forEach((label) => (label.innerHTML = ""));
};
