export default class Popup {

  popupItem;
  
  constructor(popupSelector) {
    this.popupItem = document.querySelector(popupSelector);
    this._handleEscClose = this._handleEscClose.bind(this);
  }

  open() {
    this.popupItem.classList.add('popup_opened');
    document.addEventListener('keyup', this._handleEscClose);
  }

  close() {
    this.popupItem.classList.remove('popup_opened');
    document.removeEventListener('keyup', this._handleEscClose);
  }

  _handleEscClose(evt) {
    if (evt.key === 'Escape') {
      this.close();
    }
  }

  setEventListeners() {
    this.popupItem.addEventListener('click', (evt) => {
      if (evt.target === this.popupItem) {
        this.close();
      }

      if (evt.target.classList.contains('popup__close')) {
        this.close();
      }
    });
  }
}
