import API from "./services/api";
const loginButtonElement = document.querySelector("#login-button");

loginButtonElement?.addEventListener("click", (e) => {
  e.preventDefault();

  const result = API.login();

  if (result) {
    window.history.pushState({}, "", "/home.html");
    window.location.reload();
  }
});
