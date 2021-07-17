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

  #heart;
  #picture;
  #likeNumber;
  #trashbin;
  #place;

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
    this.#heart = this.#templateCopy.querySelector('.card__heart');
    this.#picture = this.#templateCopy.querySelector('.card__picture');
    this.#likeNumber = this.#templateCopy.querySelector('.card__likes-number');
    this.#trashbin = this.#templateCopy.querySelector('.card__trashbin');
    this.#place = this.#templateCopy.querySelector('.card__place');
    if (this.#isMyCard()) this.#setTrashBinIcon();
    return this.#templateCopy;
  }

  #setTrashBinIcon() {
    this.#trashbin.classList.add('card__trashbin_visible');
  }

  #isMyCard() {
    return this.#currentUserId === this.#cardOwnerId ? true : false;
  }

  #hasMyLike() {
    return this.#cardLikers.some(liker => liker._id === this.#currentUserId);
  }

  #setData() {
    this.#place.textContent = this.#name;
    this.#setLikes();
    if (this.#hasMyLike()) this.#setLike();
    this.#picture.src = this.#link;
    this.#picture.setAttribute('alt', this.#altText);
  }

  #setLikes() {
    this.#likeNumber.textContent = this.#likeCount;
  }

  #setEventListeners() {
    this.#trashbin.addEventListener('click', () => { 
      this.#handleTrashbinClick(this.#cardId, this.#cardElement); 
    });

    this.#heart.addEventListener('click', () => { 
      const newDataCurrentCard = this.#hasMyLike() ? this.#handleCardDislike(this.#cardId) : this.#handleCardLike(this.#cardId);
      newDataCurrentCard
      .then(res => {
        this.#likeCount = res.likes.length;
        this.#setLikes();
        this.#cardLikers = res.likes;
        this.#hasMyLike() ? this.#setLike() : this.#clearLike();
      })
      .catch(err => console.log('Ошибка: ' + err));
    });

    this.#picture.addEventListener('click', (event) => { this.#handleCardClick({imgSrc: this.#link, altText: this.#altText})});
  }

  #removeCard() {
    this.#cardElement.remove();
    this.#cardElement = null;
  }

  #setLike() {
    this.#heart.classList.add('card__heart_color_black');

  }

  #clearLike() {
    this.#heart.classList.remove('card__heart_color_black');
  }

  getCard = () => {
    this.#cardElement = this.#getTemplate();
    this.#setData();
    this.#setEventListeners();
    return this.#cardElement;
  }
}
