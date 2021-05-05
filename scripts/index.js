const openPopupProfile = document.querySelector('.profile__button-edit');
const openPopupAddCard = document.querySelector('.profile__button-add');

const closePopupProfileButton = document.querySelector('.popup__close_profile');
const closePopupAddCardButton = document.querySelector('.popup__close_add-card');

const formEditProfile = document.querySelector('.form__entity_profile');
const formAddCard = document.querySelector('.form__entity_add-card');

const popupProfile = document.querySelector('.popup_edit-profile');
const popupAddCard = document.querySelector('.popup_add-card');

const name = document.querySelector('.profile__name');
const about = document.querySelector('.profile__about');
const formFieldName = document.querySelector('.form__item_el_name');
const formFieldAbout = document.querySelector('.form__item_el_about');
const formCardTitle = document.querySelector('.form__item_el_card-title');
const formCardLink = document.querySelector('.form__item_el_card-link');
const cardTemplate = document.querySelector('#card-template');
const initialCards = [
  { name: 'Полярный Урал',
    link: 'http://rtcam.ru/mesto/polural.webp'
  },
  { name: 'Карачаево-Черкесия',
    link: 'http://rtcam.ru/mesto/kchr.webp'
  },
  { name: 'Костромская область',
    link: 'http://rtcam.ru/mesto/kostroma.webp'
  },
  { name: 'Приполярный Урал',
    link: 'http://rtcam.ru/mesto/pripural.webp'
  },
  { name: 'Крым',
    link: 'http://rtcam.ru/mesto/krym.webp'
  },
  { name: 'Остров Русский',
    link: 'http://rtcam.ru/mesto/rusisl.webp'
  }];

drawCardsGallery();

function drawCardsGallery() {
  initialCards.forEach(item => addCard(item));
}

function addCard(item) {
  const cardEntity = cardTemplate.content.querySelector('.card').cloneNode(true);
  cardEntity.querySelector('.card__picture').src = item.link;
  cardEntity.querySelector('.card__place').textContent = item.name;
  document.querySelector('.places__list').append(cardEntity);

  cardEntity.querySelector('.card__trashbin').addEventListener('click', function() { removeCard(event.target) });
  cardEntity.querySelector('.card__heart').addEventListener('click', function() {
    event.target.classList.contains('card__heart_color_black') ? dislikeCard(event.target) : likeCard(event.target);
  });
}

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
  closePopup(popupProfile);
}

function addNewCard(event) {
  event.preventDefault();
  const card = [
    { name: '',
      link: ''
    }
  ];
  card[0].name = formCardTitle.value;
  card[0].link = formCardLink.value;
  addCard(card[0]);
  closePopup(popupAddCard);
}

function removeCard(target) {
  target.closest('.card').remove();
}

function likeCard(target) {
  target.classList.add('card__heart_color_black');
}

function dislikeCard(target) {
  target.classList.remove('card__heart_color_black');
}

openPopupProfile.addEventListener('click', function() { openPopup(popupProfile) });
openPopupAddCard.addEventListener('click', function() { openPopup(popupAddCard) });

closePopupProfileButton.addEventListener('click', function() { closePopup(popupProfile) });
closePopupAddCardButton.addEventListener('click', function() { closePopup(popupAddCard) });


formEditProfile.addEventListener('submit', saveNewData);
formAddCard.addEventListener('submit', addNewCard);
