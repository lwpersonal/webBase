import prototypeFn from './list/prototype';

window.log = (...args: any[]) => console.log(`[JS test]`, ...args);

function main() {
  // 原型链
  prototypeFn();
}

main();
