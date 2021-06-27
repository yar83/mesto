export default class UserInfo {
  constructor( {name, about} ) {
    this._nameElement = document.querySelector(name);
    this._aboutElement = document.querySelector(about);
  }

  getUserInfo() {
    return { name: this._nameElement.textContent, about: this._aboutElement.textContent };
  }

  setUserInfo(userInfo) {
    this._nameElement.textContent = userInfo.name;
    this._aboutElement.textContent = userInfo.about;
  }
}
