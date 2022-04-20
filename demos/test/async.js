class Person {
  async = Promise.resolve();
  sleep(timeout) {
    this.async = this.async.then(() => {
      return new Promise(r => {
        setTimeout(() => {
          console.log('sleep: ', timeout);
          r(timeout);
        }, timeout);
      });
    });
    return this;
  }
  eat(str) {
    this.async = this.async.then(() => {
      console.log('eat: ', str);
    });
    return this;
  }
}

class P {
  list = [];
  execute = false;
  constructor() {
    setTimeout(() => {
      this.next();
    }, 0);
  }
  next() {
    if (this.execute) {
      // 执行中，需要等待上一个任务完成
      return;
    }
    const itemFn = this.list.shift();
    itemFn && itemFn();
  }
  sleep(delay) {
    this.list.push(() => {
      this.execute = true;
      setTimeout(() => {
        console.log(`sleep ${delay}s`);
        this.execute = false;
        this.next();
      }, delay);
    });
    this.next();
    return this;
  }
  eat(food) {
    this.list.push(() => {
      this.execute = true;
      setTimeout(() => {
        console.log(`eat ${food}`);
        this.execute = false;
        this.next();
      }, 0);
    });
    this.next();
    return this;
  }
}

function main() {
  // new Person()
  //   .sleep(3000)
  //   .sleep(5000)
  //   .eat('1')
  //   .sleep(1000)
  //   .eat('2')
  //   .sleep(5000)
  //   .eat('3');

  const a = new P();
  a.sleep(1000);
  a.eat('1').sleep(2000).eat('2').eat('3');

  setTimeout(() => {
    console.log('------');
    a.eat('1').sleep(2000).eat('2').eat('3');
  }, 4000);
}

main();
