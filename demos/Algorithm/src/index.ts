import { CircularLinkedList } from '@wenjw/data-structure';
import { consoleStr } from './utils';

// *********
// 费式数列

// 一只大兔子一个月生一只小兔子
// 小兔子一个月后生小兔子
// 1 / 1 = 2 / 2 = 3
const fn_1 = (num_1, num_2, n) => {
  let rabbat = num_1 || 0;
  let youngRabbat = num_2 || 0;
  let all = rabbat + youngRabbat;
  if (n === 0) {
    return console.log(
      'res: ',
      `${rabbat}只大兔子，${youngRabbat}只小兔子，共${all}只兔子！`,
    );
  } else {
    return fn_1(rabbat + youngRabbat, rabbat, n - 1);
  }
};
// fn_1(2, 1, 1)
// fn_1(1, 0, 3)

// **********
// 巴斯卡三角形
// 2018-03-05

//    1
//  1   1
// 1  2  1
//1  3  3  1

// =>

//     1(0)
//  1(0)  1(1)
// 1(0)  2(1)  1(2)
//1(0)  3(1)  3(2)  1(3)
const fn_2 = n => {
  let resArr = [];
  const f_1 = num => {
    if (num > n) {
      return resArr;
    } else {
      let arr = [];
      const beginArr = resArr[num - 2];

      console.log('num', beginArr);
      for (let i = 0; i < num; i++) {
        arr[i] =
          beginArr !== void 0 &&
          beginArr[i - 1] !== void 0 &&
          beginArr[i] !== void 0
            ? beginArr[i - 1] + beginArr[i]
            : 1;
      }
      console.log(arr);
      resArr[num - 1] = arr;
      return f_1(num + 1);
    }
  };
  return f_1(1);
};
// console.log(fn_2(9))

// 排序
/**
 * 插入排序
 * 分为排序区和未排序区
 *
 * [1,3,4, 6,3,3,2,6,7,6]
 * 每次从未排序区拿一个元素，和排序区对比，放到正确位置
 */

const px_fn = arr => {
  let temp,
    i,
    j,
    len = arr.length;
  for (i = 1; i < len; i++) {
    if (arr[i] < arr[i - 1]) {
      temp = arr[i];
      arr[i] = arr[i - 1];
      for (j = i - 2; arr[j] > temp && j >= 0; j--) {
        arr[j + 1] = arr[j];
      }
      arr[j + 1] = temp;
    }
  }
  return arr;
};
// console.log(px_fn([4, 47, 6, 7, 2, 4, 1, 3, 4]))
// 插入排序
function px_fn_cr(arr) {
  if (arr.length <= 1) {
    return arr;
  }
  for (let i = 1; i < arr.length; i++) {
    let j = i - 1;
    const val = arr[i];
    for (; j >= 0; j--) {
      if (arr[j] > val) {
        arr[j + 1] = arr[j];
      } else {
        break;
      }
      arr[j] = val;
    }
  }
  return arr;
}
// console.log(px_fn_cr([10, 1, 4, 5, 3, 99, 5, 3, 45, 6]));
// console.log(px_fn_cr([47, 4, 6, 7, 2, 4, 1, 3, 4]))
// console.log(px_fn_cr([1, 4, 6, 7, 2, 4, 1, 3, 4]))
// console.log(px_fn_cr([6, 4, 1]))
function px_fn_cr2(arr) {
  const len = arr.length;
  if (len <= 1) {
    return arr;
  }
  let val;
  let j;
  for (let i = 1; i < len; i++) {
    j = i - 1;
    val = arr[i];
    for (; j >= 0; j--) {
      if (arr[j] > val) {
        arr[j + 1] = arr[j];
      } else {
        break;
      }
      arr[j] = val;
    }
  }
  return arr;
}
// console.log(px_fn_cr2([6, 1, 1, 2, 5, 6, 3]));
// console.log(px_fn_cr2([10, 1, 4, 5, 3, 99, 5, 3, 45, 6]));
// console.log(px_fn_cr2([47, 4, 6, 7, 2, 4, 1, 3, 4]));
// console.log(px_fn_cr2([1, 4, 6, 7, 2, 4, 1, 3, 4]));
// console.log(px_fn_cr2([6, 4, 1]));

// 冒泡排序
const px_fn_mp = arr => {
  const len = arr.length;
  let val;
  let posit = 0;
  let flag = true;
  for (let i = 0; i < len && flag; i++) {
    flag = false;
    for (let j = 0; j < len - 1 - posit; j++) {
      if (arr[j] > arr[j + 1]) {
        val = arr[j];
        arr[j] = arr[j + 1];
        arr[j + 1] = val;
        flag = true;
      }
    }
    posit += 1;
  }
  return arr;
};
// console.log(px_fn_mp([47, 4, 6, 7, 2, 4, 1, 3, 4]));
// console.log(px_fn_mp([1, 4, 6, 7, 2, 4, 1, 3, 4]));
// console.log(px_fn_mp([6, 4, 1]));
function px_fn_mp2(arr) {
  const len = arr.length;
  let i = 0;
  let flag = true;
  let val;
  for (; i < len && flag; i++) {
    flag = false;
    for (let j = 0; j < len - 1 - i; j++) {
      if (arr[j] > arr[j + 1]) {
        val = arr[j];
        arr[j] = arr[j + 1];
        arr[j + 1] = val;
        flag = true;
      }
    }
  }
  return arr;
}
// console.log(px_fn_mp2([1, 4, 10, 5, 3, 99, 5, 3, 45, 6]));
// console.log(px_fn_mp2([47, 4, 6, 7, 2, 4, 1, 3, 4]));
// console.log(px_fn_mp2([1, 4, 6, 7, 2, 4, 1, 3, 4]));
// console.log(px_fn_mp2([6, 4, 1]));

/**
 * 选择排序
 * 分排序区和未排序区，每次取最小元素放入排序区末尾
 */
function px_fn_xz(arr) {
  const len = arr.length;
  if (len <= 1) {
    return arr;
  }
  let min;
  let minPosit;
  for (let i = 0; i < len; i++) {
    min = arr[i];
    minPosit = i;
    for (let j = i + 1; j < len; j++) {
      if (arr[j] < min) {
        min = arr[j];
        minPosit = j;
      }
    }
    const val = arr[i];
    arr[i] = arr[minPosit];
    arr[minPosit] = val;
  }
  return arr;
}
// console.log(px_fn_xz([47, 10, 4, 6, 7, 2, 4, 1, 3, 4]));
// console.log(px_fn_xz([10, 1, 4, 5, 3, 99, 5, 3, 45, 6]));
// console.log(px_fn_xz([47, 4, 6, 7, 2, 4, 1, 3, 4]))
// console.log(px_fn_xz([1, 4, 6, 7, 2, 4, 1, 3, 4]))
// console.log(px_fn_xz([6, 4, 1]))
// 简单选择排序
const px_fn_jdxz = arr => {
  const len = arr.length;
  let min;
  let minPosit;
  let i = 0;
  let val;
  for (; i < len; i++) {
    min = arr[i];
    minPosit = i;
    for (let j = i + 1; j < len; j++) {
      if (arr[j] < min) {
        min = arr[j];
        minPosit = j;
      }
    }
    val = arr[i];
    arr[i] = min;
    arr[minPosit] = val;
  }
  return arr;
};
// console.log(px_fn_jdxz([47, 10, 4, 6, 7, 2, 4, 1, 3, 4]));
// console.log(px_fn_jdxz([10, 1, 4, 5, 3, 99, 5, 3, 45, 6]));
// console.log(px_fn_jdxz([47, 4, 6, 7, 2, 4, 1, 3, 4]));
// console.log(px_fn_jdxz([1, 4, 6, 7, 2, 4, 1, 3, 4]));
// console.log(px_fn_jdxz([6, 4, 1]));

// 希尔排序
// const px_fn_xe = arr => {
//   const array = [5, 2, 1]
//   let i, j,
// }

// 快排
function px_fn_k(arr) {
  const len = arr.length;
  if (len <= 1) {
    return arr;
  }
  const posit = Math.floor(len / 2);
  const val = arr[posit];
  for (let i = 0; i < len; i++) {
    if (arr[i] <= val) {
    }
    console.log(arr, i);
  }
  return arr;
}
// console.log(px_fn_k([6, 4, 1]));
const px_fn_k2 = arr => {
  const len = arr.length;
  if (len <= 1) {
    return arr;
  }
  const middle = Math.floor(len / 2);
  const val = arr.splice(middle, 1)[0];
  const left = [];
  const right = [];
  for (let i = 0; i < len - 1; i++) {
    if (arr[i] < val) {
      left.push(arr[i]);
    } else {
      right.push(arr[i]);
    }
  }
  return [...px_fn_k2(left), val, ...px_fn_k2(right)];
};

// console.log(px_fn_k2([4, 5, 7, 84, 1, 4, 5, 6, 10, 14]));
// console.log(px_fn_k2([47, 10, 4, 6, 7, 2, 4, 1, 3, 4]));
// console.log(px_fn_k2([10, 1, 4, 5, 3, 99, 5, 3, 45, 6]));
// console.log(px_fn_k2([47, 4, 6, 7, 2, 4, 1, 3, 4]));
// console.log(px_fn_k2([1, 4, 6, 7, 2, 4, 1, 3, 4]));
// console.log(px_fn_k2([6, 4, 1]));

// 归并排序
function px_fn_gb(source) {
  function merge(arr1, arr2) {
    if (!arr1 || !arr1.length) {
      return arr2;
    }
    if (!arr2 || !arr2.length) {
      return arr1;
    }
    let p1 = 0;
    let p2 = 0;
    const res = [];
    while (p1 < arr1.length || p2 < arr2.length) {
      if (arr1[p1] <= arr2[p2] || !arr2[p2]) {
        res.push(arr1[p1]);
        p1++;
      } else if (arr1[p1] > arr2[p2] || !arr1[p1]) {
        res.push(arr2[p2]);
        p2++;
      }
    }
    return res;
  }

  function fn(arr) {
    const len = arr.length;
    if (len < 2) {
      return arr;
    }
    const middle = Math.floor(len / 2);

    return merge(fn(arr.slice(0, middle)), fn(arr.slice(middle)));
  }

  return fn(source);
}

// console.log(px_fn_gb([4, 5, 7, 84, 1, 4, 5, 6, 10, 14]));
// console.log(px_fn_gb([47, 10, 4, 6, 7, 2, 4, 1, 3, 4]));
// console.log(px_fn_gb([10, 1, 4, 5, 3, 99, 5, 3, 45, 6]));
// console.log(px_fn_gb([47, 4, 6, 7, 2, 4, 1, 3, 4]));
// console.log(px_fn_gb([1, 4, 6, 7, 2, 4, 1, 3, 4]));
// console.log(px_fn_gb([6, 4, 1]));

// TAG 链表
class List {
  constructor(value, next) {
    this.value = value;
    this.next = next;
  }
}

function pushStr(str) {
  if (!str) {
    return null;
  }
  let head = new List(null, null);
  const n = str.length;
  let current = head;
  for (let i = 0; i < n; i++) {
    current.value = str[i];
    current.next = i < n - 1 ? new List(null, null) : null;
    current = current.next;
  }
  return head;
}
const headList = pushStr('abc', null);

// 回文字符串检测
function checkStr(head) {
  if (head === null) {
    return false;
  }
  let current1 = head;
  let current2 = head;
  let str1 = '';
  let str2 = '';
  while (current2) {
    str1 += current1.value;
    current2 = current2?.next?.next;
    if (current2) {
      current1 = current1.next;
    }
  }
  while (current1.next) {
    str2 = current1.next.value + str2;
    current1 = current1.next;
  }
  if (str1.length === str2.length) {
    return str1 === str2;
  } else if (str1.length > str2.length) {
    return str1.slice(0, -1) === str2;
  }
}

// console.log(checkStr(headList));

// 反转单链表
function reverseList(head) {
  let current = head;
  let resList = null;
  while (current) {
    const newList = new List(current.value, resList);
    resList = newList;
    current = current.next;
  }
  return resList;
}
// console.log(reverseList(headList));

function reverseList2(head) {
  let current = head;
  let resList = null;
  while (current) {
    const next = current.next;
    current.next = resList;
    resList = current;
    current = next;
  }
  return resList;
}
// console.log(reverseList2(headList));

// 二分查找
function findItem(source, val) {
  function fn(start, arr) {
    if (arr.length <= 1) {
      if (arr[0] === val) {
        return start;
      }
      return -1;
    }
    const middle = Math.floor(arr.length / 2);
    const p1 = fn(start, arr.slice(0, middle));
    const p2 = fn(start + middle, arr.slice(middle));
    if (p1 !== -1) {
      return p1;
    }
    if (p2 !== -1) {
      return p2;
    }
    return -1;
  }

  return fn(0, source);
}
// console.log(findItem([1, 2, 3, 4, 5, 9, 11, 40], 9));
// console.log(findItem([1, 3, 5, 9, 10, 14, 30, 99, 102], 9));

// 二分查找，重复元素第一个
function ef_find_cf(source, val) {
  function fn(start, arr) {
    if (arr.length <= 1) {
      if (arr[0] === val && (start === 0 || source[start - 1] !== val)) {
        return start;
      }
      return -1;
    }
    const middle = Math.floor(arr.length / 2);
    const p1 = fn(start, arr.slice(0, middle));
    const p2 = fn(start + middle, arr.slice(middle));
    if (p1 !== -1) {
      return p1;
    }
    if (p2 !== -1) {
      return p2;
    }
    return -1;
  }

  return fn(0, source);
}
// console.log(ef_find_cf([7, 7, 7, 7, 7, 7, 7, 7, 7, 8, 8, 10], 7));

// 二分查找，重复元素最后一个
function ef_find_cf_end(source, val) {
  function fn(start, arr, val) {
    if (arr.length <= 1) {
      if (
        arr[0] === val &&
        (start === source.length - 1 || source[start + 1] !== val)
      ) {
        return start;
      } else {
        return -1;
      }
    }
    const middle = Math.floor(arr.length / 2);
    const left = fn(start, arr.slice(0, middle), val);
    const right = fn(start + middle, arr.slice(middle), val);
    if (left !== -1) {
      return left;
    }
    if (right !== -1) {
      return right;
    }
    return -1;
  }

  return fn(0, source, val);
}
// console.log(1, ef_find_cf_end([7, 7, 7, 7, 7, 7, 7, 7, 7, 8, 8, 10], 7));

// 二分查找，重复元素第一个大于等于
function ef_find_cf_one(source, val) {
  function fn(start, arr) {
    if (arr.length <= 1) {
      if (arr[0] === val && (start === 0 || source[start - 1] !== val)) {
        return start;
      }
      if (arr[0] > val && (start === 0 || source[start - 1] <= val)) {
        return start;
      }
      return -1;
    }
    const middle = Math.floor(arr.length / 2);
    const p1 = fn(start, arr.slice(0, middle));
    const p2 = fn(start + middle, arr.slice(middle));
    if (p1 !== -1) {
      return p1;
    }
    if (p2 !== -1) {
      return p2;
    }
    return -1;
  }

  return fn(0, source);
}
// console.log(ef_find_cf_one([7, 7, 7, 7, 7, 7, 7, 7, 7, 8, 8, 10], 6));

// 二分查找，重复元素最后一个小于等于
function ef_find_cf_end_two(source, val) {
  function fn(start, arr) {
    if (arr.length <= 1) {
      if (
        arr[0] === val &&
        (start === source.length - 1 || source[start + 1] !== val)
      ) {
        return start;
      }
      if (
        arr[0] < val &&
        (start === source.length - 1 || source[start + 1] >= val)
      ) {
        return start;
      }
      return -1;
    }
    const middle = Math.floor(arr.length / 2);
    const p1 = fn(start, arr.slice(0, middle));
    const p2 = fn(start + middle, arr.slice(middle));
    if (p2 !== -1) {
      return p2;
    }
    if (p1 !== -1) {
      return p1;
    }
    return -1;
  }

  return fn(0, source);
}
// console.log(ef_find_cf_end_two([7, 7, 7, 7, 7, 7, 7, 7, 7, 8, 8, 10], 7));
// console.log(ef_find_cf_end_two([7, 7, 7, 7, 7, 7, 7, 7, 7, 10, 10, 10, 11], 10));

// client.info({ name: '小明', age: 18 }).say('hello').eat('苹果').sleep(1000).eat('大米')
class Client {
  constructor(options) {
    this.info = options;
    this.fns = [];
    this.delayFn(0, () => this.next());
  }

  delayFn(time, fn) {
    const _this = this;
    return new Promise(r => {
      setTimeout(() => {
        fn.call(_this);
        r();
      }, time * 1000);
    });
  }

  next() {
    const itemFn = this.fns.shift();
    typeof itemFn === 'function' && itemFn();
  }

  eat(food) {
    this.fns.push(() => {
      console.log(`eat ${food}`);
      this.next();
    });
    return this;
  }

  say(word) {
    this.fns.push(() => {
      console.log(`say ${word}`);
      this.next();
    });
    return this;
  }

  sleep(delay) {
    this.fns.push(() => {
      this.delayFn(delay, () => {
        console.log(`sleep ${delay}s`);
        this.next();
      });
    });
    return this;
  }
}
// const client = new Client({ name: '小明', age: 18 });
// client.say('hello').eat('apple').sleep(2).eat('banner');

class DelayFn {
  client = Promise.resolve();
  constructor() {}

  eat(food: string) {
    this.client = this.client.then(() => {
      console.log(`eat food ${food}`);
    });
    return this;
  }

  sleep(delay: number) {
    this.client = this.client.then(() => {
      return new Promise(r => {
        setTimeout(() => {
          console.log(`sleep ${delay}`);
          r(undefined);
        }, delay);
      });
    });
    return this;
  }
}
// const client = new DelayFn();
// client.eat('苹果').sleep(1000).eat('大米');

/**
 * 防抖
 */
function fd(cb, delay) {
  let timer = null;

  return () => {
    if (timer) {
      clearTimeout(timer);
      timer = setTimeout(() => {
        cb();
        timer = null;
      }, delay);
    } else {
      // cb();
      timer = setTimeout(() => cb(), delay);
    }
  };
}
const fn11 = fd(() => console.log('11111'), 3000);
// window.onclick = fn11;

/**
 * 节流函数
 */
// function jl(cb, delay) {
//   let timer = null;

//   return () => {
//     if (!timer) {
//       timer = setTimeout(() => {
//         cb();
//         timer = null;
//       }, delay);
//     }
//   };
// }
// const fn22 = jl(() => console.log('11111'), 1000);
// window.onclick = fn22;

function jl(cb, delay) {
  let timer = 0;

  return () => {
    const t = new Date().getTime();

    if (t - timer >= delay) {
      timer = t;
      cb();
    }
  };
}
const fn22 = jl(() => console.log('11111'), 1000);
window.onclick = fn22;
