import Popup from './Popup.js'; 

export default class PopupWithImage extends Popup {

  #img;
  #altText;

  constructor(popupSelector) {
    super(popupSelector);
    this.#img = this.popupItem.querySelector('.fullszimg-popup__image');
    this.#altText = this.popupItem.querySelector('.fullszimg-popup__title');
  }

  open(imgSrc, altText) {
    super.open();
    this.#img.src = imgSrc;
    this.#altText.textContent = altText;
  }
}
