// USER
export const USER_EXISTS_ERROR = "User with this email already exists.";
export const USER_VALID_NICKNAME_ERROR = "Enter valid nickname.";
export const TOKEN_NOT_EXISTS = "Authentication credentials were not provided.";

export const NO_ACTIVE_ORDER_ERROR = "There is no active order";

export const ACTIVE_CODE_INCORRECT =
  "No active account found with the given credentials";
export const FIELD_NOT_EMPTY_ERROR = "This field may not be blank.";

export const VALID_EMAIL_ERROR = "Enter a valid email address.";
export const WRONG_EMAIL_CODE_ERROR = "Wrong email code!";
export const EMAIL_CODE_MIN_CHARACTERS_ERROR =
  "Ensure this field has at least 6 characters.";
export const EMAIL_CODE_MAX_CHARACTERS_ERROR =
  "Ensure this field has no more than 6 characters.";

export const VALID_PASSWORDS_ERROR = "Passwords do not match.";
export const INCORRECT_OLD_PASSWORDS_ERROR = "Incorrect old password.";
export const PASSWORDS_NOT_MATCHED_ERROR = "Password does not match.";
export const PASSWORD_CHANGED_SUCCESS = "Password changed successfully.";
export const PASSWORD_MIN_CHARACTERS_ERROR =
  "Ensure this field has at least 4 characters.";
export const PASSWORD_MAX_CHARACTERS_ERROR =
  "Ensure this field has no more than 24 characters.";

// ITEM
export const ITEM_ADDED_TO_CART_ERROR = "Item already added to busket.";
export const ITEM_ADDED_TO_CART_CURRENCY_ERROR =
  "Cannot add an item to the basket with different currencies. First, remove existing or change currency.";
export const ITEM_ADDED_TO_CART_SUCCESS = "Item has been added to basket.";
export const ITEM_DELETED_FROM_CART_SUCCESS =
  "Item has been removed from the basket.";

export const ITEM_AMOUNT_CAN_NOT_BE_CHANGED_ERROR = "Amount cannot be changed.";
export const ITEM_AMOUNT_CHANGED_SUCCESS = "Amount has been changed.";

export const ITEM_DURATION_SUCCESS = "Duration has been changed.";
export const ITEM_DURATION_SERVER_ERROR = '"Forever" is not a valid choice.';

export const errorsLanguageLocalizationsEnum = {
  USER_SHOULD_LOGIN_FIRST: "USER_SHOULD_LOGIN_FIRST",
  USER_EXISTS_ERROR: "USER_EXISTS_ERROR",
  USER_REGISTERED_SUCCESS: "USER_REGISTERED_SUCCESS",

  NO_ACTIVE_ORDER_ERROR: "NO_ACTIVE_ORDER_ERROR",

  ACTIVE_CODE_INCORRECT: "ACTIVE_CODE_INCORRECT",
  FIELD_NOT_EMPTY_ERROR: "FIELD_NOT_EMPTY_ERROR",

  USER_VALID_NICKNAME_ERROR: "USER_VALID_NICKNAME_ERROR",

  VALID_EMAIL_ERROR: "VALID_EMAIL_ERROR",
  WRONG_EMAIL_CODE_ERROR: "WRONG_EMAIL_CODE_ERROR",
  INCORRECT_OLD_PASSWORDS_ERROR: "INCORRECT_OLD_PASSWORDS_ERROR",
  PASSWORDS_NOT_MATCHED_ERROR: "PASSWORDS_NOT_MATCHED_ERROR",
  PASSWORD_CHANGED_SUCCESS: "PASSWORD_CHANGED_SUCCESS",
  EMAIL_CODE_MIN_CHARACTERS_ERROR: "EMAIL_CODE_MIN_CHARACTERS_ERROR",
  EMAIL_CODE_MAX_CHARACTERS_ERROR: "EMAIL_CODE_MAX_CHARACTERS_ERROR",

  VALID_PASSWORDS_ERROR: "VALID_PASSWORDS_ERROR",
  PASSWORD_MIN_CHARACTERS_ERROR: "PASSWORD_MIN_CHARACTERS_ERROR",
  PASSWORD_MAX_CHARACTERS_ERROR: "PASSWORD_MAX_CHARACTERS_ERROR",

  ITEM_ADDED_TO_CART_ERROR: "ITEM_ADDED_TO_CART_ERROR",
  ITEM_ADDED_TO_CART_CURRENCY_ERROR: "ITEM_ADDED_TO_CART_CURRENCY_ERROR",
  ITEM_ADDED_TO_CART_SUCCESS: "ITEM_ADDED_TO_CART_SUCCESS",
  ITEM_ADDED_TO_CART_WITH_NAME_SUCCESS: "ITEM_ADDED_TO_CART_WITH_NAME_SUCCESS",
  ITEM_ALREADY_ADDED_TO_CART_WITH_NAME: "ITEM_ALREADY_ADDED_TO_CART_WITH_NAME",
  ITEM_DELETED_FROM_CART_SUCCESS: "ITEM_DELETED_FROM_CART_SUCCESS",

  ITEM_AMOUNT_CAN_NOT_BE_CHANGED_ERROR: "ITEM_AMOUNT_CAN_NOT_BE_CHANGED_ERROR",
  ITEM_AMOUNT_CAN_NOT_BE_BIGGER_THEN_ONE_ERROR:
    "ITEM_AMOUNT_CAN_NOT_BE_BIGGER_THEN_ONE_ERROR",
  ITEM_AMOUNT_CAN_NOT_BE_LESS_THEN_ONE_ERROR:
    "ITEM_AMOUNT_CAN_NOT_BE_LESS_THEN_ONE_ERROR",
  ITEM_AMOUNT_CHANGED_SUCCESS: "ITEM_AMOUNT_CHANGED_SUCCESS",

  ITEM_DURATION_ERROR: "ITEM_DURATION_ERROR",
  ITEM_DURATION_SUCCESS: "ITEM_DURATION_SUCCESS",
};

export const errorsLanguageLocalizations = {
  en: {
    // USER
    USER_SHOULD_LOGIN_FIRST: "You should login first.",
    USER_EXISTS_ERROR: "User with this email already exists.",
    USER_REGISTERED_SUCCESS: "User successfully registered.",

    NO_ACTIVE_ORDER_ERROR: "There is no active order.",

    ACTIVE_CODE_INCORRECT:
      "No active account found with the given credentials.",
    FIELD_NOT_EMPTY_ERROR: "This field may not be blank.",

    USER_VALID_NICKNAME_ERROR: "Enter valid nickname.",

    VALID_EMAIL_ERROR: "Enter a valid email address.",
    WRONG_EMAIL_CODE_ERROR: "Wrong email code!",
    INCORRECT_OLD_PASSWORDS_ERROR: "Incorrect old password.",
    PASSWORDS_NOT_MATCHED_ERROR: "Password does not match.",
    PASSWORD_CHANGED_SUCCESS: "Password changed successfully.",
    EMAIL_CODE_MIN_CHARACTERS_ERROR:
      "Ensure this field has at least 6 characters.",
    EMAIL_CODE_MAX_CHARACTERS_ERROR:
      "Ensure this field has no more than 6 characters.",

    VALID_PASSWORDS_ERROR: "Passwords do not match.",
    PASSWORD_MIN_CHARACTERS_ERROR:
      "Ensure this field has at least 4 characters.",
    PASSWORD_MAX_CHARACTERS_ERROR:
      "Ensure this field has no more than 24 characters.",

    // ITEM
    ITEM_ADDED_TO_CART_SUCCESS:
      "This item was successfully added to your cart.",
    ITEM_ADDED_TO_CART_ERROR: "Item already added to busket.",
    ITEM_ADDED_TO_CART_CURRENCY_ERROR:
      "Cannot add an item to the basket with different currencies. First, remove existing or change currency.",
    ITEM_ALREADY_ADDED_TO_CART_WITH_NAME: (name) =>
      `This item  ‹‹${name}›› has already been added to your cart.`,
    ITEM_ADDED_TO_CART_WITH_NAME_SUCCESS: (name) =>
      `This item  ‹‹${name}›› was successfully added to your cart.`,
    ITEM_DELETED_FROM_CART_SUCCESS: "Item has been removed from the basket.",

    ITEM_AMOUNT_CAN_NOT_BE_CHANGED_ERROR: "Amount cannot be changed.",
    ITEM_AMOUNT_CAN_NOT_BE_BIGGER_THEN_ONE_ERROR:
      "Amount cannot be more then one.",
    ITEM_AMOUNT_CAN_NOT_BE_LESS_THEN_ONE_ERROR:
      "Amount cannot be less then one.",
    ITEM_AMOUNT_CHANGED_SUCCESS: "Amount has been changed.",

    ITEM_DURATION_ERROR: "Duration can not be changed for this item.",
    ITEM_DURATION_SUCCESS: "Duration has been changed.",
  },
  ru: {
    // USER
    USER_SHOULD_LOGIN_FIRST: "Сначала необходимо войти в систему.",
    USER_EXISTS_ERROR:
      "Пользователь с таким адресом электронной почты уже существует.",
    USER_REGISTERED_SUCCESS: "Пользователь успешно зарегистрирован.",

    NO_ACTIVE_ORDER_ERROR: "Нет активного заказа.",

    ACTIVE_CODE_INCORRECT:
      "Активная учетная запись с указанными учетными данными не найдена.",
    FIELD_NOT_EMPTY_ERROR: "Это поле не может быть пустым.",

    USER_VALID_NICKNAME_ERROR: "Введите действительный псевдоним.",

    VALID_EMAIL_ERROR: "Введите действительный адрес электронной почты.",
    WRONG_EMAIL_CODE_ERROR: "Неверный код электронной почты!",
    INCORRECT_OLD_PASSWORDS_ERROR: "Неверный старый пароль.",
    PASSWORDS_NOT_MATCHED_ERROR: "Пароли не совпадают.",
    PASSWORD_CHANGED_SUCCESS: "Пароль успешно изменен.",
    EMAIL_CODE_MIN_CHARACTERS_ERROR:
      "Убедитесь, что это поле содержит не менее 6 символов.",
    EMAIL_CODE_MAX_CHARACTERS_ERROR:
      "Убедитесь, что это поле содержит не более 6 символов.",

    VALID_PASSWORDS_ERROR: "Пароли не совпадают.",
    PASSWORD_MIN_CHARACTERS_ERROR:
      "Убедитесь, что это поле содержит не менее 4 символов.",
    PASSWORD_MAX_CHARACTERS_ERROR:
      "Убедитесь, что это поле содержит не более 24 символов.",

    // ITEM
    ITEM_ADDED_TO_CART_SUCCESS: "Предмет успешно добавлен в корзину.",
    ITEM_ADDED_TO_CART_ERROR: "Предмет уже добавлен в корзину.",
    ITEM_ADDED_TO_CART_CURRENCY_ERROR:
      "Неможливо додати товар до кошика з різними валютами. Спочатку видаліть наявну або змініть валюту.",
    ITEM_ALREADY_ADDED_TO_CART_WITH_NAME: (name) =>
      `Предмет ‹‹${name}›› уже добавлен в корзину.`,
    ITEM_ADDED_TO_CART_WITH_NAME_SUCCESS: (name) =>
      `Предмет ‹‹${name}›› успешно добавлен в корзину.`,
    ITEM_DELETED_FROM_CART_SUCCESS: "Предмет успешно удален с корзины.",

    ITEM_AMOUNT_CAN_NOT_BE_CHANGED_ERROR: "Количество не может быть изменено.",
    ITEM_AMOUNT_CAN_NOT_BE_BIGGER_THEN_ONE_ERROR:
      "Количество не может быть больше одного.",
    ITEM_AMOUNT_CAN_NOT_BE_LESS_THEN_ONE_ERROR:
      "Количество не может быть меньше одного.",
    ITEM_AMOUNT_CHANGED_SUCCESS: "Количество было изменено.",

    ITEM_DURATION_ERROR:
      "Продолжительность не может быть изменена для данного предмета.",
    ITEM_DURATION_SUCCESS: "Продолжительность была изменена.",
  },
};
