export default class FormValidator {
  constructor(form, config) {
    this._form = form;
    this._config = config;
    this._inputList = Array.from(form.querySelectorAll(config.inputSelector));
  };

  enableValidation = () => {
    this._form.addEventListener('submit', (evt) => {
      evt.preventDefault();
    });

    this._inputList.forEach((input) => {
      this._setInputEventListener(input);
    });
  }

  _setInputEventListener = (input) => {
    input.addEventListener('input', () => {
      this._checkInputValidity(input);
      this.toggleButtonState();
    });
  }

  _checkInputValidity = (input) => {
    if (input.validity.valid === false) {
      this._showInputError(input);
    } else {
      this._hideInputError(input);
    }
  }

  _showInputError = (input) => {
    const inputId = input.getAttribute('id');
    const errorElement = this._form.querySelector(`.${inputId}-error`);
    input.classList.add(this._inputErrorClass);
    errorElement.style.display = 'block';
    errorElement.textContent = input.validationMessage;
  }

  _hideInputError = (input) => {
    const inputId = input.getAttribute('id');
    const errorElement = this._form.querySelector(`.${inputId}-error`);
    input.classList.remove(this._inputErrorClass);
    errorElement.style.display = 'none';
    errorElement.textContent = '';
  }

  resetValidation = () => {
    this._inputList.forEach((input) => {
      this._hideInputError(input);
    });
  }


  toggleButtonState = () => {
    const button = this._form.querySelector(this._config.submitButtonSelector);
    if (this._hasInvalidInput()) {
      button.classList.add(this._config.inactiveButtonClass);
      button.setAttribute('disabled', '');
    } else {
      button.classList.remove(this._config.inactiveButtonClass);
      button.removeAttribute('disabled');
    }
  }

  _hasInvalidInput = () => {
    return this._inputList.some((item) => {
      if (item.validity.valid === false) {
        return true;
      }
    });
  }
}
