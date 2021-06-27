export default class PopupWithImage extends Popup {
  constructor({popupSelector, handleCardClick, imgSrc, altText}) {
    super(popupSelector);
    this._imgSrc = imgSrc;
    this._altText = altText;
    this._handleCardClick = handleCardClick;
  }

  open() {
    super.open();
  }
}
