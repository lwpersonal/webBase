function throttle(fn, time) {
  let lastTime = 0;
  return function (...args) {
    const nowTimeNum = new Date().getTime();
    if (nowTimeNum - lastTime >= time) {
      fn(...args);
      lastTime = nowTimeNum;
    }
  };
}
window.throttle = throttle;
