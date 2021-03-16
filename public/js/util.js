const _ = {
  $: (selector) => document.querySelector(selector),
  $All: (selector) => document.querySelectorAll(selector),
  on: (el, action, callback) => el.addEventListener(action, callback),
  addClass: (el, className) => el?.classList.add(className),
  rmClass: (el, className) => el?.classList.remove(className),
  toggleClass: (el, className) => el?.classList.toggle(className),
  contains: (el, className) => el?.classList.contains(className),
  genEl: (tagName, { classNames, template, attributes } = {}) => {
    const $el = document.createElement(tagName);
    if (classNames) $el.classList.add(...classNames);
    if (template) $el.innerHTML = template;
    if (attributes)
      Object.entries(attributes).forEach(([k, v]) => $el.setAttribute(k, v));
    return $el;
  },
};

const delay = (data, time) => {
  return new Promise((resolve, reject) => {
    setTimeout(() => resolve(data), time);
  });
};

const insertTemplate = (target, where, template) => {
  return target.insertAdjacentHTML(where, template);
};

export const debounce = (fn, ms) => {
  let timerID;
  return (...args) => {
    if (timerID) clearTimeout(timerID);
    timerID = setTimeout(() => {
      fn(args);
    }, ms);
  };
};
export { _, delay, insertTemplate };
