const path = require('path');

function addImmediate(max) {
  if (max <= 0) {
    return;
  }
  console.log('addImmediate');
  setImmediate(() => addImmediate(max - 1));
}

// setImmediate(() => addImmediate(10000));

// setTimeout(() => {
//   console.log('setTimeout');
// }, 7);
// // setTimeout(() => {
// //   console.log('setTimeout 1');
// // }, 1);

// console.log('start');

// timeout_vs_immediate.js
var fs = require('fs');

fs.readFile(path.resolve(__dirname, './text.txt'), () => {
  setTimeout(() => {
    console.log('timeout');
  });
  // setImmediate(() => {
  //   console.log('immediate');
  // });
  addImmediate(10);
});
