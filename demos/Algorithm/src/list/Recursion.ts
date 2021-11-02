/**
 * 阶乘
 */
function factorialIterative(number: number): number {
  const cache: { [key: number]: number } = {
    1: 1,
    0: 1,
  };
  function fn(n: number): number {
    if (typeof cache[n] === 'number') {
      return cache[n];
    }
    cache[n] = n * fn(n - 1);
    return cache[n];
  }

  return fn(number);
}

factorialIterative(1);
// console.log(factorialIterative(1));
// console.log(factorialIterative(2));
// console.log(factorialIterative(3));
// console.log(factorialIterative(5));

/**
 * 斐波那契
 */

function fibonacciIterative(n: number): number {
  const cache: { [key: number]: number } = {
    0: 0,
    1: 1,
    2: 1,
  };
  function fn(n: number): number {
    if (typeof cache[n] === 'number') {
      return cache[n];
    }
    cache[n] = fn(n - 1) + fn(n - 2);
    return cache[n];
  }

  return fn(n);
}
fibonacciIterative(0);
// console.log(fibonacciIterative(0));
// console.log(fibonacciIterative(1));
// console.log(fibonacciIterative(2));
// console.log(fibonacciIterative(3));
// console.log(fibonacciIterative(4));
// console.log(fibonacciIterative(5));
// console.log(fibonacciIterative(6));
