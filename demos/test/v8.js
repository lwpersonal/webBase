let a = { x: 1 };
function bar(obj) {
  return obj.x;
}

function foo() {
  let ret = 0;
  for (let i = 1; i < 7049; i++) {
    ret += bar(a);
  }
  return ret;
}

foo();
