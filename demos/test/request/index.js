// let a = require('./common');

// console.log('a.add(): ', a.add());

// const b = require('./common');
// console.log('count: ', a, b);

let { a, add } = require('./common');

add();

const b = require('./common');
console.log('count: ', a, b);
