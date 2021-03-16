import { _ } from './util.js';

class Menu {
  constructor({ menu, menuBtn }) {
    this.$menu = menu;
    this.$menuBtn = menuBtn;
    this.init();
  }

  init() {
    this.onEvents();
  }

  onEvents() {
    _.on(this.$menuBtn, 'click', this.barClickHandler.bind(this));
  }

  barClickHandler() {
    _.toggleClass(this.$menu, 'hidden');
  }
}

export { Menu };
