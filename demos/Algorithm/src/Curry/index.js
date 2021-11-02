function currying(cb) {
  let len = 0;
  function fn(...args) {
    console.log('args: ', args);
    // TAG 不支持可选参数
    // if (args.length >= cb.length) {
    //   return cb.call(null, ...args);
    // }
    if (args.length === len) {
      return cb.call(null, ...args);
    }
    len = args.length;
    return fn.bind(null, ...args);
  }
  return fn;
}

function add(a, b, c, d) {
  console.log('111: ', ...arguments);
  return a + b + c + d;
}

const fn = currying(add);
const a = fn(1, 2)(3)(4)();
console.log('result: ', a);
