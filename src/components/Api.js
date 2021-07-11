export default class Api {

  #baseApiUrl;
  #token;

  constructor( {baseApiUrl, token} ) {
    this.#baseApiUrl = baseApiUrl;
    this.#token = token;
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
        return res.json();
      }
      return  Promise.reject(`Ошибка: ${res.status}`);
    });
  }

  updateUserAvatar(avatarSrc) {
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
        return res.json();
      }
      return Promise.reject(`Ошибка: ${res.status}`);
    });
  }

  addNewCard(name, link) {
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
        return res.json();
      }
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
}
