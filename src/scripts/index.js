import Card from '../components/Card.js';
import FormValidator from '../components/FormValidator.js';
import Section from '../components/Section.js';
import Popup from '../components/Popup.js';
import PopupWithImage from '../components/PopupWithImage.js';
import PopupWithForm from '../components/PopupWithForm.js';
import UserInfo from '../components/UserInfo.js';
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
validatorProfileForm.enableValidation();
validatorCardForm.enableValidation();

//создать один раз экземлпляр класса PopupWithImage
const popupWithImage = new PopupWithImage('.fullszimg-popup');

const createCard = (item) => {
  return new Card(item, cardTemplate, ( data ) => {
    //вызвать метод с передачей аргументов
    popupWithImage.open(data.imgSrc, data.altText);
    popupWithImage.setEventListeners();
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


const userInfo = new UserInfo( {name: '.profile__name', about: '.profile__about' } );


const formProfile = new PopupWithForm('.popup_edit-profile', (formValues) => {
  userInfo.setUserInfo( {name: Object.values(formValues)[0], about: Object.values(formValues)[1]} );  
});

formProfile.setEventListeners();

openPopupProfile.addEventListener('click', () => {
  formProfile.open();
  const userData = userInfo.getUserInfo();
  formProfile.setInitialFormData(userData);
});


const formPopup = new PopupWithForm('.popup_add-card', (formValues) => {
  const newCard = createCard( {name: Object.values(formValues)[0], link: Object.values(formValues)[1]} );
  cardList.addItem(newCard);
});

formPopup.setEventListeners();

openPopupAddCard.addEventListener('click', () => { 
  formPopup.open();
  validatorCardForm.hideAllInputsErrors();
  validatorCardForm.toggleButtonState(); 
});
