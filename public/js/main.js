import { _ } from './util.js';
import { Menu } from './Menu.js';
import { Weather } from './Weather.js';
import { Timer } from './Timer.js';
import { Memo } from './Memo.js';

const DOMTargets = {
  menu: _.$('.menu'),
  menuBtn: _.$('.main-view-btn'),
  timer: {
    btn: _.$('.timer-btn'),
    hours: _.$('.hour'),
    minutes: _.$('.minute'),
    seconds: _.$('.second'),
    start: _.$('.btn-start'),
    finish: _.$('.btn-finish'),
  },
  view: {
    toDoWrap: _.$('.view-todo'),
    toDoLists: _.$('.todo-lists'),
    input: _.$('.input-memo'),
  },
  weather: {
    textWrap: _.$('.weather-text'),
    imgWrap: _.$('.weather-img'),
  },
};

const main = () => {
  new Menu(DOMTargets);
  new Weather(DOMTargets);
  new Timer(DOMTargets);
  new Memo(DOMTargets);
};

main();
