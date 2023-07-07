var fib = function (n) {
  const map = new Map();
  map.set(0, 0);
  map.set(1, 1);

  function fn(n) {
    if (map.has(n)) {
      return map.get(n);
    } else if (n === 0 || n === 1) {
      return n;
    }
    const num = fn(n - 1) + fn(n - 2);
    map.set(n, num);
    return num;
  }
  return fn(n);
};

console.log(fib(7));

// 0 1 1 2 3 5 8 13
