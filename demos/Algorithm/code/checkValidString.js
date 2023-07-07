// 有效括号
// https://leetcode.cn/problems/valid-parenthesis-string/

// 不带 * 的版本
function checkValidString1(s) {
  let list = [];
  for (let i = 0, len = s.length; i < len; i++) {
    const str = s[i];

    if (!list.length) {
      list.push(str);
      continue;
    }
    const lastValid = list[list.length - 1];
    if (str === ')' && lastValid === '(') {
      list.pop();
    } else {
      list.push(str);
    }
  }
  return !list.length;
}
// console.log(checkValidString('(((()())))()'));

// 带 * 的版本
function checkValidString2(s) {
  let list = [];
  let list2 = [];
  for (let i = 0, len = s.length; i < len; i++) {
    const str = s[i];
    if (str === '*') {
      list2.push('*');
      continue;
    }

    if (!list.length) {
      list.push(str);
      continue;
    }
    const lastValid = list[list.length - 1];
    if (str === ')' && lastValid === '(') {
      list.pop();
    } else {
      list.push(str);
    }
  }
  console.log(list, list2);
  return !list.length || list.length <= list2.length;
}
// console.log(checkValidString2('((((*)()))**'));

var checkValidString = function (s) {
  const leftStack = [];
  const asteriskStack = [];
  const n = s.length;
  for (let i = 0; i < n; i++) {
    const c = s[i];
    if (c === '(') {
      leftStack.push(i);
    } else if (c === '*') {
      asteriskStack.push(i);
    } else {
      if (leftStack.length) {
        leftStack.pop();
      } else if (asteriskStack.length) {
        asteriskStack.pop();
      } else {
        return false;
      }
    }
  }
  while (leftStack.length && asteriskStack.length) {
    const leftIndex = leftStack.pop();
    const asteriskIndex = asteriskStack.pop();
    if (leftIndex > asteriskIndex) {
      return false;
    }
  }
  return leftStack.length === 0;
};
const testStr =
  '(((((*(()((((*((**(((()()*)()()()*((((**)())*)*)))))))(())(()))())((*()()(((()((()*(())*(()**)()(())';
console.log(checkValidString(testStr));
