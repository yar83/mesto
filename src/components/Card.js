export default class Card {
  constructor(cardData, templateSelector, handleCardClick) {
    this._name = cardData.name;
    this._link = cardData.link;
    this._templateSelector = templateSelector;
    this._handleCardClick = handleCardClick;
    this._altText = 'Изображение ' + cardData.name;
  }

  _getTemplate = () => {
    return document.querySelector(this._templateSelector).content.querySelector('.card').cloneNode(true);
  }

  _setData = () => {
    const picture = this._cardElement.querySelector('.card__picture');
    this._cardElement.querySelector('.card__place').textContent = this._name;
    picture.src = this._link;
    picture.setAttribute('alt', this._altText);
  }

  _setEventListeners = () => {
    this._cardElement.querySelector('.card__trashbin').addEventListener('click', (event) => { this._removeCard(event.target) });
    this._cardElement.querySelector('.card__heart').addEventListener('click', (event) => { this._toggleLike(event.target) });
    this._cardElement.querySelector('.card__picture').addEventListener('click', (event) => { this._handleCardClick({imgSrc: this._link, altText: this._altText})});
  }

  _removeCard = target => {
    target.closest('.card').remove();
  }

  _toggleLike = target => {
    target.classList.toggle('card__heart_color_black');
  }

  getCard = () => {
    this._cardElement = this._getTemplate();
    this._setData();
    this._setEventListeners();
    return this._cardElement;
  }
}
