import { _ } from './util.js';
import { Menu } from './Menu.js';
import { Weather } from './Weather.js';

const DOMTargets = {
  menu: _.$('.menu'),
  menuBtn: _.$('.main-view-btn'),
};

const main = async () => {
  new Menu(DOMTargets);
  new Weather(DOMTargets);
};

_.on(window, 'DOMContentLoaded', main);
