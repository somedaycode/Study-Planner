import { _ } from './util.js';

export class Timer {
  constructor({ timer }) {
    this.timerBtn = timer['btn'];
    this.hours = timer['hours'];
    this.minutes = timer['minutes'];
    this.seconds = timer['seconds'];
    this.startBtn = timer['start'];
    this.finishBtn = timer['finish'];
    this.timerID;
    this.startTime = 0;
    this.endTime = 0;
    this.isRunning = false;
    this.init();
  }

  init() {
    this.onEvents();
  }

  onEvents() {
    _.on(this.timerBtn, 'click', this.startBtnClickhandler.bind(this));
    _.on(this.finishBtn, 'click', this.finishBtnClickhandler.bind(this));
  }

  startBtnClickhandler({ target }) {
    if (!target.closest('.btn-start')) return;
    if (this.isRunning === true) return this.stopTimer();

    if (this.startTime === 0) {
      this.startTime = Date.now();
    } else {
      this.startTime += Date.now() - this.endTime;
    }
    this.finishBtnOn();
    this.runTimer();
  }

  finishBtnClickhandler({ target }) {
    if (!target.closest('.btn-finish')) return;
    this.isRunning = false;
    this.stopTimer();
    this.finishBtnOff();
    this.saveStudyTime();
    this.resetTimer();
  }

  runTimer() {
    this.isRunning = true;
    this.timerID = setInterval(() => {
      const currTime = Date.now();
      const newTime = new Date(currTime - this.startTime);
      this.printTime(newTime);
    }, 1000);
    this.renameBtn();
  }

  printTime(time) {
    this.seconds.textContent = this.getSeconds(time);
    this.minutes.textContent = this.getMinutes(time);
    this.hours.textContent = this.getHours(time);
  }

  getSeconds(time) {
    let seconds = time.getSeconds();
    return seconds < 10 ? '0' + seconds : seconds;
  }

  getMinutes(time) {
    let minutes = time.getMinutes();
    return minutes < 10 ? '0' + minutes : minutes;
  }

  getHours(time) {
    let hours = time.getUTCHours();
    return hours < 10 ? '0' + hours : hours;
  }

  stopTimer() {
    clearTimeout(this.timerID);
    this.endTime = Date.now();
    this.isRunning = false;
    this.renameBtn();
  }

  renameBtn() {
    this.isRunning
      ? (this.startBtn.textContent = 'Pause')
      : (this.startBtn.textContent = 'Start');
  }

  finishBtnOn() {
    this.finishBtn.disabled = false;
  }

  finishBtnOff() {
    this.finishBtn.disabled = true;
  }

  resetTimer() {
    const zeroText = '00';
    this.seconds.textContent = zeroText;
    this.minutes.textContent = zeroText;
    this.hours.textContent = zeroText;
    this.startTime = 0;
    this.endTime = 0;
  }

  saveStudyTime() {
    const currentTime = new Date();
    const hours = this.hours.textContent;
    const minutes = this.minutes.textContent;
    const seconds = this.seconds.textContent;
    const studyTime = `${hours}:${minutes}:${seconds}`;
    localStorage.setItem(currentTime, studyTime);
  }
}
