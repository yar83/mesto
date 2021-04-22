const openPopupButton = document.querySelector('.profile__button-edit');
const closePopupButton = document.querySelector('.popup__close');
const formAuthor = document.querySelector('.form__author');
const popup = document.querySelector('.popup');

function togglePopup() {
  if (popup.classList.contains('.popup_opened')) {
    clearPopupData();
    popup.classList.toggle('popup_opened');
  } else {
    setPopupInitialData();
    popup.classList.toggle('popup_opened');
  }
}

function setPopupInitialData() {
  document.querySelector('.form__item_el_name').value = document.querySelector('.profile__name').textContent;
  document.querySelector('.form__item_el_about').value = document.querySelector('.profile__about').textContent;
}

function clearPopupData() {
  document.querySelector('.form__item_el_name').value = ''; 
  document.querySelector('.form__item_el_about').value = ''; 
}

function saveNewData(event) {
  event.preventDefault();
  document.querySelector('.profile__name').textContent = document.querySelector('.form__item_el_name').value;
  document.querySelector('.profile__about').textContent = document.querySelector('.form__item_el_about').value;
  togglePopup();
}


openPopupButton.addEventListener('click', togglePopup);
closePopupButton.addEventListener('click', togglePopup);
formAuthor.addEventListener('submit', saveNewData);
