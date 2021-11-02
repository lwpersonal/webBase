// 栈
class Stack {
  constructor() {
    this.list = {};
    this.size = 0;
  }
  // 查看栈顶元素
  peek() {
    if (this.isEmpty()) {
      return null;
    }
    return this.list[this.size];
  }
  // 入栈
  push(val) {
    this.size++;
    this.list[this.size] = val;
  }
  // 出栈
  pop() {
    if (this.isEmpty()) {
      return null;
    }
    const val = this.list[this.size];
    delete this.list[this.size];
    this.size--;
    return val;
  }
  clear() {
    this.list = {};
    this.size = 0;
  }
  getSize() {
    return this.size;
  }
  isEmpty() {
    return this.size === 0;
  }
  toString() {
    if (this.isEmpty()) {
      return '';
    }
    let str = `${this.list[1]}`;
    for (let i = 2; i <= this.size; i++) {
      str = `${str},${this.list[i]}`;
    }
    return str;
  }
}

// const stack = new Stack();
// stack.push(1);
// stack.push(2);
// stack.push(4);
// console.log('stack: ', stack);
// console.log(stack.getSize());
// console.log(stack.toString());
// console.log(stack.peek());
// console.log(stack.pop());
// console.log(stack.toString());
// stack.clear();
// console.log(stack.toString());

// 10 进制转换其他进制
function baseConverter(source, base = 2) {
  if (base < 2 || base > 35) {
    throw new Error('base 只支持 2 ～ 35');
  }
  const numList = new Stack();
  const digits = '0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZ';
  let num = source;
  while (num > 0) {
    const rem = Math.floor(num % base);
    numList.push(rem);
    num = Math.floor(num / base);
  }
  let res = '';
  while (!numList.isEmpty()) {
    res += digits[numList.pop()];
  }
  return res;
}

// console.log(baseConverter(13));
// console.log(baseConverter(10));
// console.log(baseConverter(15, 16));
console.log(baseConverter(100345, 2));
console.log(baseConverter(100345, 8));
console.log(baseConverter(100345, 16));
console.log(baseConverter(100345, 35));
