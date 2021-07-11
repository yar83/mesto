export default class Card {
  #name;
  #link;
  #cardId;
  #cardOwnerId;
  #templateSelector;
  #templateCopy;
  #handleCardClick;
  #handleCardLike; 
  #handleCardDislike;
  #handleTrashbinClick;
  #altText;
  #cardElement;
  #trashBinElement;
  #currentUserId;
  #likeCount;
  #cardLikers;

  constructor(cardData, currentUser, templateSelector, {handleCardClick, handleCardLike, handleCardDislike, handleTrashbinClick } ) {
    this.#name = cardData.name;
    this.#link = cardData.link;
    this.#cardId = cardData._id;
    this.#cardOwnerId = cardData.owner._id;
    this.#templateSelector = templateSelector;
    this.#handleCardClick = handleCardClick;
    this.#handleCardLike = handleCardLike;
    this.#handleCardDislike = handleCardDislike;
    this.#handleTrashbinClick = handleTrashbinClick;
    this.#altText = 'Изображение ' + cardData.name;
    this.#currentUserId = currentUser._id;
    this.#likeCount = cardData.likes.length;
    this.#cardLikers = cardData.likes;
  }

  #getTemplate() {
    this.#templateCopy = document.querySelector(this.#templateSelector).content.querySelector('.card').cloneNode(true);
    if (this.#isMyCard()) this.#setTrashBinIcon();
    return this.#templateCopy;
  }

  #setTrashBinIcon() {
    this.#templateCopy.querySelector('.card__trashbin').classList.add('card__trashbin_visible');
  }

  #isMyCard() {
    return this.#currentUserId === this.#cardOwnerId ? true : false;
  }

  #hasMyLike() {
    return this.#cardLikers.some(liker => liker._id === this.#currentUserId);
  }

  #setData() {
    const picture = this.#cardElement.querySelector('.card__picture');
    this.#cardElement.querySelector('.card__place').textContent = this.#name;
    this.#setLikes();
    if (this.#hasMyLike()) this.#setLike();
    picture.src = this.#link;
    picture.setAttribute('alt', this.#altText);
  }

  #setLikes() {
    this.#cardElement.querySelector('.card__likes-number').textContent = this.#likeCount;
  }

  #setEventListeners() {
    this.#cardElement.querySelector('.card__trashbin').addEventListener('click', () => { 
      this.#handleTrashbinClick(this.#cardId, this.#cardElement); 
    });

    this.#cardElement.querySelector('.card__heart').addEventListener('click', () => { 
      const newDataCurrentCard = this.#hasMyLike() ? this.#handleCardDislike(this.#cardId) : this.#handleCardLike(this.#cardId);
      newDataCurrentCard.then(res => {
        this.#likeCount = res.likes.length;
        this.#setLikes();
        this.#cardLikers = res.likes;
        this.#hasMyLike() ? this.#setLike() : this.#clearLike();
      });
    });

    this.#cardElement.querySelector('.card__picture').addEventListener('click', (event) => { this.#handleCardClick({imgSrc: this.#link, altText: this.#altText})});
  }

  #removeCard() {
    this.#cardElement.remove();
    this.#cardElement = null;
  }

  #setLike() {
    this.#cardElement.querySelector('.card__heart').classList.add('card__heart_color_black');
  }

  #clearLike() {
    this.#cardElement.querySelector('.card__heart').classList.remove('card__heart_color_black');
  }


  

  getCard = () => {
    this.#cardElement = this.#getTemplate();
    this.#setData();
    this.#setEventListeners();
    return this.#cardElement;
  }
}
