export default class Section {

  #renderer;
  #container;

  constructor(renderer, containerSelector) {
    this.#renderer = renderer;
    this.#container = document.querySelector(containerSelector);
  }

  rendererItems(cards) {
    cards.forEach(card => this.#renderer(card));
  }

  addItem(item) {
    this.#container.prepend(item);
  }
}
