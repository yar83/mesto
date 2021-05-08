const placesList = document.querySelector('.places__list');

const openPopupProfile = document.querySelector('.profile__button-edit');
const openPopupAddCard = document.querySelector('.profile__button-add');

const closePopupProfileButton = document.querySelector('.popup__close_profile');
const closePopupAddCardButton = document.querySelector('.popup__close_add-card');
const closePopupFullSizeImageButton = document.querySelector('.fullszimg-popup__btn-close');

const formEditProfile = document.querySelector('.form__entity_profile');
const formAddCard = document.querySelector('.form__entity_add-card');

const popupProfile = document.querySelector('.popup_edit-profile');
const popupAddCard = document.querySelector('.popup_add-card');
const popupFullSizeImage = document.querySelector('.fullszimg-popup');
const fullSizeImage = popupFullSizeImage.querySelector('.fullszimg-popup__image')
const fullSizeImageTitle = popupFullSizeImage.querySelector('.fullszimg-popup__title');

const profilePersonName = document.querySelector('.profile__name');
const profilePersonAbout = document.querySelector('.profile__about');
const formFieldName = document.querySelector('.form__item_el_name');
const formFieldAbout = document.querySelector('.form__item_el_about');
const formCardTitle = document.querySelector('.form__item_el_card-title');
const formCardLink = document.querySelector('.form__item_el_card-link');

const cardTemplate = document.querySelector('#card-template');
const initialCards = [
  { name: 'Полярный Урал',
    link: 'https://i.ibb.co/jhSWGmy/polural.webp'
  },
  { name: 'Карачаево-Черкесия',
    link: 'https://i.ibb.co/SnSsfqJ/kchr.webp'
  },
  { name: 'Костромская область',
    link: 'https://i.ibb.co/z5Y2tsS/kostroma.webp'
  },
  { name: 'Приполярный Урал',
    link: 'https://i.ibb.co/5RCzt82/pripural.webp'
  },
  { name: 'Крым',
    link: 'https://i.ibb.co/jRT2cGm/krym.webp'
  },
  { name: 'Остров Русский',
    link: 'https://i.ibb.co/SwbrnPY/rusisl.webp'
  }];

drawCardsGallery();

function drawCardsGallery() {
  initialCards.forEach(item => addCard(createCard(item)));
}

function createCard(item) {
  const cardEntity = cardTemplate.content.querySelector('.card').cloneNode(true);
  const cardPicture = cardEntity.querySelector('.card__picture');

  cardPicture.src = item.link;
  cardPicture.setAttribute('alt', 'Изображение ' + item.name);
  cardEntity.querySelector('.card__place').textContent = item.name;
  cardEntity.querySelector('.card__trashbin').addEventListener('click', function() { removeCard(event.target) });
  cardEntity.querySelector('.card__heart').addEventListener('click', function() {
    toggleLike(event.target);
  });
  cardPicture.addEventListener('click', function() { showFullSizeImage(item.link, item.name) });
  return cardEntity;
}

function addCard(item) {
  placesList.prepend(item);
}

function openPopup(popup) {
  popup.classList.remove('popup_closed');
  popup.classList.add('popup_opened');
}

function closePopup(popup) {
  popup.classList.remove('popup_opened');
  popup.classList.add('popup_closed');
}

function setPopupInitialData() {
  formFieldName.value = profilePersonName.textContent;
  formFieldAbout.value = profilePersonAbout.textContent;
}

function clearPopupData(item) {
  const formInputs = item.getElementsByClassName('form__item');
  for (let i = 0; i < formInputs.length; i++) {
    formInputs[i].value = '';
  }
}

function saveNewData(event) {
  event.preventDefault();
  profilePersonName.textContent = formFieldName.value;
  profilePersonAbout.textContent = formFieldAbout.value;
  closePopup(popupProfile);
  clearPopupData(popupProfile);
}

function addNewCard(event) {
  event.preventDefault();
  const card = { name: '', link: ''};

  card.name = formCardTitle.value;
  card.link = formCardLink.value;
  addCard(createCard(card));
  closePopup(popupAddCard);
  clearPopupData(popupAddCard);
}

function removeCard(target) {
  target.closest('.card').remove();
}

function toggleLike(target) {
  target.classList.toggle('card__heart_color_black');
}

function showFullSizeImage(link, name) {
  openPopup(popupFullSizeImage);
  fullSizeImage.src = link;
  fullSizeImageTitle.textContent = name; 
  fullSizeImage.setAttribute('alt', 'Изображение ' + name); 
}

openPopupProfile.addEventListener('click', function() { 
  setPopupInitialData();
  openPopup(popupProfile) 
});

openPopupAddCard.addEventListener('click', function() { openPopup(popupAddCard) });

closePopupProfileButton.addEventListener('click', function() { 
  closePopup(popupProfile);
  clearPopupData(popupProfile);
});

closePopupAddCardButton.addEventListener('click', function() { 
  closePopup(popupAddCard);
  clearPopupData(popupAddCard);
});

closePopupFullSizeImageButton.addEventListener('click', function() { 
  closePopup(popupFullSizeImage);
  clearPopupData(popupFullSizeImage);
});


formEditProfile.addEventListener('submit', saveNewData);
formAddCard.addEventListener('submit', addNewCard);
