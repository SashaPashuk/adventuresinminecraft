const switchButtonDD=document.querySelectorAll(".switch__button"),donationDescriptionSection=document.querySelectorAll(".donation-description__section");let lastSwitchButtonId=null;switchButtonDD.forEach(o=>{o.addEventListener("click",()=>{var t=o.getAttribute("data-name"),n=document.getElementById(t);n&&(donationDescriptionSection.forEach(t=>{t.classList.add("d-none")}),n.classList.remove("d-none"),switchButtonDD.forEach(t=>{t.classList.remove("switch__button--active")}),o.classList.add("switch__button--active"),lastSwitchButtonId=t)})});const donationDescriptionNavBtn=document.querySelectorAll(".donation-description__nav-btn"),donationDescriptionBlock=document.querySelectorAll(".donation-description__block");donationDescriptionNavBtn.forEach(n=>{n.addEventListener("click",()=>{var t=n.getAttribute("data-name"),t=document.getElementById(t);t&&(donationDescriptionBlock.forEach(t=>{t.classList.add("d-none")}),t.classList.remove("d-none"),donationDescriptionNavBtn.forEach(t=>{t.classList.remove("donation-description__nav-btn--active")}),n.classList.add("donation-description__nav-btn--active"),lastSwitchButtonId=null)})}),window.addEventListener("DOMContentLoaded",()=>{var t;lastSwitchButtonId&&(t=document.querySelector(`.switch__button[data-name="${lastSwitchButtonId}"]`))&&t.classList.add("switch__button--active")});