export default class UserInfo {

  #nameElement;
  #aboutElement;
  #avatarElement;

  constructor( {name, about, avatar} ) {
    this.#nameElement = document.querySelector(name);
    this.#aboutElement = document.querySelector(about);
    this.#avatarElement = document.querySelector(avatar);
  }

  getUserInfo() {
    return { name: this.#nameElement.textContent, about: this.#aboutElement.textContent };
  }

  setUserInfo(userInfo) {
    this.#nameElement.textContent = userInfo.name;
    this.#aboutElement.textContent = userInfo.about;
  }

  setUserAvatar(userInfo) {
    this.#avatarElement.src = userInfo.avatar;
  }
}
