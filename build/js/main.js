import API from"../js/services/api.js";import{DEFAULT_LANGUAGE}from"./contants/constants.js";import{setActiveLocale,setLocale}from"./services/languageLocalization.js";import{ContentLoadingEventObserever}from"./utils/observer.js";const menuItems=document.querySelectorAll(".nav-link"),navItemsForUserLogic=document.querySelectorAll(".nav-item-user-logic"),navItemForUserDropdownLogic=document.querySelector(".nav-item-user-dd-logic"),usernameElement=document.querySelector("#username"),dropdownElement=(menuItems.forEach(function(e){e.getAttribute("href")===window.location.pathname&&e.classList.add("active")}),document.addEventListener("DOMContentLoaded",async()=>{await new Promise(e=>setTimeout(()=>{e()},200));var e=window.location.pathname.includes("/ru/")?"ru":"en",t=("/"===window.location.pathname&&(t=localStorage.getItem("language"),window.open(`/${t||DEFAULT_LANGUAGE}/home`,"_self")),setLocale(e),setActiveLocale(e),localStorage.getItem("tokens")),e=localStorage.getItem("username"),e=(t?(navItemForUserDropdownLogic?.classList.remove("hidden"),e&&usernameElement&&(usernameElement.innerHTML=e.slice(0,15)+"...",usernameElement.setAttribute("title",e))):navItemsForUserLogic?.forEach(e=>e.classList.remove("hidden")),ContentLoadingEventObserever.broadcast(!0),localStorage.getItem("orderItems")),o=await API.getShopOrderItems(),t=t?o:e&&JSON.parse(e)||[],o=document.querySelector(".cart-container-count");o&&(o.innerHTML=t.length||0),addLanguageSelectorEventListener(),addCookieEventListener()}),document.querySelector(".dropdown")),dropdownSelectionElement=document.querySelector(".dropdown-selection"),dropdownItems=document.querySelectorAll(".dropdown-container li a"),closeModalElement=(dropdownItems?.forEach(function(e){e.getAttribute("href")===window.location.pathname&&e.classList.add("active")}),dropdownSelectionElement?.addEventListener("click",()=>{dropdownElement.classList.toggle("dropdown-open")}),document.querySelector(".exitConfirmation-modal-container-close-icon")),closeSuccessPaymentModalElement=(closeModalElement?.addEventListener("click",()=>{window.history.back()}),document.querySelector(".successPayment-modal-container-close-icon")),logoutButtonElement=(closeSuccessPaymentModalElement?.addEventListener("click",()=>{window.history.back()}),document.querySelector("#logout-button")),addLanguageSelectorEventListener=(logoutButtonElement?.addEventListener("click",()=>{localStorage.removeItem("tokens")}),()=>{const c=document.querySelector(".custom-select");c&&(c.addEventListener("change",e=>{c.querySelector("select").classList.remove("active")}),c.addEventListener("mousedown",e=>{if(c.querySelector("select").classList.add("active"),420<=window.innerWidth){e.preventDefault();const o=c.children[0],n=document.createElement("ul");n.className="selector-options",[...o.children].forEach(t=>{var e=document.createElement("li");e.textContent=t.textContent,e.addEventListener("mousedown",e=>{o.value!==t.value&&(e.stopPropagation(),o.value=t.value,c.value=t.value,o.dispatchEvent(new Event("change")),c.dispatchEvent(new Event("change")),n.remove())}),n.appendChild(e)}),c.appendChild(n),document.addEventListener("click",e=>{c.contains(e.target)||(c.querySelector("select").classList.remove("active"),n.remove())})}}))}),addCookieEventListener=()=>{localStorage.getItem("hasAcceptedCookie")||document?.querySelector(".cookie_container")?.classList.remove("hidden"),document.querySelector("#cookieButton").addEventListener("click",()=>{localStorage.setItem("hasAcceptedCookie","true"),document?.querySelector(".cookie_container")?.classList.add("hidden")})};