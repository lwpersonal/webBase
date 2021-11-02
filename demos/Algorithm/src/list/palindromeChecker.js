/**
 * 双端队列
 */

class Deque {
  constructor() {
    this.count = 0;
    this.startIndex = 0;
    this.items = {};
  }
  // 后端添加
  addBack(val) {
    this.items[this.count] = val;
    this.count++;
  }
  // 前端添加
  addFront(val) {
    if (this.isEmpty()) {
      this.addBack(val);
    } else {
      this.startIndex--;
      this.items[this.startIndex] = val;
    }
  }
  removeFront() {
    if (this.isEmpty()) {
      return null;
    }
    const res = this.items[this.startIndex];
    delete this.items[this.startIndex];
    this.startIndex++;
    return res;
  }
  removeBack() {
    if (this.isEmpty()) {
      return null;
    }
    this.count--;
    const res = this.items[this.count];
    delete this.items[this.count];
    return res;
  }
  peekFront() {
    if (this.isEmpty()) {
      return null;
    }
    return this.items[this.startIndex];
  }
  peekBack() {
    if (this.isEmpty()) {
      return null;
    }
    return this.items[this.count - 1];
  }

  isEmpty() {
    return this.size() === 0;
  }
  size() {
    return this.count - this.startIndex >= 0 ? this.count - this.startIndex : 0;
  }
  clear() {
    this.items = {};
    this.count = 0;
    this.startIndex = 0;
    return true;
  }
  toString() {
    if (this.isEmpty()) {
      return '';
    }
    let str = this.items[this.startIndex].toString();
    let index = this.startIndex + 1;
    while (index < this.count) {
      str = `${str},${this.items[index]}`;
      index++;
    }
    return str;
  }
}

/**
 * 回文字符串
 */
function palindromeChecker(str) {
  if (typeof str !== 'string') {
    return false;
  }
  if (str.length === 0 || str.length === 1) {
    return true;
  }
  const list = new Deque();
  for (let i = 0; i < str.length; i++) {
    list.addBack(str[i]);
  }
  while (!list.isEmpty()) {
    if (list.size() === 1) {
      return true;
    }
    if (list.removeBack() !== list.removeFront()) {
      // 前后不相等，不是回文字符串
      return false;
    }
  }
  return true;
}

console.log(palindromeChecker('step on no pets'));
