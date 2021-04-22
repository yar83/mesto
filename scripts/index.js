const openPopupButton = document.querySelector('.profile__button-edit');
const closePopupButton = document.querySelector('.popup__close');
const formAuthor = document.querySelector('.form__author');
const popup = document.querySelector('.popup');
const name = document.querySelector('.profile__name');
const about = document.querySelector('.profile__about');
const formFieldName = document.querySelector('.form__item_el_name');
const formFieldAbout = document.querySelector('.form__item_el_about');

function openPopup() {
  setPopupInitialData();
  popup.classList.add('popup_opened');
}

function closePopup() {
  clearPopupData();
  popup.classList.remove('popup_opened');
}

function setPopupInitialData() {
  formFieldName.value = name.textContent;
  formFieldAbout.value = about.textContent;
}

function clearPopupData() {
  formFieldName.value = ''; 
  formFieldAbout.value = ''; 
}

function saveNewData(event) {
  event.preventDefault();
  name.textContent = formFieldName.value;
  about.textContent = formFieldAbout.value;
  closePopup();
}


openPopupButton.addEventListener('click', openPopup);
closePopupButton.addEventListener('click', closePopup);
formAuthor.addEventListener('submit', saveNewData);
