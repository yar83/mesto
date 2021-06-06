export const config = {
  formSelector: '.form__entity',
  fieldsetInputsSelector: '.form__items',
  inputSelector: '.form__item',
  submitButtonSelector: '.form__button',
  inactiveButtonClass: 'form__button_inactive',
  inputErrorClass: 'form__item_type_error',
};

export const placesList = document.querySelector('.places__list');

export const openPopupProfile = document.querySelector('.profile__button-edit');
export const openPopupAddCard = document.querySelector('.profile__button-add');

export const formEditProfile = document.querySelector('.form__entity_profile');
export const formAddCard = document.querySelector('.form__entity_add-card');

export const popups = document.querySelectorAll('.popup');
export const popupProfile = document.querySelector('.popup_edit-profile');
export const popupAddCard = document.querySelector('.popup_add-card');
export const popupFullSizeImage = document.querySelector('.fullszimg-popup');
export const fullSizeImage = popupFullSizeImage.querySelector('.fullszimg-popup__image')
export const fullSizeImageTitle = popupFullSizeImage.querySelector('.fullszimg-popup__title');

export const profilePersonName = document.querySelector('.profile__name');
export const profilePersonAbout = document.querySelector('.profile__about');
export const formFieldName = document.querySelector('.form__item_el_name');
export const formFieldAbout = document.querySelector('.form__item_el_about');
export const formCardTitle = document.querySelector('.form__item_el_card-title');
export const formCardLink = document.querySelector('.form__item_el_card-link');

export const cardTemplate = '#card-template';
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
