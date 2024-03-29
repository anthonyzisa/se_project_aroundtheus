import Card from "../components/card.js";
import FormValidator from "../components/formValidator.js";
import { closePopup, openPopup, closeModalByEscape } from "../utils/utils.js";

const initialCards = [
  {
    name: "Yosemite Valley",
    link: "https://practicum-content.s3.us-west-1.amazonaws.com/software-engineer/around-project/yosemite.jpg",
  },
  {
    name: "Lake Louise",
    link: "https://practicum-content.s3.us-west-1.amazonaws.com/software-engineer/around-project/lake-louise.jpg",
  },
  {
    name: "Bald Mountains",
    link: "https://practicum-content.s3.us-west-1.amazonaws.com/software-engineer/around-project/bald-mountains.jpg",
  },
  {
    name: "Latemar",
    link: "https://practicum-content.s3.us-west-1.amazonaws.com/software-engineer/around-project/latemar.jpg",
  },
  {
    name: "Vanoise National Park",
    link: "https://practicum-content.s3.us-west-1.amazonaws.com/software-engineer/around-project/vanoise.jpg",
  },
  {
    name: "Lago di Braies",
    link: "https://practicum-content.s3.us-west-1.amazonaws.com/software-engineer/around-project/lago.jpg",
  },
];

const profileEditButton = document.querySelector("#profile-edit-button");
const profileEditModal = document.querySelector("#profile-edit-modal");
const profileEditCloseButton = document.querySelector(
  "#profile-edit-close-button"
);

const profileTitle = document.querySelector(".profile__title");
const profileDescription = document.querySelector(".profile__description");
const profileTitleInput = document.querySelector("#profile-title-input");
const profileDescriptionInput = document.querySelector(
  "#profile-description-input"
);
const profileEditForm = profileEditModal.querySelector("#profile-edit-form");

const cardAddModal = document.querySelector("#card-add-modal");
const cardAddButton = document.querySelector("#add-button");
const cardAddCloseButton = document.querySelector("#card-add-close-button");
const cardAddForm = cardAddModal.querySelector("#card-add-form");

const cardListEl = document.querySelector(".cards__list");
const cardTemplate =
  document.querySelector("#card-template").content.firstElementChild;

const preveiwImageCloseButton = document.querySelector(
  "#preview-image-close-button"
);
const previewImageModal = document.querySelector("#preview-image-modal");
const cardSelector = "#card-template";

/*              Validation            */

const validationSettings = {
  inputSelector: ".modal__input",
  submitButtonSelector: ".modal__button",
  inactiveButtonClass: "modal__button_disabled",
  inputErrorClass: "modal__input_type_error",
  errorClass: "modal__error_visible",
};

const editFormValidator = new FormValidator(
  validationSettings,
  profileEditForm
);
const addFormValidator = new FormValidator(validationSettings, cardAddForm);

/*              Functions             */

/*function getCardView(cardData) {
  //const cardElement = cardTemplate.cloneNode(true);
  //const cardImageEl = cardElement.querySelector(".card__image");
  //const cardTitleEl = cardElement.querySelector(".card__title");
  //const cardLikeButton = cardElement.querySelector(".card__like-button");
  //const cardDeleteButton = cardElement.querySelector(".card__delete-button");
  //cardImageEl.src = cardData.link;
  //cardTitleEl.textContent = cardData.name;
  //cardImageEl.alt = cardData.name;

  //cardLikeButton.addEventListener("click", handleLikeIcon);
  //cardDeleteButton.addEventListener("click", handleDeleteCard);

  cardImageEl.addEventListener("click", () => {
    const previewImageEl = previewImageModal.querySelector(
      ".modal__preview-image"
    );
    const previewTitleEl = previewImageModal.querySelector(
      ".modal__preview-title"
    );
    previewImageEl.src = cardData.link;
    previewImageEl.alt = cardData.name;
    previewTitleEl.textContent = cardData.name;

    openPopup(previewImageModal);
  });
  return cardElement;
}*/

function renderCard(cardEl, container) {
  container.prepend(cardEl);
}

/*              Event Handlers             */

function handleProfileEditSubmit(e) {
  e.preventDefault();
  profileTitle.textContent = profileTitleInput.value;
  profileDescription.textContent = profileDescriptionInput.value;
  closePopup(profileEditModal);
}

function handleCardAddSubmit(e) {
  e.preventDefault();
  const name = e.target.title.value;
  const link = e.target.link.value;
  const cardView = createCard({
    name,
    link,
  });
  e.target.reset();
  renderCard(cardView, cardListEl);
  closePopup(cardAddModal);
}

function closeModalOnRemoteClick(evt) {
  if (
    evt.target === evt.currentTarget ||
    evt.target.classList.contains("modal__close")
  ) {
    closePopup(evt.target);
  }
}

/*              Event Listeners             */

profileEditButton.addEventListener("click", () => {
  profileTitleInput.value = profileTitle.textContent;
  profileDescriptionInput.value = profileDescription.textContent;
  openPopup(profileEditModal);
});

cardAddButton.addEventListener("click", () => {
  openPopup(cardAddModal);
});

profileEditCloseButton.addEventListener("click", function () {
  closePopup(profileEditModal);
});
cardAddCloseButton.addEventListener("click", function () {
  closePopup(cardAddModal);
});

preveiwImageCloseButton.addEventListener("click", function () {
  closePopup(previewImageModal);
});

profileEditModal.addEventListener("mousedown", closeModalOnRemoteClick);
cardAddModal.addEventListener("mousedown", closeModalOnRemoteClick);
previewImageModal.addEventListener("mousedown", closeModalOnRemoteClick);

profileEditForm.addEventListener("submit", handleProfileEditSubmit);
cardAddForm.addEventListener("submit", handleCardAddSubmit);

const createCard = (cardData) => {
  const card = new Card(cardData, cardSelector);
  return card.getView();
};

initialCards.forEach(function (cardData) {
  const card = createCard(cardData);
  renderCard(card, cardListEl);
});

const settings = {
  formSelector: ".modal__form",
  inputSelector: ".modal__input",
  submitButtonSelector: ".modal__button",
  inactiveButtonClass: "modal__button_disabled",
  inputErrorClass: "modal__input_type_error",
  errorClass: "modal__error_visible",
};

editFormValidator.enableValidation();
addFormValidator.enableValidation();
