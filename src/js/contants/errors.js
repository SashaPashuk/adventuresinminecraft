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
  "Cannot add an item to the cart with different currencies. First, remove existing or change currency.";
export const ITEM_ADDED_TO_CART_SUCCESS = "Item has been added to cart.";
export const ITEM_DELETED_FROM_CART_SUCCESS =
  "Item has been removed from the cart.";

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
      "Cannot add an item to the cart with different currencies. First, remove existing or change currency.",
    ITEM_ALREADY_ADDED_TO_CART_WITH_NAME: (name) =>
      `This item  ‹‹${name}›› has already been added to your cart.`,
    ITEM_ADDED_TO_CART_WITH_NAME_SUCCESS: (name) =>
      `This item  ‹‹${name}›› was successfully added to your cart.`,
    ITEM_DELETED_FROM_CART_SUCCESS: "Item has been removed from the cart.",

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
  kk: {
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
  de: {
    NO_ACTIVE_ORDER_ERROR: "Es gibt keine aktive Bestellung.",
    ACTIVE_CODE_INCORRECT:
      "Es wurde kein aktives Konto mit den angegebenen Anmeldeinformationen gefunden.",
    FIELD_NOT_EMPTY_ERROR: "Dieses Feld darf nicht leer sein.",
    USER_VALID_NICKNAME_ERROR: "Bitte geben Sie einen gültigen Spitznamen ein.",
    VALID_EMAIL_ERROR: "Bitte geben Sie eine gültige E-Mail-Adresse ein.",
    WRONG_EMAIL_CODE_ERROR: "Falscher E-Mail-Code!",
    INCORRECT_OLD_PASSWORDS_ERROR: "Alte Passwörter sind falsch.",
    PASSWORDS_NOT_MATCHED_ERROR: "Die Passwörter stimmen nicht überein.",
    PASSWORD_CHANGED_SUCCESS: "Passwort erfolgreich geändert.",
    EMAIL_CODE_MIN_CHARACTERS_ERROR:
      "Bitte stellen Sie sicher, dass dieses Feld mindestens 6 Zeichen enthält.",
    EMAIL_CODE_MAX_CHARACTERS_ERROR:
      "Bitte stellen Sie sicher, dass dieses Feld nicht mehr als 6 Zeichen enthält.",
    VALID_PASSWORDS_ERROR: "Die Passwörter stimmen nicht überein.",
    PASSWORD_MIN_CHARACTERS_ERROR:
      "Bitte stellen Sie sicher, dass dieses Feld mindestens 4 Zeichen enthält.",
    PASSWORD_MAX_CHARACTERS_ERROR:
      "Bitte stellen Sie sicher, dass dieses Feld nicht mehr als 24 Zeichen enthält.",
    ITEM_ADDED_TO_CART_SUCCESS:
      "Dieser Artikel wurde erfolgreich zum Warenkorb hinzugefügt.",
    ITEM_ADDED_TO_CART_ERROR:
      "Der Artikel wurde bereits zum Warenkorb hinzugefügt.",
    ITEM_ADDED_TO_CART_CURRENCY_ERROR:
      "Ein Artikel mit einer anderen Währung kann nicht zum Warenkorb hinzugefügt werden. Bitte entfernen Sie zuerst den vorhandenen Artikel oder ändern Sie die Währung.",
    ITEM_ALREADY_ADDED_TO_CART_WITH_NAME: (name) =>
      `Dieser Artikel "${name}" wurde bereits zum Warenkorb hinzugefügt.`,
    ITEM_ADDED_TO_CART_WITH_NAME_SUCCESS: (name) =>
      `Dieser Artikel "${name}" wurde erfolgreich zum Warenkorb hinzugefügt.`,
    ITEM_DELETED_FROM_CART_SUCCESS:
      "Der Artikel wurde aus dem Warenkorb entfernt.",
    ITEM_AMOUNT_CAN_NOT_BE_CHANGED_ERROR:
      "Die Menge kann nicht geändert werden.",
    ITEM_AMOUNT_CAN_NOT_BE_BIGGER_THEN_ONE_ERROR:
      "Die Menge darf nicht größer als eins sein.",
    ITEM_AMOUNT_CAN_NOT_BE_LESS_THEN_ONE_ERROR:
      "Die Menge darf nicht kleiner als eins sein.",
    ITEM_AMOUNT_CHANGED_SUCCESS: "Die Menge wurde geändert.",
    ITEM_DURATION_ERROR:
      "Die Dauer dieses Artikels kann nicht geändert werden.",
    ITEM_DURATION_SUCCESS: "Dauer erfolgreich geändert.",
  },
  pt: {
    // USER
    USER_SHOULD_LOGIN_FIRST: "Você deve fazer login primeiro.",
    USER_EXISTS_ERROR: "Usuário com este email já existe.",
    USER_REGISTERED_SUCCESS: "Usuário registrado com sucesso.",

    NO_ACTIVE_ORDER_ERROR: "Não há pedido ativo.",
    ACTIVE_CODE_INCORRECT:
      "Nenhuma conta ativa encontrada com as credenciais fornecidas.",
    FIELD_NOT_EMPTY_ERROR: "Este campo não pode estar vazio.",

    USER_VALID_NICKNAME_ERROR: "Digite um apelido válido.",

    VALID_EMAIL_ERROR: "Digite um endereço de email válido.",
    WRONG_EMAIL_CODE_ERROR: "Código de email incorreto!",
    INCORRECT_OLD_PASSWORDS_ERROR: "Senha antiga incorreta.",
    PASSWORDS_NOT_MATCHED_ERROR: "A senha não corresponde.",
    PASSWORD_CHANGED_SUCCESS: "Senha alterada com sucesso.",
    EMAIL_CODE_MIN_CHARACTERS_ERROR:
      "Verifique se este campo tem pelo menos 6 caracteres.",
    EMAIL_CODE_MAX_CHARACTERS_ERROR:
      "Verifique se este campo não tem mais que 6 caracteres.",

    VALID_PASSWORDS_ERROR: "As senhas não correspondem.",
    PASSWORD_MIN_CHARACTERS_ERROR:
      "Verifique se este campo tem pelo menos 4 caracteres.",
    PASSWORD_MAX_CHARACTERS_ERROR:
      "Verifique se este campo não tem mais que 24 caracteres.",

    // ITEM
    ITEM_ADDED_TO_CART_SUCCESS:
      "Este item foi adicionado com sucesso ao seu carrinho.",
    ITEM_ADDED_TO_CART_ERROR: "Item já adicionado ao carrinho.",
    ITEM_ADDED_TO_CART_CURRENCY_ERROR:
      "Não é possível adicionar um item ao carrinho com moedas diferentes. Primeiro, remova o item existente ou mude a moeda.",
    ITEM_ALREADY_ADDED_TO_CART_WITH_NAME: (name) =>
      `Este item ‹‹${name}›› já foi adicionado ao seu carrinho.`,
    ITEM_ADDED_TO_CART_WITH_NAME_SUCCESS: (name) =>
      `Este item ‹‹${name}›› foi adicionado com sucesso ao seu carrinho.`,
    ITEM_DELETED_FROM_CART_SUCCESS: "O item foi removido do carrinho.",

    ITEM_AMOUNT_CAN_NOT_BE_CHANGED_ERROR: "A quantidade não pode ser alterada.",
    ITEM_AMOUNT_CAN_NOT_BE_BIGGER_THEN_ONE_ERROR:
      "A quantidade não pode ser maior que um.",
    ITEM_AMOUNT_CAN_NOT_BE_LESS_THEN_ONE_ERROR:
      "A quantidade não pode ser menor que um.",
    ITEM_AMOUNT_CHANGED_SUCCESS: "A quantidade foi alterada.",

    ITEM_DURATION_ERROR: "A duração deste item não pode ser alterada.",
    ITEM_DURATION_SUCCESS: "Duração alterada com sucesso.",
  },
  it: {
    // USER
    USER_SHOULD_LOGIN_FIRST: "Devi effettuare il login prima.",
    USER_EXISTS_ERROR: "Utente con questa email già esistente.",
    USER_REGISTERED_SUCCESS: "Utente registrato con successo.",

    NO_ACTIVE_ORDER_ERROR: "Non ci sono ordini attivi.",

    ACTIVE_CODE_INCORRECT:
      "Nessun account attivo trovato con le credenziali fornite.",
    FIELD_NOT_EMPTY_ERROR: "Questo campo non può essere vuoto.",

    USER_VALID_NICKNAME_ERROR: "Inserisci un nickname valido.",

    VALID_EMAIL_ERROR: "Inserisci un indirizzo email valido.",
    WRONG_EMAIL_CODE_ERROR: "Codice email errato!",
    INCORRECT_OLD_PASSWORDS_ERROR: "Vecchia password non corretta.",
    PASSWORDS_NOT_MATCHED_ERROR: "Le password non corrispondono.",
    PASSWORD_CHANGED_SUCCESS: "Password cambiata con successo.",
    EMAIL_CODE_MIN_CHARACTERS_ERROR:
      "Assicurati che questo campo abbia almeno 6 caratteri.",
    EMAIL_CODE_MAX_CHARACTERS_ERROR:
      "Assicurati che questo campo non abbia più di 6 caratteri.",

    VALID_PASSWORDS_ERROR: "Le password non corrispondono.",
    PASSWORD_MIN_CHARACTERS_ERROR:
      "Assicurati che questo campo abbia almeno 4 caratteri.",
    PASSWORD_MAX_CHARACTERS_ERROR:
      "Assicurati che questo campo non abbia più di 24 caratteri.",

    // ITEM
    ITEM_ADDED_TO_CART_SUCCESS:
      "Questo articolo è stato aggiunto al carrello con successo.",
    ITEM_ADDED_TO_CART_ERROR: "Articolo già aggiunto al carrello.",
    ITEM_ADDED_TO_CART_CURRENCY_ERROR:
      "Non è possibile aggiungere un articolo al carrello con valute diverse. Rimuovi prima gli articoli esistenti o cambia la valuta.",
    ITEM_ALREADY_ADDED_TO_CART_WITH_NAME: (name) =>
      `Questo articolo ‹‹${name}›› è già stato aggiunto al carrello.`,
    ITEM_ADDED_TO_CART_WITH_NAME_SUCCESS: (name) =>
      `Questo articolo ‹‹${name}›› è stato aggiunto al carrello con successo.`,
    ITEM_DELETED_FROM_CART_SUCCESS: "L'articolo è stato rimosso dal carrello.",

    ITEM_AMOUNT_CAN_NOT_BE_CHANGED_ERROR: "Impossibile modificare la quantità.",
    ITEM_AMOUNT_CAN_NOT_BE_BIGGER_THEN_ONE_ERROR:
      "La quantità non può essere superiore a uno.",
    ITEM_AMOUNT_CAN_NOT_BE_LESS_THEN_ONE_ERROR:
      "La quantità non può essere inferiore a uno.",
    ITEM_AMOUNT_CHANGED_SUCCESS: "La quantità è stata modificata.",

    ITEM_DURATION_ERROR:
      "La durata non può essere modificata per questo articolo.",
    ITEM_DURATION_SUCCESS: "La durata è stata modificata.",
  },
  ja: {
    // USER
    USER_SHOULD_LOGIN_FIRST: "最初にログインしてください。",
    USER_EXISTS_ERROR: "このメールアドレスのユーザーは既に存在しています。",
    USER_REGISTERED_SUCCESS: "ユーザーが正常に登録されました。",
    NO_ACTIVE_ORDER_ERROR: "アクティブな注文はありません。",

    ACTIVE_CODE_INCORRECT:
      "指定された認証情報でアクティブなアカウントが見つかりません。",
    FIELD_NOT_EMPTY_ERROR: "このフィールドは空白にできません。",

    USER_VALID_NICKNAME_ERROR: "有効なニックネームを入力してください。",

    VALID_EMAIL_ERROR: "有効なメールアドレスを入力してください。",
    WRONG_EMAIL_CODE_ERROR: "間違ったメールコードです！",
    INCORRECT_OLD_PASSWORDS_ERROR: "古いパスワードが間違っています。",
    PASSWORDS_NOT_MATCHED_ERROR: "パスワードが一致しません。",
    PASSWORD_CHANGED_SUCCESS: "パスワードが正常に変更されました。",
    EMAIL_CODE_MIN_CHARACTERS_ERROR:
      "このフィールドには少なくとも6文字を入力してください。",
    EMAIL_CODE_MAX_CHARACTERS_ERROR:
      "このフィールドには最大6文字を入力してください。",

    VALID_PASSWORDS_ERROR: "パスワードが一致しません。",
    PASSWORD_MIN_CHARACTERS_ERROR:
      "このフィールドには少なくとも4文字を入力してください。",
    PASSWORD_MAX_CHARACTERS_ERROR:
      "このフィールドには最大24文字を入力してください。",

    // ITEM
    ITEM_ADDED_TO_CART_SUCCESS: "このアイテムはカートに正常に追加されました。",
    ITEM_ADDED_TO_CART_ERROR: "アイテムは既にバスケットに追加されています。",
    ITEM_ADDED_TO_CART_CURRENCY_ERROR:
      "異なる通貨のアイテムをバスケットに追加することはできません。まず、既存のアイテムを削除するか通貨を変更してください。",
    ITEM_ALREADY_ADDED_TO_CART_WITH_NAME: (name) =>
      `このアイテム ‹‹${name}›› はすでにカートに追加されています。`,
    ITEM_ADDED_TO_CART_WITH_NAME_SUCCESS: (name) =>
      `このアイテム ‹‹${name}›› がカートに正常に追加されました。`,
    ITEM_DELETED_FROM_CART_SUCCESS: "アイテムはバスケットから削除されました。",

    ITEM_AMOUNT_CAN_NOT_BE_CHANGED_ERROR: "数量を変更できません。",
    ITEM_AMOUNT_CAN_NOT_BE_BIGGER_THEN_ONE_ERROR:
      "数量は1より大きくすることはできません。",
    ITEM_AMOUNT_CAN_NOT_BE_LESS_THEN_ONE_ERROR:
      "数量は1未満にすることはできません。",
    ITEM_AMOUNT_CHANGED_SUCCESS: "数量が変更されました。",

    ITEM_DURATION_ERROR: "このアイテムの期間は変更できません。",
    ITEM_DURATION_SUCCESS: "期間が変更されました。",
  },
  az: {
    // USER
    USER_SHOULD_LOGIN_FIRST: "Əvvəlcə daxil olmalısınız.",
    USER_EXISTS_ERROR: "Bu email ilə istifadəçi artıq mövcuddur.",
    USER_REGISTERED_SUCCESS: "İstifadəçi uğurla qeydiyyatdan keçdi.",
    NO_ACTIVE_ORDER_ERROR: "Aktiv sifariş yoxdur.",

    ACTIVE_CODE_INCORRECT: "Verilmiş məlumatlar ilə aktiv hesab tapılmadı.",
    FIELD_NOT_EMPTY_ERROR: "Bu sahə boş ola bilməz.",

    USER_VALID_NICKNAME_ERROR: "Düzgün nik adı daxil edin.",

    VALID_EMAIL_ERROR: "Düzgün email adresi daxil edin.",
    WRONG_EMAIL_CODE_ERROR: "Yanlış email kodu!",
    INCORRECT_OLD_PASSWORDS_ERROR: "Köhnə parol səhvdir.",
    PASSWORDS_NOT_MATCHED_ERROR: "Parol uyğun gəlmir.",
    PASSWORD_CHANGED_SUCCESS: "Parol uğurla dəyişdirildi.",
    EMAIL_CODE_MIN_CHARACTERS_ERROR: "Bu sahədə ən azı 6 simvol olmalıdır.",
    EMAIL_CODE_MAX_CHARACTERS_ERROR: "Bu sahədə ən çox 6 simvol olmalıdır.",

    VALID_PASSWORDS_ERROR: "Parollar uyğun gəlmir.",
    PASSWORD_MIN_CHARACTERS_ERROR: "Bu sahədə ən azı 4 simvol olmalıdır.",
    PASSWORD_MAX_CHARACTERS_ERROR: "Bu sahədə ən çox 24 simvol olmalıdır.",

    // ITEM
    ITEM_ADDED_TO_CART_SUCCESS: "Bu məhsul səbətinizə uğurla əlavə edildi.",
    ITEM_ADDED_TO_CART_ERROR: "Məhsul artıq səbətə əlavə edilib.",
    ITEM_ADDED_TO_CART_CURRENCY_ERROR:
      "Fərqli valyutalarla məhsulu səbətə əlavə etmək mümkün deyil. İlk olaraq mövcud olanı silin və ya valyutanı dəyişdirin.",
    ITEM_ALREADY_ADDED_TO_CART_WITH_NAME: (name) =>
      `Bu məhsul ‹‹${name}›› artıq səbətinizə əlavə edilib.`,
    ITEM_ADDED_TO_CART_WITH_NAME_SUCCESS: (name) =>
      `Bu məhsul ‹‹${name}›› səbətinizə uğurla əlavə edildi.`,
    ITEM_DELETED_FROM_CART_SUCCESS: "Məhsul səbətdən silindi.",

    ITEM_AMOUNT_CAN_NOT_BE_CHANGED_ERROR: "Miqdar dəyişdirilə bilməz.",
    ITEM_AMOUNT_CAN_NOT_BE_BIGGER_THEN_ONE_ERROR:
      "Miqdar bir-dən böyük ola bilməz.",
    ITEM_AMOUNT_CAN_NOT_BE_LESS_THEN_ONE_ERROR: "Miqdar bir-dən az ola bilməz.",
    ITEM_AMOUNT_CHANGED_SUCCESS: "Miqdar dəyişdirildi.",

    ITEM_DURATION_ERROR: "Bu məhsul üçün müddət dəyişdirilə bilməz.",
    ITEM_DURATION_SUCCESS: "Müddət dəyişdirildi.",
  },
  ko: {
    // USER
    USER_SHOULD_LOGIN_FIRST: "먼저 로그인해야 합니다.",
    USER_EXISTS_ERROR: "해당 이메일로 이미 가입된 사용자가 있습니다.",
    USER_REGISTERED_SUCCESS: "사용자가 성공적으로 등록되었습니다.",

    NO_ACTIVE_ORDER_ERROR: "활성 주문이 없습니다.",

    ACTIVE_CODE_INCORRECT:
      "해당 자격 증명을 가진 활성 계정을 찾을 수 없습니다.",
    FIELD_NOT_EMPTY_ERROR: "이 필드는 비워둘 수 없습니다.",

    USER_VALID_NICKNAME_ERROR: "유효한 닉네임을 입력하세요.",

    VALID_EMAIL_ERROR: "유효한 이메일 주소를 입력하세요.",
    WRONG_EMAIL_CODE_ERROR: "잘못된 이메일 코드입니다!",
    INCORRECT_OLD_PASSWORDS_ERROR: "잘못된 이전 비밀번호입니다.",
    PASSWORDS_NOT_MATCHED_ERROR: "비밀번호가 일치하지 않습니다.",
    PASSWORD_CHANGED_SUCCESS: "비밀번호가 성공적으로 변경되었습니다.",
    EMAIL_CODE_MIN_CHARACTERS_ERROR: "이 필드에 최소 6자 이상 입력하세요.",
    EMAIL_CODE_MAX_CHARACTERS_ERROR:
      "이 필드에 6자를 초과하지 않도록 입력하세요.",

    VALID_PASSWORDS_ERROR: "비밀번호가 일치하지 않습니다.",
    PASSWORD_MIN_CHARACTERS_ERROR: "이 필드에 최소 4자 이상 입력하세요.",
    PASSWORD_MAX_CHARACTERS_ERROR:
      "이 필드에 24자를 초과하지 않도록 입력하세요.",

    // ITEM
    ITEM_ADDED_TO_CART_SUCCESS:
      "이 항목이 장바구니에 성공적으로 추가되었습니다.",
    ITEM_ADDED_TO_CART_ERROR: "항목이 이미 장바구니에 추가되었습니다.",
    ITEM_ADDED_TO_CART_CURRENCY_ERROR:
      "다른 통화로 항목을 장바구니에 추가할 수 없습니다. 기존 품목을 제거하거나 통화를 변경하세요.",
    ITEM_ALREADY_ADDED_TO_CART_WITH_NAME: (name) =>
      `이 항목 ‹‹${name}››이(가) 이미 장바구니에 추가되었습니다.`,
    ITEM_ADDED_TO_CART_WITH_NAME_SUCCESS: (name) =>
      `이 항목 ‹‹${name}››이(가) 장바구니에 성공적으로 추가되었습니다.`,
    ITEM_DELETED_FROM_CART_SUCCESS: "항목이 장바구니에서 제거되었습니다.",

    ITEM_AMOUNT_CAN_NOT_BE_CHANGED_ERROR: "수량을 변경할 수 없습니다.",
    ITEM_AMOUNT_CAN_NOT_BE_BIGGER_THEN_ONE_ERROR:
      "수량은 1보다 크게 설정할 수 없습니다.",
    ITEM_AMOUNT_CAN_NOT_BE_LESS_THEN_ONE_ERROR:
      "수량은 1보다 작게 설정할 수 없습니다.",
    ITEM_AMOUNT_CHANGED_SUCCESS: "수량이 변경되었습니다.",

    ITEM_DURATION_ERROR: "해당 항목의 지속 기간은 변경할 수 없습니다.",
    ITEM_DURATION_SUCCESS: "지속 기간이 변경되었습니다.",
  },
  uz: {
    // USER
    USER_SHOULD_LOGIN_FIRST: "Avval kirishingiz kerak.",
    USER_EXISTS_ERROR:
      "Bu elektron pochta bilan foydalanuvchi allaqachon mavjud.",
    USER_REGISTERED_SUCCESS:
      "Foydalanuvchi muvaffaqiyatli ro'yxatdan o'tkazildi.",

    NO_ACTIVE_ORDER_ERROR: "Hech qanday faol buyurtma mavjud emas.",

    ACTIVE_CODE_INCORRECT: "Berilgan ma'lumotlar bilan faol hisob topilmadi.",
    FIELD_NOT_EMPTY_ERROR: "Bu maydon bo'sh bo'lishi mumkin emas.",

    USER_VALID_NICKNAME_ERROR: "To'g'ri nom kiriting.",

    VALID_EMAIL_ERROR: "To'g'ri elektron pochta manzili kiriting.",
    WRONG_EMAIL_CODE_ERROR: "Noto'g'ri elektron pochta kodi!",
    INCORRECT_OLD_PASSWORDS_ERROR: "Noto'g'ri eskirgan parol.",
    PASSWORDS_NOT_MATCHED_ERROR: "Parollar mos kelmaydi.",
    PASSWORD_CHANGED_SUCCESS: "Parol muvaffaqiyatli o'zgartirildi.",
    EMAIL_CODE_MIN_CHARACTERS_ERROR:
      "Ushbu maydon kamida 6 belgidan iborat bo'lishi kerak.",
    EMAIL_CODE_MAX_CHARACTERS_ERROR:
      "Ushbu maydon 6 belgidan ko'p bo'lishi mumkin emas.",

    VALID_PASSWORDS_ERROR: "Parollar mos kelmaydi.",
    PASSWORD_MIN_CHARACTERS_ERROR:
      "Ushbu maydon kamida 4 belgidan iborat bo'lishi kerak.",
    PASSWORD_MAX_CHARACTERS_ERROR:
      "Ushbu maydon 24 belgidan ko'p bo'lishi mumkin emas.",

    // ITEM
    ITEM_ADDED_TO_CART_SUCCESS:
      "Ushbu element muvaffaqiyatli savatchangizga qo'shildi.",
    ITEM_ADDED_TO_CART_ERROR: "Item already added to busket.",
    ITEM_ADDED_TO_CART_CURRENCY_ERROR:
      "Savatchaga turlicha valyutalar bilan element qo'shish mumkin emas. Avval mavjud elementlarni olib tashlang yoki valyutani o'zgartiring.",
    ITEM_ALREADY_ADDED_TO_CART_WITH_NAME: (name) =>
      `Bu element ‹‹${name}›› allaqachon savatchangizga qo'shilgan.`,
    ITEM_ADDED_TO_CART_WITH_NAME_SUCCESS: (name) =>
      `Bu element ‹‹${name}›› muvaffaqiyatli savatchangizga qo'shildi.`,
    ITEM_DELETED_FROM_CART_SUCCESS: "Element savatchadan olib tashlandi.",

    ITEM_AMOUNT_CAN_NOT_BE_CHANGED_ERROR: "Miqdorni o'zgartirib bo'lmaydi.",
    ITEM_AMOUNT_CAN_NOT_BE_BIGGER_THEN_ONE_ERROR:
      "Miqdor bitta dan ko'p bo'lishi mumkin emas.",
    ITEM_AMOUNT_CAN_NOT_BE_LESS_THEN_ONE_ERROR:
      "Miqdor bitta dan kam bo'lishi mumkin emas.",
    ITEM_AMOUNT_CHANGED_SUCCESS: "Miqdor o'zgartirildi.",

    ITEM_DURATION_ERROR: "Bu element uchun davomiylilik o'zgartirib bo'lmaydi.",
    ITEM_DURATION_SUCCESS: "Davomiylilik o'zgartirildi.",
  },
  "zh-hant": {
    // USER
    USER_SHOULD_LOGIN_FIRST: "您应该先登录。",
    USER_EXISTS_ERROR: "该电子邮件已经存在的用户。",
    USER_REGISTERED_SUCCESS: "用户注册成功。",

    NO_ACTIVE_ORDER_ERROR: "没有活动订单。",

    ACTIVE_CODE_INCORRECT: "给定凭据找不到活动帐户。",
    FIELD_NOT_EMPTY_ERROR: "此字段不能为空。",

    USER_VALID_NICKNAME_ERROR: "输入有效的昵称。",

    VALID_EMAIL_ERROR: "请输入有效的电子邮件地址。",
    WRONG_EMAIL_CODE_ERROR: "错误的电子邮件代码！",
    INCORRECT_OLD_PASSWORDS_ERROR: "旧密码不正确。",
    PASSWORDS_NOT_MATCHED_ERROR: "密码不匹配。",
    PASSWORD_CHANGED_SUCCESS: "密码修改成功。",
    EMAIL_CODE_MIN_CHARACTERS_ERROR: "确保此字段至少有6个字符。",
    EMAIL_CODE_MAX_CHARACTERS_ERROR: "确保此字段不超过6个字符。",

    VALID_PASSWORDS_ERROR: "密码不匹配。",
    PASSWORD_MIN_CHARACTERS_ERROR: "确保此字段至少有4个字符。",
    PASSWORD_MAX_CHARACTERS_ERROR: "确保此字段不超过24个字符。",

    // ITEM
    ITEM_ADDED_TO_CART_SUCCESS: "此物品已成功添加到购物车。",
    ITEM_ADDED_TO_CART_ERROR: "商品已添加到购物篮中。",
    ITEM_ADDED_TO_CART_CURRENCY_ERROR:
      "无法添加具有不同货币的商品到购物篮中。首先删除现有商品或更改货币。",
    ITEM_ALREADY_ADDED_TO_CART_WITH_NAME: (name) =>
      `物品  ‹‹${name}›› 已经被添加到您的购物车中。`,
    ITEM_ADDED_TO_CART_WITH_NAME_SUCCESS: (name) =>
      `物品  ‹‹${name}›› 成功添加到您的购物车中。`,
    ITEM_DELETED_FROM_CART_SUCCESS: "物品已从购物篮中删除。",

    ITEM_AMOUNT_CAN_NOT_BE_CHANGED_ERROR: "无法更改数量。",
    ITEM_AMOUNT_CAN_NOT_BE_BIGGER_THEN_ONE_ERROR: "数量不能大于一。",
    ITEM_AMOUNT_CAN_NOT_BE_LESS_THEN_ONE_ERROR: "数量不能小于一。",
    ITEM_AMOUNT_CHANGED_SUCCESS: "数量已更改。",

    ITEM_DURATION_ERROR: "无法更改此物品的持续时间。",
    ITEM_DURATION_SUCCESS: "持续时间已更改。",
  },
};
