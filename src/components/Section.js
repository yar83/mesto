export default class Section {
  
  #container;

  constructor(containerSelector) {
    this.#container = document.querySelector(containerSelector);
  }

  addItem(item) {
    this.#container.prepend(item);
  }
}
