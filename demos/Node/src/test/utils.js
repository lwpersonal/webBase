const fs = require('fs');

fs.readFile('./test.js', () => {
  setTimeout(() => {
    console.log('setTimeout - 0');
  }, 0);

  setImmediate(() => {
    console.log('setImmediate');
  });
});


// console.log('-----');

// setTimeout(() => {
//   console.log('setTimeout - 0');
// }, 0);

// setImmediate(() => {
//   console.log('setImmediate');
// });

// Promise.resolve().then(() => {
//   console.log('Promise');
// });

// process.nextTick(() => {
//   console.log('nextTick');
// });

// setTimeout(() => {
//   setTimeout(() => {
//     console.log('2、setTimeout - 0');
//   }, 0);
  
//   setImmediate(() => {
//     console.log('2、setImmediate');
//   });
  
//   Promise.resolve().then(() => {
//     console.log('2、Promise');
//   });
  
//   process.nextTick(() => {
//     console.log('2、nextTick');
//   });
// }, 100)


module.exports = function () {
  console.log('aaaa');
}
