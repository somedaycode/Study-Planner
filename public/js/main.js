import { _ } from './util.js';
import { Menu } from './Menu.js';
import { Weather } from './Weather.js';
import { Timer } from './Timer.js';

const DOMTargets = {
  menu: _.$('.menu'),
  menuBtn: _.$('.main-view-btn'),
  timer: {
    btn: _.$('.timer-btn'),
    hours: _.$('.hour'),
    minutes: _.$('.minute'),
    seconds: _.$('.second'),
    start: _.$('.btn-start'),
    stop: _.$('.btn-stop'),
  },
};

const main = () => {
  new Menu(DOMTargets);
  new Weather(DOMTargets);
  new Timer(DOMTargets);
};

main();
