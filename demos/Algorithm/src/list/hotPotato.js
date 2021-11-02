/**
 * 队列
 */
class Queue {
  constructor() {
    this.items = {};
    this.count = 0;
    this.startIndex = 0;
  }
  enqueue(val) {
    this.items[this.count] = val;
    this.count++;
  }
  dequeue() {
    if (this.isEmpty()) {
      return null;
    }
    const res = this.items[this.startIndex];
    delete this.items[this.startIndex];
    this.startIndex++;
    return res;
  }
  peek() {
    if (this.isEmpty()) {
      return null;
    }
    return this.items[this.startIndex];
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
 * 击鼓传花
 */
function hotPotato(names, num) {
  const nameList = new Queue();
  names.forEach(item => nameList.enqueue(item));
  while (nameList.size() > 1) {
    let i = num;
    while (i > 0) {
      const people = nameList.dequeue();
      nameList.enqueue(people);
      i--;
    }
    console.log(`${nameList.dequeue()} 被淘汰了！`);
  }
  console.log(`${nameList.peek()} 获胜！`);
}

// hotPotato(['小红', '小明', '大黑', '小白', '小河'], 7);
hotPotato(['小红', '小明', '大黑', '小白', '小河'], 2);

function hotPotatoForArray(names, num) {
  const list = [...names];
  let posit = 0;
  while (list.length > 1) {
    let index = (list.length > num ? num : num % list.length) + posit;
    if (index === list.length) {
      index = 0;
    } else if (index > list.length) {
      index = index % list.length;
    }
    posit = index;
    console.log(`${list.splice(index, 1)} 被淘汰了！`);
  }
  console.log(`${list[0]} 获胜！`);
}
console.log('----');
// hotPotatoForArray(['小红', '小明', '大黑', '小白', '小河'], 7);
hotPotatoForArray(['小红', '小明', '大黑', '小白', '小河'], 2);
