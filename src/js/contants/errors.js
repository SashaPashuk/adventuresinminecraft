export const VALID_EMAIL_ERROR = "Enter a valid email address.";
export const USER_EXISTS_ERROR = "User with this email already exists.";

export const FIELD_NOT_EMPTY_ERROR = "This field may not be blank.";

export const VALID_PASSWORDS_ERROR = "Passwords do not match.";
export const PASSWORD_MIN_CHARACTERS_ERROR =
  "Ensure this field has at least 4 characters.";
export const PASSWORD_MAX_CHARACTERS_ERROR =
  "Ensure this field has no more than 24 characters.";

export const ACTIVE_CODE_INCORRECT =
  "No active account found with the given credentials";

export const EMAIL_CODE_MIN_CHARACTERS_ERROR =
  "Ensure this field has at least 6 characters.";
export const EMAIL_CODE_MAX_CHARACTERS_ERROR =
  "Ensure this field has no more than 6 characters.";

// USER
export const TOKEN_NOT_EXISTS = "Authentication credentials were not provided.";

// ITEM
export const ITEM_ADDED_TO_CART_ERROR = "Item already added to busket.";
export const ITEM_ADDED_TO_CART_SUCCESS = "Item has been added to basket.";
export const ITEM_DELETED_FROM_CART_SUCCESS =
  "Item has been removed from the basket.";

export const ITEM_AMOUNT_CAN_NOT_BE_CHANGED_ERROR = "Amount cannot be changed.";
export const ITEM_AMOUNT_CHANGED_SUCCESS = "Amount has been changed.";

export const ITEM_DURATION_SUCCESS = "Duration has been changed.";

export const errorsLanguageLocalizationsEnum = {
  USER_SHOULD_LOGIN_FIRST: "USER_SHOULD_LOGIN_FIRST",

  ITEM_ADDED_TO_CART_ERROR: "ITEM_ADDED_TO_CART_ERROR",
  ITEM_ADDED_TO_CART_SUCCESS: "ITEM_ADDED_TO_CART_SUCCESS",
  ITEM_ALREADY_ADDED_TO_CART_WITH_NAME: "ITEM_ALREADY_ADDED_TO_CART_WITH_NAME",
  ITEM_DELETED_FROM_CART_SUCCESS: "ITEM_DELETED_FROM_CART_SUCCESS",

  ITEM_AMOUNT_CAN_NOT_BE_CHANGED_ERROR: "ITEM_AMOUNT_CAN_NOT_BE_CHANGED_ERROR",
  ITEM_AMOUNT_CHANGED_SUCCESS: "ITEM_AMOUNT_CHANGED_SUCCESS",

  ITEM_DURATION_SUCCESS: "ITEM_DURATION_SUCCESS",
};

export const errorsLanguageLocalizations = {
  en: {
    // USER
    USER_SHOULD_LOGIN_FIRST: "You should login first.",
    // ITEM
    ITEM_ADDED_TO_CART_SUCCESS:
      "This item was successfully added to your cart.",
    ITEM_ADDED_TO_CART_ERROR: "Item already added to busket.",
    ITEM_ALREADY_ADDED_TO_CART_WITH_NAME: (name) =>
      `This item  ‹‹${name}›› has already been added to your cart.`,
    ITEM_DELETED_FROM_CART_SUCCESS: "Item has been removed from the basket.",

    ITEM_AMOUNT_CAN_NOT_BE_CHANGED_ERROR: "Amount cannot be changed.",
    ITEM_AMOUNT_CHANGED_SUCCESS: "Amount has been changed.",

    ITEM_DURATION_SUCCESS: "Duration has been changed.",
  },
  ru: {
    // USER
    USER_SHOULD_LOGIN_FIRST: "Сначала необходимо войти в систему.",
    // ITEM
    ITEM_ADDED_TO_CART_SUCCESS: "Предмет успешно добавлен в корзину.",
    ITEM_ADDED_TO_CART_ERROR: "Предмет уже добавлен в корзину.",
    ITEM_ALREADY_ADDED_TO_CART_WITH_NAME: (name) =>
      `Предмет ‹‹${name}›› уже добавлен в корзину.`,
    ITEM_DELETED_FROM_CART_SUCCESS: "Предмет успешно удален с корзины.",

    ITEM_AMOUNT_CAN_NOT_BE_CHANGED_ERROR: "Количество не может быть изменено.",
    ITEM_AMOUNT_CHANGED_SUCCESS: "Количество было изменено.",

    ITEM_DURATION_SUCCESS: "Продолжительность была изменена.",
  },
};
