import Card from './Card.js';
import FormValidator from './FormValidator.js';
import {
  initialCards, 
  formCardTitle,
  formCardLink,
  placesList,
  openPopupAddCard,
  openPopupProfile,
  formsList,
  formEditProfile,
  formAddCard,
  popups,
  popupProfile,
  popupAddCard,
  cardTemplate,
  config
} from '../utils/constants.js';
import { 
  showFullSizeImage, 
  openPopup, 
  closePopup,
  setPopupInitialData,
  addCard,
  catchOverlayOrCrossClick,
  clearPopupData,
  submitEditProfileForm
} from '../utils/utils.js';

const createCard = (item) => {
  return new Card(item, cardTemplate).getCard();
}

function drawCardsGallery() {
  initialCards.forEach(item => {
    addCard(createCard(item));
  });
}

function addNewCard(event) {
  event.preventDefault();
  const card = { name: '', link: ''};
  card.name = formCardTitle.value;
  card.link = formCardLink.value;
  addCard(createCard(card));
  closePopup(popupAddCard);
  clearPopupData(popupAddCard);
  cardForm.toggleButtonState();
}

openPopupProfile.addEventListener('click', function() { 
  setPopupInitialData();
  openPopup(popupProfile) 
});

openPopupAddCard.addEventListener('click', function() { openPopup(popupAddCard) });

formEditProfile.addEventListener('submit', submitEditProfileForm);

formAddCard.addEventListener('submit', addNewCard);

Array.from(popups).forEach((popup) => {
  popup.addEventListener('click', (evt) => {
    catchOverlayOrCrossClick(evt, popup);
  });
});

const profileForm = new FormValidator(formEditProfile, config);
const cardForm = new FormValidator(formAddCard, config);
profileForm.enableValidation();
cardForm.enableValidation();
cardForm.toggleButtonState();

drawCardsGallery();
