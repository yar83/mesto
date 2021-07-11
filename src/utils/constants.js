export const initialCards = [
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

export const openPopupAddCard = document.querySelector('.profile__button-add');
export const openPopupProfile = document.querySelector('.profile__button-edit');
export const openPopupEditAvatar = document.querySelector('.profile__avatar-edit');

export const formEditProfile = document.querySelector('.form__entity_profile');
export const formAddCard = document.querySelector('.form__entity_add-card');
export const formUpdateAvatar = document.querySelector('.form__entity_update-avatar');
export const cardTemplate = '#card-template';

export const config = {
  formSelector: '.form__entity',
  fieldsetInputsSelector: '.form__items',
  inputSelector: '.form__item',
  submitButtonSelector: '.form__button',
  inactiveButtonClass: 'form__button_inactive',
  inputErrorClass: 'form__item_type_error',
};

export const userInfoElements = {
  name: '.profile__name', 
  about: '.profile__about', 
  avatar: '.profile__avatar-picture'
};

export const apiCredits = {
  baseApiUrl: 'https://mesto.nomoreparties.co/v1/cohort-25/',
  token: 'edd40284-3f07-410f-b675-d459a40ce2f2' 
};
