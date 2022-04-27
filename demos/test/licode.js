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

// 银币组合
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

// 背包最大价值
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
// console.log(
//   bb(
//     [
//       [1, 2],
//       [3, 5],
//       [9, 20],
//     ],
//     10
//   )
// );

// 岛屿问题，并查集
class UFTree {
  constructor() {
    this.roots = [];
    this.count = 0;
  }

  initUF(n) {
    this.roots = [...Array(n).keys()];
    this.count = n;
  }

  find(x) {
    if (this.roots[x] != x) {
      this.roots[x] = this.find(this.roots[x]);
    }
    return this.roots[x];
  }

  connected(x, y) {
    const rootX = this.find(x);
    const rootY = this.find(y);
    return rootX === rootY;
  }

  union(x, y) {
    const rootX = this.find(x);
    const rootY = this.find(y);
    if (rootX === rootY) {
      return;
    }
    this.roots[rootX] = rootY;
    this.count--;
  }
}

function numIsLands(grid) {
  if (!grid.length || !grid[0].length) {
    return 0;
  }
  const num = grid.length * grid[0].length;
  const uf = new UFTree();
  uf.initUF(num);
}

// function fn(r, c, grid) {
//   // console.log(r, c);
//   if (r < 0 || c < 0 || r >= grid.length || c >= grid[r].length) {
//     return;
//   }
//   if (grid[r][c] !== '1') {
//     return;
//   }
//   // 改写标识，防止重复遍历
//   grid[r][c] = '2';
//   // 上
//   fn(r - 1, c, grid);
//   // 下
//   fn(r + 1, c, grid);
//   // 左
//   fn(r, c - 1, grid);
//   // 右
//   fn(r, c + 1, grid);
// }

// function UF(grid) {
//   let res = 0;

//   for (let r = 0; r < grid.length; r++) {
//     for (let c = 0; c < grid[r].length; c++) {
//       if (grid[r][c] === '1') {
//         fn(r, c, grid);
//         res++;

//         console.log(grid);
//       }
//     }
//   }
//   return res;
// }

console.log(
  UF([
    ['1', '1', '0', '0', '0'],
    ['1', '1', '0', '0', '0'],
    ['0', '0', '1', '0', '0'],
    ['0', '0', '0', '1', '1'],
  ])
);
