import API from"./services/api.js";import{FIELD_NOT_EMPTY_ERROR,ACTIVE_CODE_INCORRECT,EMAIL_CODE_MIN_CHARACTERS_ERROR,EMAIL_CODE_MAX_CHARACTERS_ERROR,errorsLanguageLocalizationsEnum,VALID_EMAIL_ERROR,PASSWORD_MIN_CHARACTERS_ERROR,PASSWORD_MAX_CHARACTERS_ERROR,WRONG_EMAIL_CODE_ERROR,PASSWORD_CHANGED_SUCCESS}from"./contants/errors.js";import{ContentLoadingEventObserever}from"./utils/observer.js";import{getLocalizedError}from"./services/errorsLanguageLocalization.js";import{addToastNotification}from"./utils/helpers.js";const loginButtonElement=document.querySelector("#login-button"),loginFormElement=document.querySelector("#login-form"),loginFormContainerElement=document.querySelector("#login-from-container"),codeFormContainerElement=document.querySelector("#code-from-container"),codeButtonElement=document.querySelector("#code-button"),codeFormElement=document.querySelector("#code-form"),forgotPasswordFormContainerElement=document.querySelector("#email-code-forgot-password-from-container"),forgotPasswordFormElement=document.querySelector("#forgot-password"),forgotPasswordSubmitBtn=document.querySelector("#forgot-password-form"),forgotPasswordChangeFormContainer=document.querySelector("#forgot-password-change-from-container"),forgotChangePasswordForm=document.querySelector("#forgot-password-change-form"),forgotChangePasswordSubmitBtn=document.querySelector("#forgot-password-change-submit"),takeDataFromFormInputs=(document.addEventListener("DOMContentLoaded",()=>{localStorage.getItem("register_success")&&(addToastNotification({message:getLocalizedError(errorsLanguageLocalizationsEnum.USER_REGISTERED_SUCCESS)}),localStorage.removeItem("register_success"))}),loginButtonElement?.addEventListener("click",e=>{e.preventDefault(),cleanFormFromErrors(loginFormElement);const a=takeDataFromFormInputs(loginFormElement);API.login({email_code:"string",username:a.username,password:a.password}).then(e=>{var o=e?.username&&e?.username[0]||"",r=e?.password&&e?.password[0]||"";[FIELD_NOT_EMPTY_ERROR].includes(o)&&((loginFormElement?.querySelector('label[for="username"]')).innerHTML=getLocalizedError(errorsLanguageLocalizationsEnum.FIELD_NOT_EMPTY_ERROR)),[FIELD_NOT_EMPTY_ERROR].includes(r)&&((loginFormElement?.querySelector('label[for="password"]')).innerHTML=getLocalizedError(errorsLanguageLocalizationsEnum.FIELD_NOT_EMPTY_ERROR)),e?.detail===ACTIVE_CODE_INCORRECT&&((loginFormElement?.querySelector('label[for="password"]')).innerHTML=getLocalizedError(errorsLanguageLocalizationsEnum.ACTIVE_CODE_INCORRECT)),"Email code has been sent."===e?.detail&&(localStorage.setItem("login",JSON.stringify(a)),codeFormContainerElement.classList.remove("hidden"),loginFormContainerElement.classList.add("hidden")),e?.refresh&&e?.access&&(localStorage.removeItem("login"),localStorage.setItem("username",a.username),localStorage.setItem("tokens",JSON.stringify(e)),window.location.href=window.location.pathname.includes("/ru/")?"/ru":"/")})}),codeButtonElement?.addEventListener("click",e=>{e.preventDefault(),cleanFormFromErrors(codeFormElement);const r=localStorage.getItem("login");e=takeDataFromFormInputs(codeFormElement);API.login({email_code:e.code,...JSON.parse(r)}).then(e=>{var o=e?.email_code&&e?.email_code[0]||"";[FIELD_NOT_EMPTY_ERROR,EMAIL_CODE_MIN_CHARACTERS_ERROR,EMAIL_CODE_MAX_CHARACTERS_ERROR].includes(o)&&((codeFormElement?.querySelector('label[for="code"]')).innerHTML=getLocalizedError(o===FIELD_NOT_EMPTY_ERROR?errorsLanguageLocalizationsEnum.FIELD_NOT_EMPTY_ERROR:o===EMAIL_CODE_MIN_CHARACTERS_ERROR?errorsLanguageLocalizationsEnum.EMAIL_CODE_MIN_CHARACTERS_ERROR:errorsLanguageLocalizationsEnum.EMAIL_CODE_MAX_CHARACTERS_ERROR)),e?.refresh&&e?.access&&(localStorage.removeItem("login"),localStorage.setItem("username",JSON.parse(r).username),localStorage.setItem("tokens",JSON.stringify(e)),window.location.href="/")})}),forgotPasswordFormElement?.addEventListener("click",()=>{loginFormContainerElement.classList.add("hidden"),codeFormContainerElement.classList.add("hidden"),forgotPasswordFormContainerElement.classList.remove("hidden")}),forgotPasswordSubmitBtn?.addEventListener("click",async e=>{e.preventDefault();var e=await API.restorePasswordSendEmaliCodeRequest({email:document.querySelector('input[name="forgot-email"]').value}),o=e.email&&e.email[0]||"";[VALID_EMAIL_ERROR,FIELD_NOT_EMPTY_ERROR].includes(o)&&((document?.querySelector('label[for="forgot-email"]')).innerHTML=getLocalizedError(FIELD_NOT_EMPTY_ERROR===o?errorsLanguageLocalizationsEnum.FIELD_NOT_EMPTY_ERROR:errorsLanguageLocalizationsEnum.VALID_EMAIL_ERROR)),e.includes("Email code has been sent.")&&(localStorage.setItem("restore_password",JSON.stringify({email:document.querySelector('input[name="forgot-email"]').value})),forgotPasswordChangeFormContainer.classList.remove("hidden"),forgotPasswordFormContainerElement.classList.add("hidden"))}),forgotChangePasswordSubmitBtn?.addEventListener("click",async e=>{e.preventDefault(),cleanFormFromErrors(forgotChangePasswordForm);var e=forgotChangePasswordForm.querySelectorAll("input"),e=await API.restorePasswordRequest({email:JSON.parse(localStorage.getItem("restore_password")).email,email_code:e[0].value,new_password:e[1].value}),o=e.email_code&&e?.email_code[0]||e?.error||"",o=(([FIELD_NOT_EMPTY_ERROR,EMAIL_CODE_MIN_CHARACTERS_ERROR,EMAIL_CODE_MAX_CHARACTERS_ERROR,WRONG_EMAIL_CODE_ERROR].includes(o)||e?.length&&e?.includes(WRONG_EMAIL_CODE_ERROR))&&((document?.querySelector('label[for="forgot-change-email-code"]')).innerHTML=e.includes(WRONG_EMAIL_CODE_ERROR)?getLocalizedError(errorsLanguageLocalizationsEnum.WRONG_EMAIL_CODE_ERROR):getLocalizedError(o===FIELD_NOT_EMPTY_ERROR?errorsLanguageLocalizationsEnum.FIELD_NOT_EMPTY_ERROR:o===EMAIL_CODE_MIN_CHARACTERS_ERROR?errorsLanguageLocalizationsEnum.EMAIL_CODE_MIN_CHARACTERS_ERROR:errorsLanguageLocalizationsEnum.EMAIL_CODE_MAX_CHARACTERS_ERROR)),e.new_password&&e?.new_password[0]||"");[FIELD_NOT_EMPTY_ERROR,PASSWORD_MIN_CHARACTERS_ERROR,PASSWORD_MAX_CHARACTERS_ERROR].includes(o)&&((document?.querySelector('label[for="forgot-change-password"]')).innerHTML=getLocalizedError(o===FIELD_NOT_EMPTY_ERROR?errorsLanguageLocalizationsEnum.FIELD_NOT_EMPTY_ERROR:o===PASSWORD_MIN_CHARACTERS_ERROR?errorsLanguageLocalizationsEnum.PASSWORD_MIN_CHARACTERS_ERROR:errorsLanguageLocalizationsEnum.PASSWORD_MAX_CHARACTERS_ERROR)),e?.message===PASSWORD_CHANGED_SUCCESS&&(cleanFormFromErrors(document.querySelector("form")),addToastNotification({message:getLocalizedError(errorsLanguageLocalizationsEnum.PASSWORD_CHANGED_SUCCESS)}),o=window.location.pathname.includes("/ru/")?"ru":"",window.location.href=`/${o}/pages/login`)}),document.addEventListener("DOMContentLoaded",()=>{localStorage.getItem("login")&&(loginFormContainerElement.classList.add("hidden"),codeFormContainerElement.classList.remove("hidden")),ContentLoadingEventObserever.broadcast(!0)}),e=>{e=e?.querySelectorAll("input");return Array.from(e).reduce((e,o)=>({...e,[o.getAttribute("name")]:o.value}),{})}),cleanFormFromErrors=e=>{e=e?.querySelectorAll("label");Array.from(e).slice(0,2).forEach(e=>e.innerHTML="")};