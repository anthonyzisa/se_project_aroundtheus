const previewImageModal = document.querySelector("#preview-image-modal");
const previewImageEl = previewImageModal.querySelector(".modal__preview-image");
const previewTitleEl = previewImageModal.querySelector(".modal__preview-title");

//If i remove the popup functions, _handlePreviewImage() fails.
//How do i work around this?

function closePopup(modal) {
  modal.classList.remove("modal_opened");
  document.removeEventListener("keydown", closeModalByEscape);
}

function openPopup(modal) {
  modal.classList.add("modal_opened");
  document.addEventListener("keydown", closeModalByEscape);
}

function closeModalByEscape(evt) {
  if (evt.key === "Escape") {
    const modalOpened = document.querySelector(".modal_opened");
    closePopup(modalOpened);
  }
}

class Card {
  constructor(cardData, cardSelector, handleImageClick) {
    this._name = cardData.name;
    this._link = cardData.link;
    this._cardSelector = cardSelector;
    this._handleImageClick = handleImageClick;
  }

  _setEventListeners() {
    this._likeButton.addEventListener("click", this._handleLikeIcon);
    this._deleteButton.addEventListener("click", this._handleDeleteCard);
    this._previewImage.addEventListener("click", this._handlePreviewImage);
  }

  _handleLikeIcon = () => {
    this._likeButton.classList.toggle("card__like-button_active");
  };

  _handleDeleteCard = () => {
    this._element.remove();
    this._element = null;
  };

  _handlePreviewImage = () => {
    previewImageEl.src = this._link;
    previewImageEl.alt = this._name;
    previewTitleEl.textContent = this._name;
    openPopup(previewImageModal);
  };

  _getTemplate() {
    const cardElement = document
      .querySelector(this._cardSelector)
      .content.querySelector(".card")
      .cloneNode(true);

    return cardElement;
  }

  getView() {
    this._element = this._getTemplate();
    this._likeButton = this._element.querySelector(".card__like-button");
    this._deleteButton = this._element.querySelector(".card__delete-button");
    this._previewImage = this._element.querySelector(".card__image");
    this._cardTitle = this._element.querySelector(".card__title");
    this._previewImage.src = this._link;
    this._previewImage.alt = this._name;
    this._cardTitle.textContent = this._name;
    this._setEventListeners();

    return this._element;
  }
}

export default Card;
