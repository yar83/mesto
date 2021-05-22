const placesList = document.querySelector('.places__list');

const openPopupProfile = document.querySelector('.profile__button-edit');
const openPopupAddCard = document.querySelector('.profile__button-add');

const formEditProfile = document.querySelector('.form__entity_profile');
const formAddCard = document.querySelector('.form__entity_add-card');

const popups = document.querySelectorAll('.popup');
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

function drawCardsGallery() {
  initialCards.forEach(item => addCard(createCard(item)));
}

function createCard(item) {
  const cardEntity = cardTemplate.content.querySelector('.card').cloneNode(true);
  const cardPicture = cardEntity.querySelector('.card__picture');

  cardPicture.src = item.link;
  cardPicture.setAttribute('alt', 'Изображение ' + item.name);
  cardEntity.querySelector('.card__place').textContent = item.name;
  cardEntity.querySelector('.card__trashbin').addEventListener('click', function(event) { removeCard(event.target) });
  cardEntity.querySelector('.card__heart').addEventListener('click', function(event) {
    toggleLike(event.target);
  });
  cardPicture.addEventListener('click', function(event) { showFullSizeImage(item.link, item.name) });
  return cardEntity;
}

function addCard(item) {
  placesList.prepend(item);
}

function openPopup(popup) {
  popup.classList.add('popup_opened');
  document.addEventListener('keyup', catchEscape);
}

function closePopup(popup) {
  popup.classList.remove('popup_opened');
  document.removeEventListener('keyup', catchEscape);
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

formEditProfile.addEventListener('submit', saveNewData);
formAddCard.addEventListener('submit', addNewCard);

//Add listener by goingh through the array of popups
Array.from(popups).forEach((popup) => {
  popup.addEventListener('click', (evt) => {
    catchOverlayOrCrossClick(evt, popup);
  });
});

//close popup when overlay clicked
const catchOverlayOrCrossClick = (evt, popup) => {
  if (evt.target === popup) {
    closePopup(popup);
  }

  if (evt.target.classList.contains('popup__close')) {
    closePopup(popup);
  }
}

//close popup when Esc pressed
const catchEscape = (evt) => {
  if (evt.key === 'Escape') {
    //find opened popup
    const openedPopup = Array.from(popups).find((popup) => {
      return popup.classList.contains('popup_opened') === true; 
    });
    closePopup(openedPopup);
  }
}

drawCardsGallery();
