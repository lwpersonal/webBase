function test(n = 100) {
  if (n < 0) {
    return;
  }
  console.log(11111);
  process.nextTick(() => test(n - 1));
  Promise.resolve().then(() => {
    console.log('promise 1')
  })
}

function test2(n = 100) {
  if (n < 0) {
    return;
  }
  console.log(1);
  setTimeout(() => test2(n - 1));
  Promise.resolve().then(() => {
    console.log('promise 2')
  })
}

// test(5);
test2(5);
console.log(2);
Promise.resolve().then(() => {
  console.log('promise')
})
setImmediate(() => {
  console.log('setImmediate');
})
setTimeout(() => {
  console.log('setTimeout');
})
