function curry(fn, len = fn.length) {
  return function handler(...args) {
    if (args.length >= len) {
      return fn.call(this, ...args);
    } else {
      return handler.bind(this, ...args);
    }
  };
}

function add(a, b, c = 0) {
  return a + b + c;
}
function main() {
  const fn = curry(add, 3);
  console.log(fn(1)(2, 3));
  console.log(fn(1)(2)(10));
}

main();
