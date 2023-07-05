/**
 * 闭包
 */
export default function () {
  function fn1() {}

  function fn2() {
    var name = 'lw';
    const age = 12;

    return function () {
      log('name: ', name);
      log('age: ', age);
    };
  }

  fn2()();
}

var a = [1, 2, 3];

function fn(arr) {
  arr.push(4);
}
fn(a);
const fn1 = arr => {
  arr.push(5);
};
fn1(a);

console.log(a);

