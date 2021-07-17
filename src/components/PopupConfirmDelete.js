import Popup from './Popup.js'

export default class PopupConfirmDelete extends Popup {

  #handleButtonClick;
  #handleSuccessConfirm;
  #delConfirmButton;
  #cardId;
  #cardElem;

  constructor(popupSelector, {handleButtonClick, handleSuccessConfirm } ) {
    super(popupSelector);
    this.#handleButtonClick = handleButtonClick;
    this.#handleSuccessConfirm = handleSuccessConfirm;
    this.#delConfirmButton = this.popupItem.querySelector('.delcard-popup__buttonyes');
  }

  setEventListeners() {
    super.setEventListeners();
    this.#delConfirmButton.addEventListener('click', () => {
      this.#handleButtonClick(this.#cardId)
      .then(() => {
        this.#handleSuccessConfirm(this.#cardElem);
        this.close();
      })
      .catch(err => {
        console.log('Невозможно удалить карочку: ' + err);
        this.close();
      });
    });
  }

  setCardData(cardId, cardElem) {
    this.#cardId = cardId;
    this.#cardElem = cardElem;
  }
}
