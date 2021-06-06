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
  saveNewData
} from '../utils/utils.js';

function drawCardsGallery() {
  initialCards.forEach(item => {
    const card = new Card(item, cardTemplate).getCard();
    addCard(card);
  });
}

function addNewCard(event) {
  event.preventDefault();
  const card = { name: '', link: ''};
  card.name = formCardTitle.value;
  card.link = formCardLink.value;
  addCard(new Card(card, cardTemplate).getCard());
  closePopup(popupAddCard);
  clearPopupData(popupAddCard);
  cardForm.toggleButtonState();
}

openPopupProfile.addEventListener('click', function() { 
  setPopupInitialData();
  openPopup(popupProfile) 
});

openPopupAddCard.addEventListener('click', function() { openPopup(popupAddCard) });

formEditProfile.addEventListener('submit', saveNewData);

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
