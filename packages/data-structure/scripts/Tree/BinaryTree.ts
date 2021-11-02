/**
 * 二叉树
 */
import type { TreeNode } from '@utils/nodes';
import type { IBinaryTreeOptions } from './interface';

export enum BALANCE_FACTOR {
  UNBALANCED_RIGHT, // right 不平衡
  UNBALANCED_LEFT, // left 不平衡
  SLIGHTLY_UNBALANCED_RIGHT, // right 轻微不平衡，2
  SLIGHTLY_UNBALANCED_LEFT, // left 轻微不平衡，2
  BALANCED, // 平衡
}

export enum COMPARE_STA {
  LESS_THEN,
  BIGGER_THEN,
  EQUAL,
}

export default class BinaryTree<T> {
  protected options: IBinaryTreeOptions<T>;
  root: TreeNode<T> | null;
  constructor(options?: Partial<IBinaryTreeOptions<T>>) {
    const DEFAULT_OPTIONS: IBinaryTreeOptions<T> = {
      compareFn(a, b) {
        if (a < b) {
          return COMPARE_STA.LESS_THEN;
        } else if (a > b) {
          return COMPARE_STA.BIGGER_THEN;
        }
        return COMPARE_STA.EQUAL;
      },
    };
    this.options = { ...DEFAULT_OPTIONS, ...options };
    this.root = null;
  }

  isEmpty() {
    return this.root === null;
  }

  /**
   * 获取树的高度
   */
  getHeight() {
    return this.getNodeHeight(this.root);
  }
  protected getNodeHeight(node: TreeNode<T> | null): number {
    if (node === null) {
      return -1;
    }
    return (
      Math.max(this.getNodeHeight(node.left), this.getNodeHeight(node.right)) +
      1
    );
  }

  /**
   * 是否为平衡树，任意节点的左右树高度相差不大于 1
   */
  getBalanceFactor() {
    return this.getNodeBalanceFactor(this.root);
  }
  protected getNodeBalanceFactor(node: TreeNode<T> | null) {
    if (node === null) {
      return BALANCE_FACTOR.BALANCED;
    }
    const heightDiff =
      this.getNodeHeight(node.left) - this.getNodeHeight(node.right);
    if (heightDiff <= -2) {
      return BALANCE_FACTOR.UNBALANCED_RIGHT;
    } else if (heightDiff >= 2) {
      return BALANCE_FACTOR.UNBALANCED_LEFT;
    } else if (heightDiff === 1) {
      return BALANCE_FACTOR.SLIGHTLY_UNBALANCED_LEFT;
    } else if (heightDiff === -1) {
      return BALANCE_FACTOR.SLIGHTLY_UNBALANCED_RIGHT;
    } else {
      return BALANCE_FACTOR.BALANCED;
    }
  }

  /**
   * 中序遍历
   */
  inOrderTraverse(cb: (val: T) => void) {
    this.inOrderTraverseNode(this.root, cb);
  }
  protected inOrderTraverseNode(
    node: TreeNode<T> | null,
    cb: (val: T) => void,
  ) {
    if (node === null) {
      return;
    } else {
      this.inOrderTraverseNode(node.left, cb);
      cb(node.value);
      this.inOrderTraverseNode(node.right, cb);
    }
  }

  /**
   * 先序遍历
   */
  preOrderTraverse(cb: (val: T) => void) {
    this.preOrderTraverseNode(this.root, cb);
  }
  protected preOrderTraverseNode(
    node: TreeNode<T> | null,
    cb: (val: T) => void,
  ) {
    if (node === null) {
      return;
    } else {
      cb(node.value);
      this.preOrderTraverseNode(node.left, cb);
      this.preOrderTraverseNode(node.right, cb);
    }
  }

  /**
   * 后序遍历
   */
  postOrderTraverse(cb: (val: T) => void) {
    this.postOrderTraverseNode(this.root, cb);
  }
  protected postOrderTraverseNode(
    node: TreeNode<T> | null,
    cb: (val: T) => void,
  ) {
    if (node === null) {
      return;
    } else {
      this.postOrderTraverseNode(node.left, cb);
      this.postOrderTraverseNode(node.right, cb);
      cb(node.value);
    }
  }

  /**
   * 搜索
   */
  search(key: T): boolean {
    if (key === null || key === void 0 || this.root === null) {
      return false;
    }
    const { compareFn } = this.options;
    let searchSta = false;
    this.inOrderTraverse(item => {
      if (compareFn(item, key) === COMPARE_STA.EQUAL) {
        searchSta = true;
      }
    });
    return searchSta;
  }
}
