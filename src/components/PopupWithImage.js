import Popup from './Popup.js'; 

export default class PopupWithImage extends Popup {
  constructor(popupSelector) {
    super(popupSelector);
    this._currentPopup = document.querySelector(popupSelector);
  }

  open(imgSrc, altText) {
    super.open();
    this._currentPopup.querySelector('.fullszimg-popup__image').src = imgSrc;
    this._currentPopup.querySelector('.fullszimg-popup__title').textContent = altText;
  }
}
