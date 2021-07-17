import Popup from './Popup.js'

export default class PopupWithForm extends Popup {

  #form;
  #submitForm;
  #inputList;
  #formValues;

  constructor(popupSelector, {handleFormSubmit} ) {
    super(popupSelector);
    this.#form = document.querySelector(popupSelector).querySelector('.form__entity');
    this.#submitForm = handleFormSubmit;
    this.#inputList = this.#form.querySelectorAll('.form__item'); 
  }

  #getInputValues() {
    this.#formValues = {};

    this.#inputList.forEach(input => {
      this.#formValues[input.name] = input.value;
    });

    return this.#formValues;
  }

  setEventListeners() {
    super.setEventListeners();
    this.#form.addEventListener('submit', (event) => {
      event.preventDefault();
      this.#submitForm(this.#getInputValues());
    });
  }

  close() {
    this.#form.reset();
    super.close();
  }

  setInitialFormData(formData) {
    this.#inputList.forEach((input, index) => {
      input.value = Object.values(formData)[index];
    });
  }
}
