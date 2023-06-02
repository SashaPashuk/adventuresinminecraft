import API from "./services/api.js";

import {
  FIELD_NOT_EMPTY_ERROR,
  ACTIVE_CODE_INCORRECT,
  EMAIL_CODE_MIN_CHARACTERS_ERROR,
  EMAIL_CODE_MAX_CHARACTERS_ERROR,
} from "./contants/errors.js";

const loginButtonElement = document.querySelector("#login-button");
const loginFormElement = document.querySelector("#login-form");
const loginFormContainerElement = document.querySelector(
  "#login-from-container"
);
const codeFormContainerElement = document.querySelector("#code-from-container");
const codeButtonElement = document.querySelector("#code-button");
const codeFormElement = document.querySelector("#code-form");

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
      labelForEmailError.innerHTML = data?.username[0];
    }

    if ([FIELD_NOT_EMPTY_ERROR].includes(passwordErrors)) {
      const labelForEmailError = loginFormElement?.querySelector(
        'label[for="password"]'
      );
      labelForEmailError.innerHTML = data?.password[0];
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
      window.location.href = "/home";
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
        EMAIL_CODE_MIN_CHARACTERS_ERROR,
        EMAIL_CODE_MAX_CHARACTERS_ERROR,
      ].includes(emailCodeErrors)
    ) {
      const codeForEmailError =
        codeFormElement?.querySelector('label[for="code"]');
      codeForEmailError.innerHTML = data?.["email_code"][0];
    }

    if (data?.refresh && data?.access) {
      localStorage.removeItem("login");
      localStorage.setItem("username", JSON.parse(loginData).username);
      localStorage.setItem("tokens", JSON.stringify(data));
      window.location.href = "/home";
    }
  });
});

document.addEventListener("DOMContentLoaded", () => {
  const loginData = localStorage.getItem("login");

  if (loginData) {
    loginFormContainerElement.classList.add("hidden");
    codeFormContainerElement.classList.remove("hidden");
  }
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