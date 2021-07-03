import {Card, FormValidator, Section, Popup, PopupWithImage, PopupWithForm, UserInfo} from '../components/index.js';
 
import {
  initialCards, 
  openPopupAddCard,
  openPopupProfile,
  formEditProfile,
  formAddCard,
  cardTemplate,
  config
} from '../utils/constants.js';
import '../pages/index.css';

const validatorProfileForm = new FormValidator(formEditProfile, config);
const validatorCardForm = new FormValidator(formAddCard, config);
const popupWithImage = new PopupWithImage('.fullszimg-popup');



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

const userInfo = new UserInfo( {name: '.profile__name', about: '.profile__about' } );

const formProfile = new PopupWithForm('.popup_edit-profile', (formValues) => {
  userInfo.setUserInfo( {name: Object.values(formValues)[0], about: Object.values(formValues)[1]} );  
});

const formPopup = new PopupWithForm('.popup_add-card', (formValues) => {
  const newCard = createCard( {name: Object.values(formValues)[0], link: Object.values(formValues)[1]} );
  cardList.addItem(newCard);
});

const createCard = (item) => {
  return new Card(item, cardTemplate, ( data ) => {
    popupWithImage.open(data.imgSrc, data.altText);
    }).getCard();
}

popupWithImage.setEventListeners();
formProfile.setEventListeners();
formPopup.setEventListeners();

openPopupProfile.addEventListener('click', () => {
  formProfile.open();
  validatorProfileForm.resetValidation();
  const userData = userInfo.getUserInfo();
  formProfile.setInitialFormData(userData);
});

openPopupAddCard.addEventListener('click', () => { 
  formPopup.open();
  validatorCardForm.resetValidation();
  validatorCardForm.toggleButtonState(); 
});

cardList.renderItems();
validatorProfileForm.enableValidation();
validatorCardForm.enableValidation();
