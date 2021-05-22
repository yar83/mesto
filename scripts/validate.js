const enableValidation = (formsData) => {
  const formsList = Array.from(document.querySelectorAll(formsData.formSelector));
  formsList.forEach((formItem) => {
    formItem.addEventListener('submit', (evt) => {
      evt.preventDefault();
    });

    const fieldsetsList = Array.from(formItem.querySelectorAll(formsData.fieldsetInputsSelector));
    const buttonItem = formItem.querySelector(formsData.submitButtonSelector);


    fieldsetsList.forEach((fsetItem) => {
      setEventListeners(fsetItem, formsData.inputSelector, buttonItem, formsData.inactiveButtonClass, formsData.inputErrorClass);
    });
  });
}

const setEventListeners = (formElement, inputItemSelector, buttonItem, inactiveButtonSelector, inputErrorSelector) => {
  const inputList = Array.from(formElement.querySelectorAll(inputItemSelector));
  toggleButtonState(inputList, buttonItem, inactiveButtonSelector);

  //Deactivate button after click. Approach is valid as button is clickable only when all inputs are valid
  buttonItem.addEventListener('click', () => {
    buttonItem.classList.add(inactiveButtonSelector);
  });

  inputList.forEach((inputItem) => {
    inputItem.addEventListener('input', () => {
      checkInputValidity(formElement, inputItem, inputErrorSelector);
      toggleButtonState(inputList, buttonItem, inactiveButtonSelector);
    });
  });
}

const toggleButtonState = (inputList, buttonItem, inactiveButtonSelector) => {
  if (hasInvalidInput(inputList)) {
    buttonItem.classList.add(inactiveButtonSelector);
  } else {
    buttonItem.classList.remove(inactiveButtonSelector);
  }
}

const hasInvalidInput = (inputList) => {
  return inputList.some((item) => {
    if (item.validity.valid === false) {
      return true;
    }
  });
}

const checkInputValidity = (formElement, inputItem, inputErrorSelector) => {
  if (inputItem.validity.valid === false) {
    showInputError(formElement, inputItem, inputItem.validationMessage, inputErrorSelector);
  } else {
    hideInputError(formElement, inputItem, inputErrorSelector);
  }
}

const showInputError = (formElement, inputItem, errorMessage, inputErrorSelector) => {
  const inputId = inputItem.getAttribute('id');
  const errorElement = formElement.querySelector(`.${inputId}-error`);
  inputItem.classList.add(inputErrorSelector);
  errorElement.style.display = 'block';
  errorElement.textContent = errorMessage;
}

const hideInputError = (formElement, inputItem, inputErrorSelector) => {
  const inputId = inputItem.getAttribute('id');
  const errorElement = formElement.querySelector(`.${inputId}-error`);
  inputItem.classList.remove(inputErrorSelector);
  errorElement.style.display = 'none';
  errorElement.textContent = '';
}


enableValidation({
  formSelector: '.form__entity',
  fieldsetInputsSelector: '.form__items',
  inputSelector: '.form__item',
  submitButtonSelector: '.form__button',
  inactiveButtonClass: 'form__button_inactive',
  inputErrorClass: 'form__item_type_error',
});
