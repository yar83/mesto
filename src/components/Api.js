export default class Api {

  #baseApiUrl;
  #token;

  #btnSaveProfileInfo;
  #btnSaveNewCard;
  #btnSaveNewAvatar;

  constructor( {baseApiUrl, token} ) {
    this.#baseApiUrl = baseApiUrl;
    this.#token = token;

    this.#btnSaveProfileInfo = document.querySelector('.form__entity_profile').querySelector('.form__button');
    this.#btnSaveNewCard = document.querySelector('.form__entity_add-card').querySelector('.form__button');
    this.#btnSaveNewAvatar = document.querySelector('.form__entity_update-avatar').querySelector('.form__button');
  }

  getInitialCards() {
    return fetch(`${this.#baseApiUrl}cards`, {
      headers: {
        authorization: this.#token
      }
    })
    .then(res => {
      if (res.ok) {
        return res.json();
      }
      return Promise.reject(`Ошибка: ${res.status}`);
    });
  }

  getUser() {
    return fetch(`${this.#baseApiUrl}users/me`, {
      headers: {
        authorization: this.#token
      }
    })
    .then(res => {
      if (res.ok) {
        return res.json();
      }
      return Promise.reject(`Ошибка: ${res.status}`);
    });
  }

  updateUserInfo(userData) {
    this.#btnSaveProfileInfo.textContent = 'Сохранение...';
    return fetch(`${this.#baseApiUrl}users/me`, {
      method: 'PATCH',
      headers: {
        authorization: this.#token,
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        name: userData.name,
        about: userData.about
      })
    })
    .then(res => {
      if (res.ok) {
        this.#btnSaveProfileInfo.textContent = 'Сохранить';
        return res.json();
      }
      this.#btnSaveProfileInfo.textContent = 'Сохранить';
      return  Promise.reject(`Ошибка: ${res.status}`);
    });
  }

  updateUserAvatar(avatarSrc) {
    this.#btnSaveNewAvatar.textContent = 'Сохранение...';
    return fetch(`${this.#baseApiUrl}users/me/avatar`, {
      method: 'PATCH',
      headers: {
        authorization: this.#token,
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        avatar: avatarSrc
      })
    })
    .then(res => {
      if (res.ok) {
        this.#btnSaveNewAvatar.textContent = 'Сохранить';
        return res.json();
      }
      this.#btnSaveNewAvatar.textContent = 'Сохранить';
      return Promise.reject(`Ошибка: ${res.status}`);
    });
  }

  addNewCard(name, link) {
    this.#btnSaveNewCard.textContent = 'Сохранение...';
    return fetch(`${this.#baseApiUrl}cards`, {
      method: 'POST',
      headers: {
        authorization: this.#token,
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        name: name,
        link: link
      })
    })
    .then(res => {
      if (res.ok) {
        this.#btnSaveNewCard.textContent = 'Создать';
        return res.json();
      }
      this.#btnSaveNewCard.textContent = 'Создать';
      return Promise.reject(`Ошибка: ${res.status}`);
    });
  }

  likeCard(cardId) {
    return fetch(`${this.#baseApiUrl}cards/likes/${cardId}`, {
      method: 'PUT',
      headers: {
        authorization: this.#token
      }
    })
    .then(res => {
      if (res.ok) {
        return res.json();
      }
      return Promise.reject(`Ошибка: ${res.status}`);
    });
  }

  dislikeCard(cardId) {
    return fetch(`${this.#baseApiUrl}cards/likes/${cardId}`, {
      method: 'DELETE',
      headers: {
        authorization: this.#token
      }
    })
    .then(res => {
      if (res.ok) {
        return res.json();
      }
      return Promise.reject(`Ошибка: ${res.status}`);
    });
  }

  deleteCard(cardId) {
    console.log(`${this.#baseApiUrl}cards/${cardId}`);
    return fetch(`${this.#baseApiUrl}cards/${cardId}`, {
      method: 'DELETE',
      headers: {
        authorization: this.#token
      }
    })
    .then(res => {
      if (res.ok) {
        return res.json();
      }
      return Promise.reject(`Ошибка: ${res.status}`);
    })
  }
}
