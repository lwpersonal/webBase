// 异步执行代码

class AsyncPromise {
  constructor(name) {
    this.name = name;
    this.promise = new Promise(r => setTimeout(r, 0));
  }
  eat(food) {
    this.promise.then(() => {
      console.log(`${this.name} eat ${food}`);
    });
    return this;
  }

  say(word) {
    this.promise.then(() => {
      console.log(`${this.name} say ${word}`);
    });
    return this;
  }

  sleep(delay) {
    this.promise = new Promise(resolve => {
      setTimeout(() => {
        console.log(`${this.name} sleep ${delay}`);
        resolve();
      }, delay);
    });
    return this;
  }
}

const client = new AsyncPromise('小张');
client.eat('苹果').eat('鸡蛋').sleep(1000).say('hello').sleep(3000).eat('香蕉');

function asyncCode(name) {
  const queue = [];
  const exportObj = {
    eat,
    say,
    sleep,
  };

  function next() {
    if (!queue.length) {
      return;
    }
    const fn = queue.shift();
    fn(next);
  }

  function eat(food) {
    queue.push(function (next) {
      console.log(`${name} eat ${food}`);
      next();
    });
    return exportObj;
  }
  function say(word) {
    queue.push(function (next) {
      console.log(`${name} say ${word}`);
      next();
    });
    return exportObj;
  }
  function sleep(delay) {
    queue.push(function (next) {
      setTimeout(() => {
        console.log(`${name} sleep ${delay}`);
        next();
      }, delay);
    });
    return exportObj;
  }
  setTimeout(next, 0);
  return exportObj;
}

// asyncCode('小明')
//   .eat('苹果')
//   .eat('鸡蛋')
//   .sleep(1000)
//   .say('hello')
//   .sleep(3000)
//   .eat('香蕉');
