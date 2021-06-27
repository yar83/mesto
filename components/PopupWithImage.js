import Popup from './Popup.js'; 

export default class PopupWithImage extends Popup {
  constructor(popupSelector, {imgSrc, altText}) {
    super(popupSelector);
    this._currentPopup = document.querySelector(popupSelector);
    this._imgSrc = imgSrc;
    this._altText = altText;
  }

  open() {
    super.open();
    console.log(this._currentPopup);
    this._currentPopup.querySelector('.fullszimg-popup__image').src = this._imgSrc;
    this._currentPopup.querySelector('.fullszimg-popup__title').textContent = this._altText;
  }
}
