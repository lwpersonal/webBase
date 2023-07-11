function debounce(fn, time, firstEx = true) {
  let timer;
  return function (...args) {
    const _this = this;
    timer && clearTimeout(timer);
    // 首次触发执行
    if (firstEx) {
      !timer && fn.call(_this, ...args);
      timer = setTimeout(() => (timer = null), time);
    } else {
      timer = setTimeout(() => fn.call(_this, ...args), time);
    }
  };
}
window.debounce = debounce;
