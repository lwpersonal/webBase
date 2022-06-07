const fs = require('fs');
const path = require('path');
const Promise = require('./lib');

const p = new Promise((resolve, reject) => {
  setTimeout(() => {
    resolve('ok');
  }, 500);
})

p.then((val) => {
  console.log('data1: ', val);
  return new Promise((r, rej) => {
    setTimeout(() => {
      // r(500);
      rej(600);
    }, 500);
  });
}, (err) => {
  console.log('fail1: ', err);
})
.then((val) => {
  console.log('data2: ', val);
  return val;
}, (err) => {
  console.log('fail2: ', err);
})

