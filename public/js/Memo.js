import { _, insertTemplate } from './util.js';

export class Memo {
  constructor({ view }) {
    this.toDoWrap = view.toDoWrap;
    this.toDoLists = view.toDoLists;
    this.toDoinput = view.input;
    this.init();
  }

  init() {
    this.onEvents();
  }

  onEvents() {
    _.on(this.toDoinput, 'keyup', this.keyupHandler.bind(this));
    _.on(this.toDoLists, 'click', this.checkClickHandler.bind(this));
    _.on(this.toDoLists, 'click', this.deleteClickHandler.bind(this));
  }

  keyupHandler({ keyCode }) {
    if (keyCode !== 13) return;
    if (!this.toDoinput.value) return;
    this.renderToDolist();
    this.initInputValue();
  }

  getToDoText() {
    return this.toDoinput.value;
  }

  getToDoTemplate() {
    const toDo = this.getToDoText();
    return `<li class="todo-list">
            <span class="check-circle">
            <i class="fa fa-circle-o"></i>
            <i class="fa fa-check check-hidden"></i>
            </span>
            <span class="task">${toDo}</span>
            <span class="list-trash"><i class="fa fa-trash-o"></i></span>
            </li>`;
  }

  renderToDolist() {
    const template = this.getToDoTemplate();
    insertTemplate(this.toDoLists, 'afterbegin', template);
  }

  initInputValue() {
    this.toDoinput.value = '';
  }

  checkClickHandler({ target }) {
    if (!target.closest('.check-circle')) return;
    const TODOElements = {
      list: target.closest('.todo-list'),
      check: target.closest('.fa-check'),
      task: target.closest('.todo-list').querySelector('.task'),
    };
    this.completeTask(TODOElements);
  }

  completeTask({ list, check, task }) {
    _.toggleClass(list, 'list-done');
    _.toggleClass(check, 'check-hidden');
    _.toggleClass(task, 'task-done');
  }

  deleteClickHandler({ target }) {
    if (!target.closest('.list-trash')) return;
    const currentList = target.closest('.todo-list');
    currentList.remove();
  }
}
