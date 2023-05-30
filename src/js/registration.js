// import API from "./services/api.js";

const signupButtonElement = document.querySelector("#signup-button");

signupButtonElement?.addEventListener("click", (e) => {
  e.preventDefault();

  //   const result = API.signup({
  //     password: "12345lol-work",
  //     email: "andrii.ds.kor@gmail.com",
  //   });

  //   if (result) {
  //     window.history.pushState({}, "", "/home.html");
  //     window.location.reload();
  //   }
});
