import Card from '../components/Card.js';
import FormValidator from '../components/FormValidator.js';
import Section from '../components/Section.js';
import Popup from '../components/Popup.js';
import PopupWithImage from '../components/PopupWithImage.js';
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
  setPopupInitialData,
  clearPopupData,
  submitEditProfileForm
} from '../utils/utils.js';

const createCard = (item) => {
  return new Card(item, cardTemplate, function (imgSrcAltText) {
    new PopupWithImage('.fullszimg-popup', imgSrcAltText).open();
    }).getCard();
}

const cardList = new Section(
  {
    data: initialCards,
    renderer: (item) => {
      const card = createCard(item);
      cardList.addItem(card);
    }
  },
  '.places__list'
);

cardList.renderItems();

function addNewCard(event) {
  event.preventDefault();
  const card = { name: '', link: ''};
  card.name = formCardTitle.value;
  card.link = formCardLink.value;
  cardList.addItem(createCard(card));
  closePopup(popupAddCard);
  clearPopupData(popupAddCard);
  validatorCardForm.toggleButtonState();
}

openPopupProfile.addEventListener('click', function() { 
  setPopupInitialData();
  validatorProfileForm.hideAllInputsErrors();
  validatorProfileForm.toggleButtonState();
  openPopup(popupProfile) 
});

openPopupAddCard.addEventListener('click', function() { 
  // Когда пользователь кликает на кнопку открытия попапа карточки, форма принудительно очищается в любом случае, кнопка переводится в режим "откл", скрываются все уведомления об ошибках инпутов
  clearPopupData(popupAddCard);
  validatorCardForm.hideAllInputsErrors();
  validatorCardForm.toggleButtonState(); 
  openPopup(popupAddCard) });

formEditProfile.addEventListener('submit', submitEditProfileForm);

formAddCard.addEventListener('submit', addNewCard);

const validatorProfileForm = new FormValidator(formEditProfile, config);
const validatorCardForm = new FormValidator(formAddCard, config);
validatorProfileForm.enableValidation();
validatorCardForm.enableValidation();
