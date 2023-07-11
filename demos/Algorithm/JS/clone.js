function clone(target, map = new WeakMap()) {
  if (typeof target !== 'object' || target === null) {
    return target;
  }
  const cloneObj = Array.isArray(target) ? [] : {};
  if (map.has(target)) {
    return target;
  }
  map.set(target, true);
  for (const key in target) {
    cloneObj[key] = clone(target[key], map);
  }
  return cloneObj;
}

const test = {
  a: 1,
  b: 'sdsd',
  c: { a: 1, b: 2 },
  d: [1, 2, 3],
};
test.e = test;

console.log(clone(test));
