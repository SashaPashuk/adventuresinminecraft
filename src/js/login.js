import API from "./services/api.js";

import {
  FIELD_NOT_EMPTY_ERROR,
  ACTIVE_CODE_INCORRECT,
  EMAIL_CODE_MIN_CHARACTERS_ERROR,
  EMAIL_CODE_MAX_CHARACTERS_ERROR,
  errorsLanguageLocalizationsEnum,
  VALID_EMAIL_ERROR,
  PASSWORD_MIN_CHARACTERS_ERROR,
  PASSWORD_MAX_CHARACTERS_ERROR,
  WRONG_EMAIL_CODE_ERROR,
  PASSWORD_CHANGED_SUCCESS,
} from "./contants/errors.js";
import { ContentLoadingEventObserever } from "./utils/observer.js";
import { getLocalizedError } from "./services/errorsLanguageLocalization.js";
import { addToastNotification } from "./utils/helpers.js";
import { getLanguageFromURLWithoutEN } from "./utils/language.js";

const loginButtonElement = document.querySelector("#login-button");
const loginFormElement = document.querySelector("#login-form");
const loginFormContainerElement = document.querySelector(
  "#login-from-container"
);
const codeFormContainerElement = document.querySelector("#code-from-container");
const codeButtonElement = document.querySelector("#code-button");
const codeFormElement = document.querySelector("#code-form");

const forgotPasswordFormContainerElement = document.querySelector(
  "#email-code-forgot-password-from-container"
);
const forgotPasswordFormElement = document.querySelector("#forgot-password");
const forgotPasswordSubmitBtn = document.querySelector("#forgot-password-form");

const forgotPasswordChangeFormContainer = document.querySelector(
  "#forgot-password-change-from-container"
);
const forgotChangePasswordForm = document.querySelector(
  "#forgot-password-change-form"
);
const forgotChangePasswordSubmitBtn = document.querySelector(
  "#forgot-password-change-submit"
);

document.addEventListener("DOMContentLoaded", () => {
  const hasSuccessfulRegistration = localStorage.getItem("register_success");

  if (hasSuccessfulRegistration) {
    addToastNotification({
      message: getLocalizedError(
        errorsLanguageLocalizationsEnum.USER_REGISTERED_SUCCESS
      ),
    });
    localStorage.removeItem("register_success");
  }
});

loginButtonElement?.addEventListener("click", (e) => {
  e.preventDefault();
  // clean form from errors
  cleanFormFromErrors(loginFormElement);

  const formData = takeDataFromFormInputs(loginFormElement);

  const result = API.login({
    email_code: "string",
    username: formData.username,
    password: formData.password,
  });

  result.then((data) => {
    const usernameErrors = (data?.username && data?.username[0]) || "";
    const passwordErrors = (data?.password && data?.password[0]) || "";

    if ([FIELD_NOT_EMPTY_ERROR].includes(usernameErrors)) {
      const labelForEmailError = loginFormElement?.querySelector(
        'label[for="username"]'
      );
      labelForEmailError.innerHTML = getLocalizedError(
        errorsLanguageLocalizationsEnum.FIELD_NOT_EMPTY_ERROR
      );
    }

    if ([FIELD_NOT_EMPTY_ERROR].includes(passwordErrors)) {
      const labelForEmailError = loginFormElement?.querySelector(
        'label[for="password"]'
      );
      labelForEmailError.innerHTML = getLocalizedError(
        errorsLanguageLocalizationsEnum.FIELD_NOT_EMPTY_ERROR
      );
    }

    if (data?.detail === ACTIVE_CODE_INCORRECT) {
      const labelForEmailError = loginFormElement?.querySelector(
        'label[for="password"]'
      );

      labelForEmailError.innerHTML = getLocalizedError(
        errorsLanguageLocalizationsEnum.ACTIVE_CODE_INCORRECT
      );
    }

    // since we do not have errors, redirect user to email confirmation page or home page
    if (data?.detail === "Email code has been sent.") {
      localStorage.setItem("login", JSON.stringify(formData));
      codeFormContainerElement.classList.remove("hidden");
      loginFormContainerElement.classList.add("hidden");
    }

    if (data?.refresh && data?.access) {
      localStorage.removeItem("login");
      localStorage.setItem("username", formData.username);
      localStorage.setItem("tokens", JSON.stringify(data));

      window.location.href = window.location.pathname.includes("/ru/")
        ? "/ru"
        : "/";
    }
  });
});

codeButtonElement?.addEventListener("click", (e) => {
  e.preventDefault();
  // clean form from errors
  cleanFormFromErrors(codeFormElement);

  const loginData = localStorage.getItem("login");
  const formData = takeDataFromFormInputs(codeFormElement);

  const result = API.login({
    email_code: formData.code,
    ...JSON.parse(loginData),
  });

  result.then((data) => {
    const emailCodeErrors = (data?.email_code && data?.email_code[0]) || "";

    if (
      [
        FIELD_NOT_EMPTY_ERROR,
        EMAIL_CODE_MIN_CHARACTERS_ERROR,
        EMAIL_CODE_MAX_CHARACTERS_ERROR,
      ].includes(emailCodeErrors)
    ) {
      const codeForEmailError =
        codeFormElement?.querySelector('label[for="code"]');
      codeForEmailError.innerHTML =
        emailCodeErrors === FIELD_NOT_EMPTY_ERROR
          ? getLocalizedError(
              errorsLanguageLocalizationsEnum.FIELD_NOT_EMPTY_ERROR
            )
          : emailCodeErrors === EMAIL_CODE_MIN_CHARACTERS_ERROR
          ? getLocalizedError(
              errorsLanguageLocalizationsEnum.EMAIL_CODE_MIN_CHARACTERS_ERROR
            )
          : getLocalizedError(
              errorsLanguageLocalizationsEnum.EMAIL_CODE_MAX_CHARACTERS_ERROR
            );
    }

    if (data?.refresh && data?.access) {
      localStorage.removeItem("login");
      localStorage.setItem("username", JSON.parse(loginData).username);
      localStorage.setItem("tokens", JSON.stringify(data));
      window.location.href = "/";
    }
  });
});

// after clicking on Forgot password
forgotPasswordFormElement?.addEventListener("click", () => {
  loginFormContainerElement.classList.add("hidden");
  codeFormContainerElement.classList.add("hidden");
  forgotPasswordFormContainerElement.classList.remove("hidden");
});

// send code to certain email for password recovery
forgotPasswordSubmitBtn?.addEventListener("click", async (e) => {
  e.preventDefault();

  const response = await API.restorePasswordSendEmaliCodeRequest({
    email: document.querySelector('input[name="forgot-email"]').value,
  });

  const emailError = (response.email && response.email[0]) || "";

  if ([VALID_EMAIL_ERROR, FIELD_NOT_EMPTY_ERROR].includes(emailError)) {
    const labelForNicknameError = document?.querySelector(
      'label[for="forgot-email"]'
    );
    labelForNicknameError.innerHTML = getLocalizedError(
      FIELD_NOT_EMPTY_ERROR === emailError
        ? errorsLanguageLocalizationsEnum.FIELD_NOT_EMPTY_ERROR
        : errorsLanguageLocalizationsEnum.VALID_EMAIL_ERROR
    );
  }

  // since we do not have errors, redirect user to email confirmation page or home page
  if (response.includes("Email code has been sent.")) {
    localStorage.setItem(
      "restore_password",
      JSON.stringify({
        email: document.querySelector('input[name="forgot-email"]').value,
      })
    );
    forgotPasswordChangeFormContainer.classList.remove("hidden");
    forgotPasswordFormContainerElement.classList.add("hidden");
  }
});

// after receiving email code  we can set new password
forgotChangePasswordSubmitBtn?.addEventListener("click", async (e) => {
  e.preventDefault();

  cleanFormFromErrors(forgotChangePasswordForm);

  const formInputs = forgotChangePasswordForm.querySelectorAll("input");

  const response = await API.restorePasswordRequest({
    email: JSON.parse(localStorage.getItem("restore_password")).email,
    email_code: formInputs[0].value,
    new_password: formInputs[1].value,
  });

  // email_code errors
  const emailCodeError =
    (response.email_code && response?.email_code[0]) || response?.error || "";

  if (
    [
      FIELD_NOT_EMPTY_ERROR,
      EMAIL_CODE_MIN_CHARACTERS_ERROR,
      EMAIL_CODE_MAX_CHARACTERS_ERROR,
      WRONG_EMAIL_CODE_ERROR,
    ].includes(emailCodeError) ||
    (response?.length && response?.includes(WRONG_EMAIL_CODE_ERROR))
  ) {
    const codeForEmailError = document?.querySelector(
      'label[for="forgot-change-email-code"]'
    );

    codeForEmailError.innerHTML = response.includes(WRONG_EMAIL_CODE_ERROR)
      ? getLocalizedError(
          errorsLanguageLocalizationsEnum.WRONG_EMAIL_CODE_ERROR
        )
      : emailCodeError === FIELD_NOT_EMPTY_ERROR
      ? getLocalizedError(errorsLanguageLocalizationsEnum.FIELD_NOT_EMPTY_ERROR)
      : emailCodeError === EMAIL_CODE_MIN_CHARACTERS_ERROR
      ? getLocalizedError(
          errorsLanguageLocalizationsEnum.EMAIL_CODE_MIN_CHARACTERS_ERROR
        )
      : getLocalizedError(
          errorsLanguageLocalizationsEnum.EMAIL_CODE_MAX_CHARACTERS_ERROR
        );
  }

  // new_password errors
  const newPasswordError =
    (response.new_password && response?.new_password[0]) || "";

  if (
    [
      FIELD_NOT_EMPTY_ERROR,
      PASSWORD_MIN_CHARACTERS_ERROR,
      PASSWORD_MAX_CHARACTERS_ERROR,
    ].includes(newPasswordError)
  ) {
    const labelForEmailError = document?.querySelector(
      'label[for="forgot-change-password"]'
    );
    labelForEmailError.innerHTML =
      newPasswordError === FIELD_NOT_EMPTY_ERROR
        ? getLocalizedError(
            errorsLanguageLocalizationsEnum.FIELD_NOT_EMPTY_ERROR
          )
        : newPasswordError === PASSWORD_MIN_CHARACTERS_ERROR
        ? getLocalizedError(
            errorsLanguageLocalizationsEnum.PASSWORD_MIN_CHARACTERS_ERROR
          )
        : getLocalizedError(
            errorsLanguageLocalizationsEnum.PASSWORD_MAX_CHARACTERS_ERROR
          );
  }

  if (response?.message === PASSWORD_CHANGED_SUCCESS) {
    cleanFormFromErrors(document.querySelector("form"));

    addToastNotification({
      message: getLocalizedError(
        errorsLanguageLocalizationsEnum.PASSWORD_CHANGED_SUCCESS
      ),
    });

    window.location.href = `${getLanguageFromURLWithoutEN()}/pages/login`;
  }
});

document.addEventListener("DOMContentLoaded", () => {
  const loginData = localStorage.getItem("login");

  if (loginData) {
    loginFormContainerElement.classList.add("hidden");
    codeFormContainerElement.classList.remove("hidden");
  }

  ContentLoadingEventObserever.broadcast(true);
});

// helpers

const takeDataFromFormInputs = (form) => {
  const inputs = form?.querySelectorAll("input");

  const data = Array.from(inputs).reduce((acc, cur) => {
    return {
      ...acc,
      [cur.getAttribute("name")]: cur.value,
    };
  }, {});

  return data;
};

const cleanFormFromErrors = (form) => {
  const labels = form?.querySelectorAll("label");

  Array.from(labels)
    .slice(0, 2)
    .forEach((label) => (label.innerHTML = ""));
};
