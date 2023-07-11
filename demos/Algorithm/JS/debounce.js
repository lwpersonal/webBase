function debounce(fn, time) {
  let timer;
  return function (...args) {
    timer && clearTimeout(timer);
    timer = setTimeout(() => fn(...args), time);
  };
}
window.debounce = debounce;
