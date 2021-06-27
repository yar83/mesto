import Popup from './Popup.js'

export default class PopupWithForm extends Popup {
  constructor(popupSelector, submitForm) {
    super(popupSelector);
    this._form = document.querySelector(popupSelector).querySelector('.form__entity');
    this._submitForm = submitForm;
    this._inputList = this._form.querySelectorAll('.form__item'); 
  }

  _getInputValues() {
    this._formValues = {};

    this._inputList.forEach(input => {
      this._formValues[input.name] = input.value;
    });

    return this._formValues;
  }

  setEventListeners() {
    super.setEventListeners();
    this._form.addEventListener('submit', (event) => {
      event.preventDefault();
      this._submitForm(this._getInputValues());
      this.close();
    });
  }

  close() {
    this._form.reset();
    super.close();
  }

  setInitialFormData(formData) {
    this._inputList.forEach((input, index) => {
      input.value = Object.values(formData)[index];
    });
  }
}
