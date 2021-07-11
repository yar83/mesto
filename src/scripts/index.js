import {Card, FormValidator, Section, Popup, PopupWithImage, PopupWithForm, PopupConfirmDelete, UserInfo, Api} from '../components/index.js';
 
import {
  openPopupAddCard,
  openPopupProfile,
  openPopupEditAvatar,
  formEditProfile,
  formAddCard,
  formUpdateAvatar,
  cardTemplate,
  config,
  apiCredits,
  userInfoElements
} from '../utils/constants.js';
import '../pages/index.css';

let currentUser = {};

const validatorProfileForm = new FormValidator(formEditProfile, config);
const validatorCardForm = new FormValidator(formAddCard, config);
const validatorAvatarForm = new FormValidator(formUpdateAvatar, config);
const popupWithImage = new PopupWithImage('.fullszimg-popup');

const popupConfirmDelete = new PopupConfirmDelete('.delcard-popup', {

  handleButtonClick: (cardId) => {
    console.log(cardId + ' this button clicked');
    return api.deleteCard(cardId);
  },

  handleSuccessConfirm: (cardElem) => {
    cardElem.remove();
    cardElem = null;
  }
});

popupConfirmDelete.setEventListeners();

const api = new Api(apiCredits);

const updateCurrentUser = (userData) => {
  currentUser.name = userData.name;
  currentUser.about = userData.about;
  currentUser.avatar = userData.avatar;
  currentUser.cohort = userData.cohort;
  currentUser._id = userData._id;
}

api.getUser().then(res => {
  updateCurrentUser(res);
});

const cardList = new Section('.places__list');

const userInfo = new UserInfo(userInfoElements)

const formUserProfileData = new PopupWithForm('.popup_edit-profile', {
  handleFormSubmit: (formValues) => {
    api.updateUserInfo( {name: Object.values(formValues)[0], about: Object.values(formValues)[1]} )
      .then(res => {
        userInfo.setUserInfo(res);
        updateCurrentUser(res);
      });
  }
});

const formAddNewCard = new PopupWithForm('.popup_add-card', {
  handleFormSubmit: (formValues) => {
  api.addNewCard(Object.values(formValues)[0], Object.values(formValues)[1])
    .then(card => {
      const newCard = createCard(card);
      cardList.addItem(newCard);
    });
  }
});

const formAvatar =  new PopupWithForm('.popup_update-avatar', {

  handleFormSubmit: (formValues) => {
  api.updateUserAvatar(Object.values(formValues)[0])
    .then(res => userInfo.setUserAvatar(res));
  }

});

const createCard = (card) => {
  return new Card(card, currentUser, cardTemplate, {

    handleCardClick: (data) => {
      popupWithImage.open(data.imgSrc, data.altText);
    },

    handleCardLike: (cardId) => {
      return api.likeCard(cardId)
    },

    handleCardDislike: (cardId) => {
      return api.dislikeCard(cardId)
    },

    handleTrashbinClick: (cardId, cardElem) => {
      console.log('Clicked card with ID: ', cardId, 'elem: ', cardElem);
      popupConfirmDelete.open();
      popupConfirmDelete.getCardData(cardId, cardElem);
    }

  })
    .getCard();
}

api.getInitialCards().then(cards => {
  cards.forEach(card => cardList.addItem(createCard(card)));
});

api.getUser().then(res => {
  userInfo.setUserInfo(res);
  userInfo.setUserAvatar(res);
});


popupWithImage.setEventListeners();
formUserProfileData.setEventListeners();
formAddNewCard.setEventListeners();
formAvatar.setEventListeners();

openPopupProfile.addEventListener('click', () => {
  formUserProfileData.open();
  validatorProfileForm.resetValidation();
  const userData = userInfo.getUserInfo();
  formUserProfileData.setInitialFormData(userData);
});

openPopupAddCard.addEventListener('click', () => { 
  formAddNewCard.open();
  validatorCardForm.resetValidation();
  validatorCardForm.toggleButtonState(); 
});

openPopupEditAvatar.addEventListener('click', () => {
  formAvatar.open();
  validatorAvatarForm.resetValidation();
  validatorAvatarForm.toggleButtonState();
});


validatorProfileForm.enableValidation();
validatorCardForm.enableValidation();
validatorAvatarForm.enableValidation();
