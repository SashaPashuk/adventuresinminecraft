import API from "./services/api.js";
import {
  USER_EXISTS_ERROR,
  VALID_EMAIL_ERROR,
  FIELD_NOT_EMPTY_ERROR,
  VALID_PASSWORDS_ERROR,
  PASSWORD_MIN_CHARACTERS_ERROR,
  PASSWORD_MAX_CHARACTERS_ERROR,
  errorsLanguageLocalizationsEnum,
} from "./contants/errors.js";
import { getLocalizedError } from "./services/errorsLanguageLocalization.js";

const signupButtonElement = document.querySelector("#signup-button");
const signupFormElement = document.querySelector("#signup-form");

signupButtonElement?.addEventListener("click", (e) => {
  e.preventDefault();
  // clean form from errors
  cleanFormFromErrors(signupFormElement);

  const formData = takeDataFromFormInputs(signupFormElement);

  // check if passwords are mathced
  if (formData.password !== formData.samePassword) {
    const labelForEmailError = signupFormElement?.querySelector(
      'label[for="password"]'
    );
    labelForEmailError.innerHTML = getLocalizedError(
      errorsLanguageLocalizationsEnum.VALID_PASSWORDS_ERROR
    );

    return;
  }

  const result = API.signup({
    email: formData.email,
    password: formData.password,
  });

  result.then((data) => {
    // errors showing
    const emailErrors = (data?.email && data?.email[0]) || "";
    const passwordErrors = (data?.password && data?.password[0]) || "";

    if ([USER_EXISTS_ERROR, VALID_EMAIL_ERROR].includes(emailErrors)) {
      const labelForEmailError =
        signupFormElement?.querySelector('label[for="email"]');
      labelForEmailError.innerHTML =
        emailErrors === VALID_EMAIL_ERROR
          ? getLocalizedError(errorsLanguageLocalizationsEnum.VALID_EMAIL_ERROR)
          : getLocalizedError(
              errorsLanguageLocalizationsEnum.USER_EXISTS_ERROR
            );
    }

    if (
      [
        FIELD_NOT_EMPTY_ERROR,
        PASSWORD_MIN_CHARACTERS_ERROR,
        PASSWORD_MAX_CHARACTERS_ERROR,
      ].includes(passwordErrors)
    ) {
      const labelForEmailError = signupFormElement?.querySelector(
        'label[for="password"]'
      );
      labelForEmailError.innerHTML =
        passwordErrors === FIELD_NOT_EMPTY_ERROR
          ? getLocalizedError(
              errorsLanguageLocalizationsEnum.FIELD_NOT_EMPTY_ERROR
            )
          : passwordErrors === PASSWORD_MIN_CHARACTERS_ERROR
          ? getLocalizedError(
              errorsLanguageLocalizationsEnum.PASSWORD_MIN_CHARACTERS_ERROR
            )
          : getLocalizedError(
              errorsLanguageLocalizationsEnum.PASSWORD_MAX_CHARACTERS_ERROR
            );
    }

    // since we do not have errors, redirect user to login page
    if (data === "User successfully registered!") {
      const languageFromURL = window.location.pathname.includes("/ru/")
        ? "ru"
        : "en";

      window.location.href = `/${languageFromURL}/pages/login`;
      localStorage.setItem("register_success", true);
    }
  });
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

  labels.forEach((label) => (label.innerHTML = ""));
};
