import{DEFAULT_LANGUAGE}from"../contants/constants.js";import{errorsLanguageLocalizations}from"../contants/errors.js";import{LanguageEventObserever}from"../utils/observer.js";let defaultLocale=localStorage.getItem("language")||DEFAULT_LANGUAGE;LanguageEventObserever.subscribe(e=>{defaultLocale=e.language});const getLocalizedError=(e,r)=>{e=errorsLanguageLocalizations[defaultLocale][e];return"function"==typeof e?e(r.firstParam):e};export{getLocalizedError};