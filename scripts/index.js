const openPopupProfile = document.querySelector('.profile__button-edit');
const openPopupAddCard = document.querySelector('.profile__button-add');

const closePopupProfileButton = document.querySelector('.popup__close_profile');
const closePopupAddCardButton = document.querySelector('.popup__close_add-card');

const formAuthor = document.querySelector('.form__entity');

const popupProfile = document.querySelector('.popup_edit-profile');
const popupAddCard = document.querySelector('.popup_add-card');

const name = document.querySelector('.profile__name');
const about = document.querySelector('.profile__about');
const formFieldName = document.querySelector('.form__item_el_name');
const formFieldAbout = document.querySelector('.form__item_el_about');

function openPopup(popup) {
  setPopupInitialData();
  popup.classList.add('popup_opened');
}

function closePopup(popup) {
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


openPopupProfile.addEventListener('click', function() { openPopup(popupProfile) });
openPopupAddCard.addEventListener('click', function() { openPopup(popupAddCard) });

closePopupProfileButton.addEventListener('click', function() { closePopup(popupProfile) });
closePopupAddCardButton.addEventListener('click', function() { closePopup(popupAddCard) });


formAuthor.addEventListener('submit', saveNewData);
