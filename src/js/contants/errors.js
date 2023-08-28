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
  uk: {
    // USER
    USER_SHOULD_LOGIN_FIRST: "Спочатку потрібно увійти в систему.",
    USER_EXISTS_ERROR:
      "Користувач з такою адресою електронної пошти уже існує.",
    USER_REGISTERED_SUCCESS: "Користувач успішно зареєстрований.",

    NO_ACTIVE_ORDER_ERROR: "Немає активного замовлення.",

    ACTIVE_CODE_INCORRECT:
      "Активний обліковий запис з вказаними обліковими даними не знайдено.",
    FIELD_NOT_EMPTY_ERROR: "Це поле не може бути порожнім.",

    USER_VALID_NICKNAME_ERROR: "Введіть дійсний псевдонім.",

    VALID_EMAIL_ERROR: "Введіть дійсну адресу електронної пошти.",
    WRONG_EMAIL_CODE_ERROR: "Неправильний код електронної пошти!",
    INCORRECT_OLD_PASSWORDS_ERROR: "Неправильний старий пароль.",
    PASSWORDS_NOT_MATCHED_ERROR: "Паролі не співпадають.",
    PASSWORD_CHANGED_SUCCESS: "Пароль успішно змінений.",
    EMAIL_CODE_MIN_CHARACTERS_ERROR:
      "Переконайтеся, що це поле містить принаймні 6 символів.",
    EMAIL_CODE_MAX_CHARACTERS_ERROR:
      "Переконайтеся, що це поле містить не більше 6 символів.",

    VALID_PASSWORDS_ERROR: "Паролі не співпадають.",
    PASSWORD_MIN_CHARACTERS_ERROR:
      "Переконайтеся, що це поле містить принаймні 4 символи.",
    PASSWORD_MAX_CHARACTERS_ERROR:
      "Переконайтеся, що це поле містить не більше 24 символів.",

    // ITEM
    ITEM_ADDED_TO_CART_SUCCESS: "Предмет успішно доданий до кошика.",
    ITEM_ADDED_TO_CART_ERROR: "Предмет вже додано до кошика.",
    ITEM_ADDED_TO_CART_CURRENCY_ERROR:
      "Неможливо додати товар до кошика з різними валютами. Спочатку видаліть наявну або змініть валюту.",
    ITEM_ALREADY_ADDED_TO_CART_WITH_NAME: (name) =>
      `Предмет ‹‹${name}›› вже додано до кошика.`,
    ITEM_ADDED_TO_CART_WITH_NAME_SUCCESS: (name) =>
      `Предмет ‹‹${name}›› успішно додано до кошика.`,
    ITEM_DELETED_FROM_CART_SUCCESS: "Предмет успішно видалено з кошика.",

    ITEM_AMOUNT_CAN_NOT_BE_CHANGED_ERROR: "Кількість не може бути змінена.",
    ITEM_AMOUNT_CAN_NOT_BE_BIGGER_THEN_ONE_ERROR:
      "Кількість не може бути більше одного.",
    ITEM_AMOUNT_CAN_NOT_BE_LESS_THEN_ONE_ERROR:
      "Кількість не може бути менше одного.",
    ITEM_AMOUNT_CHANGED_SUCCESS: "Кількість було змінено.",

    ITEM_DURATION_ERROR: "Тривалість не може бути змінена для даного предмета.",
    ITEM_DURATION_SUCCESS: "Тривалість була змінена.",
  },
  es: {
    NO_ACTIVE_ORDER_ERROR: "No hay una orden activa.",

    ACTIVE_CODE_INCORRECT:
      "No se encontró una cuenta activa con las credenciales proporcionadas.",
    FIELD_NOT_EMPTY_ERROR: "Este campo no puede estar vacío.",

    USER_VALID_NICKNAME_ERROR: "Ingresa un apodo válido.",

    VALID_EMAIL_ERROR: "Ingresa una dirección de correo electrónico válida.",
    WRONG_EMAIL_CODE_ERROR: "Código de correo electrónico incorrecto.",
    INCORRECT_OLD_PASSWORDS_ERROR: "Contraseñas antiguas incorrectas.",
    PASSWORDS_NOT_MATCHED_ERROR: "Las contraseñas no coinciden.",
    PASSWORD_CHANGED_SUCCESS: "Contraseña cambiada exitosamente.",
    EMAIL_CODE_MIN_CHARACTERS_ERROR:
      "Asegúrate de que este campo contenga al menos 6 caracteres.",
    EMAIL_CODE_MAX_CHARACTERS_ERROR:
      "Asegúrate de que este campo contenga como máximo 6 caracteres.",

    VALID_PASSWORDS_ERROR: "Las contraseñas no coinciden.",
    PASSWORD_MIN_CHARACTERS_ERROR:
      "Asegúrate de que este campo contenga al menos 4 caracteres.",
    PASSWORD_MAX_CHARACTERS_ERROR:
      "Asegúrate de que este campo contenga como máximo 24 caracteres.",

    // ITEM
    ITEM_ADDED_TO_CART_SUCCESS: "Elemento agregado al carrito exitosamente.",
    ITEM_ADDED_TO_CART_ERROR: "El elemento ya ha sido agregado al carrito.",
    ITEM_ADDED_TO_CART_CURRENCY_ERROR:
      "No se puede agregar un elemento al carrito con diferentes monedas. Primero elimine los existentes o cambie la moneda.",
    ITEM_ALREADY_ADDED_TO_CART_WITH_NAME: (name) =>
      `El elemento ‹‹${name}›› ya ha sido agregado al carrito.`,
    ITEM_ADDED_TO_CART_WITH_NAME_SUCCESS: (name) =>
      `El elemento ‹‹${name}›› ha sido agregado al carrito exitosamente.`,
    ITEM_DELETED_FROM_CART_SUCCESS:
      "Elemento eliminado del carrito exitosamente.",

    ITEM_AMOUNT_CAN_NOT_BE_CHANGED_ERROR:
      "La cantidad no puede ser modificada.",
    ITEM_AMOUNT_CAN_NOT_BE_BIGGER_THEN_ONE_ERROR:
      "La cantidad no puede ser mayor a uno.",
    ITEM_AMOUNT_CAN_NOT_BE_LESS_THEN_ONE_ERROR:
      "La cantidad no puede ser menor a uno.",
    ITEM_AMOUNT_CHANGED_SUCCESS: "La cantidad ha sido modificada.",

    ITEM_DURATION_ERROR:
      "La duración no puede ser modificada para este elemento.",
    ITEM_DURATION_SUCCESS: "La duración ha sido modificada.",
  },
  kz: {
    USER_SHOULD_LOGIN_FIRST: "Бірінші рет жүйеге кіріңіз.",
    USER_EXISTS_ERROR:
      "Мұндай электрондық пошта мекенжайы бар пайдаланушы әлде жасалды.",
    USER_REGISTERED_SUCCESS: "Пайдаланушы сәтті тіркелді.",
    NO_ACTIVE_ORDER_ERROR: "Жетістік жоқ.",
    ACTIVE_CODE_INCORRECT:
      "Көрсетілген кіру деректеріне ие активті есептік жазба табылмады.",
    FIELD_NOT_EMPTY_ERROR: "Бұл жол бос болмауы керек.",
    USER_VALID_NICKNAME_ERROR: "Дұрыс атау теріңіз.",
    VALID_EMAIL_ERROR: "Дұрыс электрондық пошта мекенжайын енгізіңіз.",
    WRONG_EMAIL_CODE_ERROR: "Қате электрондық пошта коды!",
    INCORRECT_OLD_PASSWORDS_ERROR: "Қате ескі құпия сөз.",
    PASSWORDS_NOT_MATCHED_ERROR: "Құпия сөздер сәйкес келмейді.",
    PASSWORD_CHANGED_SUCCESS: "Құпия сөз сәтті түзетілді.",
    EMAIL_CODE_MIN_CHARACTERS_ERROR: "Бұл жолда ен аз 6 таңба болуы керек.",
    EMAIL_CODE_MAX_CHARACTERS_ERROR:
      "Бұл жолда ен артық 6 таңба болмауы керек.",
    VALID_PASSWORDS_ERROR: "Құпия сөздер сәйкес келмейді.",
    PASSWORD_MIN_CHARACTERS_ERROR: "Бұл жолда ен аз 4 таңба болуы керек.",
    PASSWORD_MAX_CHARACTERS_ERROR: "Бұл жолда ен артық 24 таңба болмауы керек.",
    ITEM_ADDED_TO_CART_SUCCESS: "Элемент сәтті себетке қосылды.",
    ITEM_ADDED_TO_CART_ERROR: "Элемент уже себетке қосылды.",
    ITEM_ADDED_TO_CART_CURRENCY_ERROR:
      "Тапсырысқа різді валюта алу мүмкін емес. Алдымен сураныс бар немесе валютаны өзгертіңіз.",
    ITEM_ALREADY_ADDED_TO_CART_WITH_NAME: (name) =>
      `Элемент "${name}" бұрыннан себетке қосылды.`,
    ITEM_ADDED_TO_CART_WITH_NAME_SUCCESS: (name) =>
      `Элемент "${name}" сәтті себетке қосылды.`,
    ITEM_DELETED_FROM_CART_SUCCESS: "Элемент сәтті себеттен жойылды.",
    ITEM_AMOUNT_CAN_NOT_BE_CHANGED_ERROR: "Саны өзгертілу мүмкін емес.",
    ITEM_AMOUNT_CAN_NOT_BE_BIGGER_THEN_ONE_ERROR:
      "Сан бірден аспауы мүмкін емес.",
    ITEM_AMOUNT_CAN_NOT_BE_LESS_THEN_ONE_ERROR:
      "Сан бірнен кем болмауы мүмкін емес.",
    ITEM_AMOUNT_CHANGED_SUCCESS: "Сан өзгертілді.",
    ITEM_DURATION_ERROR: "Мерзімділік осы элементте өзгертіле алмайды.",
    ITEM_DURATION_SUCCESS: "Мерзімділік өзгертілді.",
  },
  pl: {
    NO_ACTIVE_ORDER_ERROR: "Nie ma aktywnego zamówienia.",

    ACTIVE_CODE_INCORRECT:
      "Nie znaleziono aktywnego konta o podanych danych uwierzytelniających.",
    FIELD_NOT_EMPTY_ERROR: "To pole nie może być puste.",

    USER_VALID_NICKNAME_ERROR: "Podaj poprawny pseudonim.",

    VALID_EMAIL_ERROR: "Podaj poprawny adres e-mail.",
    WRONG_EMAIL_CODE_ERROR: "Błędny kod e-mail!",
    INCORRECT_OLD_PASSWORDS_ERROR: "Nieprawidłowe stare hasło.",
    PASSWORDS_NOT_MATCHED_ERROR: "Hasła nie pasują do siebie.",
    PASSWORD_CHANGED_SUCCESS: "Hasło zostało pomyślnie zmienione.",
    EMAIL_CODE_MIN_CHARACTERS_ERROR:
      "Upewnij się, że to pole ma co najmniej 6 znaków.",
    EMAIL_CODE_MAX_CHARACTERS_ERROR:
      "Upewnij się, że to pole nie ma więcej niż 6 znaków.",

    VALID_PASSWORDS_ERROR: "Hasła nie pasują do siebie.",
    PASSWORD_MIN_CHARACTERS_ERROR:
      "Upewnij się, że to pole ma co najmniej 4 znaki.",
    PASSWORD_MAX_CHARACTERS_ERROR:
      "Upewnij się, że to pole nie ma więcej niż 24 znaki.",

    // ITEM
    ITEM_ADDED_TO_CART_SUCCESS:
      "Ten przedmiot został pomyślnie dodany do koszyka.",
    ITEM_ADDED_TO_CART_ERROR: "Przedmiot już dodany do koszyka.",
    ITEM_ADDED_TO_CART_CURRENCY_ERROR:
      "Nie można dodać przedmiotu o różnych walutach do koszyka. Najpierw usuń istniejący przedmiot lub zmień walutę.",
    ITEM_ALREADY_ADDED_TO_CART_WITH_NAME: (name) =>
      `Ten przedmiot ‹‹${name}›› został już dodany do koszyka.`,
    ITEM_ADDED_TO_CART_WITH_NAME_SUCCESS: (name) =>
      `Ten przedmiot ‹‹${name}›› został pomyślnie dodany do koszyka.`,
    ITEM_DELETED_FROM_CART_SUCCESS: "Przedmiot został usunięty z koszyka.",

    ITEM_AMOUNT_CAN_NOT_BE_CHANGED_ERROR: "Nie można zmienić ilości.",
    ITEM_AMOUNT_CAN_NOT_BE_BIGGER_THEN_ONE_ERROR:
      "Ilość nie może być większa niż jeden.",
    ITEM_AMOUNT_CAN_NOT_BE_LESS_THEN_ONE_ERROR:
      "Ilość nie może być mniejsza niż jeden.",
    ITEM_AMOUNT_CHANGED_SUCCESS: "Ilość została zmieniona.",

    ITEM_DURATION_ERROR:
      "Czas trwania nie może być zmieniony dla tego przedmiotu.",
    ITEM_DURATION_SUCCESS: "Czas trwania został zmieniony.",
  },
  tr: {
    NO_ACTIVE_ORDER_ERROR: "Aktif bir sipariş bulunmamaktadır.",

    ACTIVE_CODE_INCORRECT:
      "Verilen kimlik doğrulama bilgilerine sahip aktif bir hesap bulunamadı.",
    FIELD_NOT_EMPTY_ERROR: "Bu alan boş olamaz.",

    USER_VALID_NICKNAME_ERROR: "Geçerli bir takma ad girin.",

    VALID_EMAIL_ERROR: "Geçerli bir e-posta adresi girin.",
    WRONG_EMAIL_CODE_ERROR: "Yanlış e-posta kodu!",
    INCORRECT_OLD_PASSWORDS_ERROR: "Hatalı eski şifreler.",
    PASSWORDS_NOT_MATCHED_ERROR: "Şifreler eşleşmiyor.",
    PASSWORD_CHANGED_SUCCESS: "Şifre başarıyla değiştirildi.",
    EMAIL_CODE_MIN_CHARACTERS_ERROR:
      "Bu alanın en az 6 karakter içermesinden emin olun.",
    EMAIL_CODE_MAX_CHARACTERS_ERROR:
      "Bu alanın en fazla 6 karakter içermemesinden emin olun.",

    VALID_PASSWORDS_ERROR: "Şifreler eşleşmiyor.",
    PASSWORD_MIN_CHARACTERS_ERROR:
      "Bu alanın en az 4 karakter içermesinden emin olun.",
    PASSWORD_MAX_CHARACTERS_ERROR:
      "Bu alanın en fazla 24 karakter içermemesinden emin olun.",

    // ITEM
    ITEM_ADDED_TO_CART_SUCCESS: "Bu öğe başarıyla sepete eklendi.",
    ITEM_ADDED_TO_CART_ERROR: "Öğe zaten sepete eklendi.",
    ITEM_ADDED_TO_CART_CURRENCY_ERROR:
      "Farklı para birimlerine sahip bir öğe sepete eklenemez. Önce mevcut öğeyi kaldırın veya para birimini değiştirin.",
    ITEM_ALREADY_ADDED_TO_CART_WITH_NAME: (name) =>
      `Bu öğe ‹‹${name}›› zaten sepete eklendi.`,
    ITEM_ADDED_TO_CART_WITH_NAME_SUCCESS: (name) =>
      `Bu öğe ‹‹${name}›› başarıyla sepete eklendi.`,
    ITEM_DELETED_FROM_CART_SUCCESS: "Öğe sepetten silindi.",

    ITEM_AMOUNT_CAN_NOT_BE_CHANGED_ERROR: "Miktar değiştirilemez.",
    ITEM_AMOUNT_CAN_NOT_BE_BIGGER_THEN_ONE_ERROR:
      "Miktar bir'den büyük olamaz.",
    ITEM_AMOUNT_CAN_NOT_BE_LESS_THEN_ONE_ERROR: "Miktar bir'den küçük olamaz.",
    ITEM_AMOUNT_CHANGED_SUCCESS: "Miktar değiştirildi.",

    ITEM_DURATION_ERROR: "Bu öğenin süresi değiştirilemez.",
    ITEM_DURATION_SUCCESS: "Süre başarıyla değiştirildi.",
  },
  fr: {
    NO_ACTIVE_ORDER_ERROR: "Aucune commande active n'est en cours.",
    ACTIVE_CODE_INCORRECT:
      "Aucun compte actif avec les informations d'identification fournies n'a été trouvé.",
    FIELD_NOT_EMPTY_ERROR: "Ce champ ne peut pas être vide.",
    USER_VALID_NICKNAME_ERROR: "Veuillez saisir un surnom valide.",
    VALID_EMAIL_ERROR: "Veuillez saisir une adresse e-mail valide.",
    WRONG_EMAIL_CODE_ERROR: "Code e-mail incorrect !",
    INCORRECT_OLD_PASSWORDS_ERROR: "Anciens mots de passe incorrects.",
    PASSWORDS_NOT_MATCHED_ERROR: "Les mots de passe ne correspondent pas.",
    PASSWORD_CHANGED_SUCCESS: "Mot de passe modifié avec succès.",
    EMAIL_CODE_MIN_CHARACTERS_ERROR:
      "Veuillez vous assurer que ce champ contient au moins 6 caractères.",
    EMAIL_CODE_MAX_CHARACTERS_ERROR:
      "Veuillez vous assurer que ce champ ne contient pas plus de 6 caractères.",
    VALID_PASSWORDS_ERROR: "Les mots de passe ne correspondent pas.",
    PASSWORD_MIN_CHARACTERS_ERROR:
      "Veuillez vous assurer que ce champ contient au moins 4 caractères.",
    PASSWORD_MAX_CHARACTERS_ERROR:
      "Veuillez vous assurer que ce champ ne contient pas plus de 24 caractères.",
    ITEM_ADDED_TO_CART_SUCCESS:
      "Cet article a été ajouté avec succès au panier.",
    ITEM_ADDED_TO_CART_ERROR: "L'article a déjà été ajouté au panier.",
    ITEM_ADDED_TO_CART_CURRENCY_ERROR:
      "Impossible d'ajouter un article avec une devise différente au panier. Veuillez d'abord supprimer l'article existant ou changer la devise.",
    ITEM_ALREADY_ADDED_TO_CART_WITH_NAME: (name) =>
      `Cet article, "${name}", a déjà été ajouté au panier.`,
    ITEM_ADDED_TO_CART_WITH_NAME_SUCCESS: (name) =>
      `Cet article, "${name}", a été ajouté avec succès au panier.`,
    ITEM_DELETED_FROM_CART_SUCCESS: "L'article a été supprimé du panier.",
    ITEM_AMOUNT_CAN_NOT_BE_CHANGED_ERROR:
      "La quantité ne peut pas être modifiée.",
    ITEM_AMOUNT_CAN_NOT_BE_BIGGER_THEN_ONE_ERROR:
      "La quantité ne peut pas être supérieure à un.",
    ITEM_AMOUNT_CAN_NOT_BE_LESS_THEN_ONE_ERROR:
      "La quantité ne peut pas être inférieure à un.",
    ITEM_AMOUNT_CHANGED_SUCCESS: "La quantité a été modifiée.",
    ITEM_DURATION_ERROR: "La durée de cet article ne peut pas être modifiée.",
    ITEM_DURATION_SUCCESS: "Durée modifiée avec succès.",
  },
};
