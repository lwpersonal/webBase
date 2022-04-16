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

const data = [
  {
    id: 2,
    val: 110,
    parentId: 1,
  },
  {
    id: 3,
    val: 30,
    parentId: 1,
  },
  {
    id: 4,
    val: 32,
    parentId: 2,
  },
  {
    id: 5,
    val: 29,
    parentId: 4,
  },
  {
    id: 6,
    val: 290,
    parentId: 4,
  },
  {
    id: 1,
    val: 10,
    parentId: null,
  },
  {
    id: 8,
    val: 29,
    parentId: null,
  },
];

function fn(data) {
  const ids = new Map();
  const res = [];
  data.forEach(item => {
    ids.set(item.id, {
      ...item,
      children: ids.get(item.id) ? ids.get(item.id).children : [],
    });
    const mapItem = ids.get(item.id);
    if (item.parentId === null) {
      res.push(mapItem);
    } else {
      if (!ids.get(item.parentId)) {
        ids.set(item.parentId, { children: [] });
      }
      ids.get(item.parentId).children.push(mapItem);
    }
  });

  console.log(JSON.stringify(res, undefined, 4));
  return res;
}

fn(data);
