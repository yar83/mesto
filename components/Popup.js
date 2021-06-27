export default class Popup {
  constructor(popupSelector) {
    this._popupItem = document.querySelector(popupSelector);
  }

  open() {
    this._popupItem.classList.add('popup_opened');
    document.addEventListener('keyup', this._handleEscClose);
  }

  close() {
    this._popupItem.classList.remove('popup_opened');
    document.removeEventListener('keyup', this._handleEscClose);
  }

  _handleEscClose(evt) {
    if (evt.key === 'Escape') {
      this.close();
    }
  }

  setEventListeners() {
    this._popupItem.addEventListener('click', (evt) => {
      if (evt.target === this._popupItem) {
        this.close();
      }

      if (evt.target.classList.contains('popup__close')) {
        this.close();
      }
    });
  }
}
