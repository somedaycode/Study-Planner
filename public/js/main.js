import { _ } from './util.js';
import { Menu } from './Menu.js';

const DOMTargets = {
  menu: _.$('.menu'),
  menuBtn: _.$('.main-view-btn'),
};

const main = () => {
  new Menu(DOMTargets);
};

_.on(window, 'DOMContentLoaded', main);
