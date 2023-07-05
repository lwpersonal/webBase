// import prototypeFn from './list/prototype';
// import inheritFn from './list/inherit';
// import closureFn from './list/closure';
import newFn from './list/new';

window.log = (...args: any[]) => console.log(`[JS test]`, ...args);

function main() {
  // 原型链
  // prototypeFn();

  // 继承
  // inheritFn();

  // 闭包
  // closureFn();

  // new
  newFn();
}

main();
