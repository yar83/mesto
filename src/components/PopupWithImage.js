import Popup from './Popup.js'; 

export default class PopupWithImage extends Popup {
  constructor(popupSelector) {
    super(popupSelector);
    this._currentPopup = document.querySelector(popupSelector);
  }

  open() {
    super.open(imgSrc, altText);
    this._currentPopup.querySelector('.fullszimg-popup__image').src = this.imgSrc;
    this._currentPopup.querySelector('.fullszimg-popup__title').textContent = this.altText;
  }
}
