import {Card, FormValidator, Section, Popup, PopupWithImage, PopupWithForm, PopupConfirmDelete, UserInfo, Api} from '../components/components.js';
 
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

const cardList = new Section(
  (card) => cardList.addItem(createCard(card)), 
  '.places__list'
);

const userInfo = new UserInfo(userInfoElements)

const formUserProfileData = new PopupWithForm('.popup_edit-profile', {
  handleFormSubmit: (formValues) => {
    formUserProfileData.setButtonBusyMode(true);
    api.updateUserInfo(formValues)
    .then(res => {
      userInfo.setUserInfo(res);
      updateCurrentUser(res);
      formUserProfileData.close();
      formUserProfileData.setButtonBusyMode(false);
    })
    .catch(err => {
      console.log('Невозможно обновить данные пользователя: ' + err);
    })
    .finally(() => formUserProfileData.setButtonBusyMode(false));
  }
});

const formAddNewCard = new PopupWithForm('.popup_add-card', {
  handleFormSubmit: ( {name, link} ) => {
  formAddNewCard.setButtonBusyMode(true);
    console.log(name, link);
  api.addNewCard(name, link)
    .then(card => {
      cardList.addItem(createCard(card));
      formAddNewCard.close();
      formAddNewCard.setButtonBusyMode(false);
    })
    .catch(err => {
      console.log('Невозможно добавить новую карточку: ' + err);
    })
    .finally(() => formAddNewCard.setButtonBusyMode(false));
  }
});

const formAvatar =  new PopupWithForm('.popup_update-avatar', {

  handleFormSubmit: ( {link} ) => {
  formAvatar.setButtonBusyMode(true);
  api.updateUserAvatar(link)
    .then(res => {
      userInfo.setUserAvatar(res);
      formAvatar.close();
      formAvatar.setButtonBusyMode(false);
    })
    .catch(err => {
      console.log('Невозможно обновить аватар: ' + err);
    })
    .finally(() => formAvatar.setButtonBusyMode(false));
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
      popupConfirmDelete.open();
      popupConfirmDelete.setCardData(cardId, cardElem);
    }

  })
    .getCard();
}

Promise.all([api.getUser(), api.getInitialCards()])
  .then(values => {
    updateCurrentUser(values[0]);
    userInfo.setUserInfo(currentUser);
    userInfo.setUserAvatar(currentUser);
    cardList.rendererItems(values[1]);
  })
  .catch(err => console.log('Невозможно получить начальные данные с сервера ' + err));


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
