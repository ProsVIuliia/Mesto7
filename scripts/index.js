import Card from "./Card.js";
import FormValidator from "./FormValidator.js";

const selectorsNamesForValidation = {
  formSelector: ".form",
  inputSelector: ".form__input",
  submitButtonSelector: ".form__save",
  inactiveButtonClass: "form__save_inactive",
  inputErrorClass: "form__input_type_error",
  errorClass: "form__input-error_active",
};

const popupList = document.querySelectorAll(".popup");
const popupForEditAuthor = document.querySelector(".popup_for_edit-author");
const popupForAddCard = document.querySelector(".popup_for_add-card");
const profileEditOpenBtn = document.querySelector(".profile__button");
const cardAddOpenBtn = document.querySelector(".profile__add");

const formForEditAuthor = popupForEditAuthor.querySelector(
  ".form_for_edit-author"
);
const formForAddCard = popupForAddCard.querySelector(".form_for_add-card");
const formInputImage = formForAddCard.querySelector(
  ".form__input_info_link-img"
);
const formInputTitle = formForAddCard.querySelector(
  ".form__input_info_name-card"
);

const authorProfile = document.querySelector(".profile__name");
const authorJobProfile = document.querySelector(".profile__description");
const authorProfileInput = document.querySelector(
  ".form__input_info_name-author"
);
const authorJobProfileInput = document.querySelector(
  ".form__input_info_name-author-job"
);

const cardElements = document.querySelector(".elements");

const initialCards = [
  {
    name: "Архыз",
    link: "https://pictures.s3.yandex.net/frontend-developer/cards-compressed/arkhyz.jpg",
  },
  {
    name: "Челябинская область",
    link: "https://pictures.s3.yandex.net/frontend-developer/cards-compressed/chelyabinsk-oblast.jpg",
  },
  {
    name: "Иваново",
    link: "https://pictures.s3.yandex.net/frontend-developer/cards-compressed/ivanovo.jpg",
  },
  {
    name: "Камчатка",
    link: "https://pictures.s3.yandex.net/frontend-developer/cards-compressed/kamchatka.jpg",
  },
  {
    name: "Холмогорский район",
    link: "https://pictures.s3.yandex.net/frontend-developer/cards-compressed/kholmogorsky-rayon.jpg",
  },
  {
    name: "Байкал",
    link: "https://pictures.s3.yandex.net/frontend-developer/cards-compressed/baikal.jpg",
  },
];

const validatorFormForEditAuthor = new FormValidator(
  selectorsNamesForValidation,
  formForEditAuthor
);
const validatorFromForAddCard = new FormValidator(
  selectorsNamesForValidation,
  formForAddCard
);

export function openPopup(popup) {
  popup.classList.add("popup_visible");
  document.addEventListener("keydown", closeByEsc);
}

function closePopup(popup) {
  popup.classList.remove("popup_visible");
  document.removeEventListener("keydown", closeByEsc);
}

function closeByEsc(evt) {
  if (evt.key === "Escape") {
    const popupVisible = document.querySelector(".popup_visible");
    closePopup(popupVisible);
  }
}

function openPropfilePopup() {
  authorProfileInput.value = authorProfile.textContent;
  authorJobProfileInput.value = authorJobProfile.textContent;
  validatorFormForEditAuthor.resetValidation();
  openPopup(popupForEditAuthor);
}

function submitProfileInfo(evt) {
  evt.preventDefault();
  authorProfile.textContent = authorProfileInput.value;
  authorJobProfile.textContent = authorJobProfileInput.value;
  closePopup(popupForEditAuthor);
}

function renderCard(elementPlace, element) {
  elementPlace.prepend(element);
}

function handleNewCard(card) {
  const newCard = new Card(card, "#card").generateCard();
  return newCard;
}

function submitAddCard(evt) {
  evt.preventDefault();

  const cardContainer = [];
  cardContainer.link = formInputImage.value;
  cardContainer.name = formInputTitle.value;

  renderCard(cardElements, handleNewCard(cardContainer));

  closePopup(popupForAddCard);
  formForAddCard.reset();
}

window.onload = function () {
  const body = document.querySelector('.page');
  body.style.display = 'flex';
};

validatorFormForEditAuthor.enableValidation();
validatorFromForAddCard.enableValidation();

profileEditOpenBtn.addEventListener("click", openPropfilePopup);
cardAddOpenBtn.addEventListener("click", () => {
  formForAddCard.reset();
  validatorFromForAddCard.resetValidation();
  openPopup(popupForAddCard);
});

formForEditAuthor.addEventListener("submit", submitProfileInfo);
formForAddCard.addEventListener("submit", submitAddCard);

popupList.forEach((item) => {
  item.addEventListener("mousedown", function (evt) {
    if (
      evt.target.classList.contains("popup_visible") ||
      evt.target.classList.contains("popup__close-button")
    ) {
      closePopup(item);
    }
  });
});

initialCards.forEach((item) => {
  renderCard(cardElements, handleNewCard(item));
});