class formValidator {
  constructor(settings, formEl) {
    this._inputSelector = settings.inputSelector;
    this._submitButtonSelector = settings.submitButtonSelector;
    this._inactiveButtonClass = settings.inactiveButtonClass;
    this._inputErrorClass = settings.inputErrorClass;
    this._errorClass = settings.errorClass;

    this._formEl = formEl;
  }

  _showInputError() {
    const errorMessageEl = this._formEl.querySelector(
      `#${this._inputEl.id}-error`
    );
    this._inputEl.classList.add(this._inputErrorClass);
    errorMessageEl.textContent = this._inputEl.validationMessage;
    errorMessageEl.classList.add(this._errorClass);
  }

  _hideInputError() {
    const errorMessageEl = this._formEl.querySelector(
      `#${this._inputEl.id}-error`
    );
    this._inputEl.classList.remove(this._inputErrorClass);
    errorMessageEl.textContent = "";
    errorMessageEl.classList.remove(this._errorClass);
  }

  _checkInputValidity(options) {
    if (!this._inputEl.validity.valid) {
      return showInputError(this._formEl, this._inputEl, options);
    }
    hideInputError(this._formEl, this._inputEl, options);
  }

  _hasInvalidInput(inputEls) {
    return !inputEls.every((inputEl) => inputEl.validity.valid);
  }

  _toggleButtonState() {
    if (hasInvalidInput(this._inputEls)) {
      this._submitButton.classList.add(this._inactiveButtonClass);
      this._submitButton.disabled = true;
      return;
    }
    this._submitButton.classList.remove(this._inactiveButtonClass);
    this._submitButton.disabled = false;
  }

  _setEventListeners() {
    const { _inputSelector } = options;
    this._inputEls = [...this._formEl.querySelectorAll(this._inputSelector)];
    this._submitButton = this._formEl.querySelector(
      options.this._submitButtonSelector
    );
    inputEls.forEach((inputEl) => {
      inputEl.addEventListener("input", (e) => {
        checkInputValidity(this._formEl, inputEl, options);
        toggleButtonState(inputEls, submitButton, options);
      });
    });
  }

  enableValidation() {
    this._form.addEventListener("submit", (e) => {
      e.preventDefault();
    });

    setEventListeners(formEl, options);
  }
}

const settings = {
  formSelector: ".modal__form",
  inputSelector: ".modal__input",
  submitButtonSelector: ".modal__button",
  inactiveButtonClass: "modal__button_disabled",
  inputErrorClass: "modal__input_type_error",
  errorClass: "modal__error_visible",
};

export default formValidator;
