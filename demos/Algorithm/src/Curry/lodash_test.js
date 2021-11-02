const _ = require('lodash');

// function add(a, b, c) {
//   console.log(a + b + c);
// }
// _.curry(add)(1, 2)(3);

function add2(a, b, c = 0, d = 0) {
  console.log(a + b + c + d);
}
_.curry(add2)(1)(3);
