/**
 * 链表
 */
class LinkedList {
  constructor(val, next) {
    this.val = val === undefined ? 0 : val;
    this.next = next === undefined ? null : next;
  }
}

/**
 * 二叉树
 */
class TreeNode {
  constructor(val, left, right) {
    this.val = val === undefined ? 0 : val;
    this.left = left === undefined ? null : left;
    this.right = right === undefined ? null : right;
  }
}

/**
 * 获取树的深度
 */
const getTreeDeep = root => {
  if (!root) {
    return 0;
  }
  const left = getTreeDeep(root.left);
  const right = getTreeDeep(root.right);
  return Math.max(left, right) + 1;
};

// NOTE ********* code *********

// var change = function (amount, coins) {
//   const cache = Array(amount + 1).fill(0);
//   cache[0] = 1;

//   coins.forEach(coin => {
//     for (let i = coin; i <= amount; i++) {
//       cache[i] += cache[i - coin];
//     }
//   });
//   return cache[amount];
// };
// console.log(change(3, [1, 2, 5]));

function c_fn(coins, num) {
  const cache = Array(num + 1).fill(0);
  cache[0] = 1;

  coins.forEach(coin => {
    for (let i = coin; i <= num; i++) {
      cache[i] += cache[i - coin];
    }
  });
  return cache[num];
}
// console.log(c_fn([5, 1, 2], 8));

function bb(list, w) {
  const cache = [];

  function dp(w) {
    if (w < 0) {
      return -1;
    }
    if (w === 0) {
      return 0;
    }
    let max = Number.MIN_SAFE_INTEGER;

    list.forEach(([weight, value]) => {
      const val = dp(w - weight);
      if (val !== -1) {
        max = Math.max(max, val + value);
      }
    });

    max = max === Number.MIN_SAFE_INTEGER ? -1 : max;
    cache[w] = max;
    return max;
  }

  return dp(w);
}

console.log(
  bb(
    [
      [1, 2],
      [3, 5],
      [9, 20],
    ],
    10
  )
);


let max = 0;
    function fn(root) {
        if (!root) {
            return 0;
        }
        if (!root.left && !root.right) {
            return 0;
        }
        let depth = getDepth(root.left) + getDepth(root.right);
        // console.log(depth);
        depth > max && (max = depth);
        fn(root.left);
        fn(root.right);
        // return depth;
    }

    fn(root);
    // console.log(max);
    return max;
