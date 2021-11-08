import { TreeNode } from '@utils/nodes';
import { BALANCE_FACTOR, COMPARE_STA } from './BinaryTree';
import BinarySearchTree from './BinarySearchTree';
import type { IBinaryTreeOptions } from './interface';

export default class AVLTree<T> extends BinarySearchTree<T> {
  constructor(options?: Partial<IBinaryTreeOptions<T>>) {
    super(options);
  }

  insert(key: T) {
    if (this.root === null) {
      this.root = new TreeNode(key);
    } else {
      this.root = this.insertNode(this.root, key);
    }
  }

  protected insertNode(node: TreeNode<T>, key: T) {
    const { compareFn } = this.options;
    node = super.insertNode(node, key);
    if (node && compareFn(node.value, node.value) === 0) {
      // 已经有相同的值
      return node;
    }
    const balanceFactor = this.getNodeBalanceFactor(node);
    if (balanceFactor === BALANCE_FACTOR.UNBALANCED_RIGHT && node.right) {
      const compareSta = compareFn(key, node.right.value);
      if (compareSta === COMPARE_STA.BIGGER_THEN) {
        node = this.rotationRRNode(node);
      } else {
        return this.rotationLRNode(node);
      }
    }

    if (balanceFactor === BALANCE_FACTOR.UNBALANCED_LEFT && node.left) {
      const compareSta = compareFn(key, node.left.value);
      if (compareSta === COMPARE_STA.LESS_THEN) {
        node = this.rotationLLNode(node);
      } else {
        return this.rotationRLNode(node);
      }
    }

    return node;
  }

  remove(key: T) {
    this.root = this.removeNode(this.root, key);
  }
  protected removeNode(node: TreeNode<T> | null, key: T) {
    node = super.removeNode(node, key);
    if (node === null) {
      return node;
    }
    const { compareFn } = this.options;
    const balanceFactor = this.getNodeBalanceFactor(node);
    if (balanceFactor === BALANCE_FACTOR.UNBALANCED_RIGHT && node.right) {
      const compareSta = compareFn(key, node.right.value);
      if (compareSta === COMPARE_STA.BIGGER_THEN) {
        node = this.rotationRRNode(node);
      } else {
        return this.rotationLRNode(node);
      }
    }

    if (balanceFactor === BALANCE_FACTOR.UNBALANCED_LEFT && node.left) {
      const compareSta = compareFn(key, node.left.value);
      if (compareSta === COMPARE_STA.LESS_THEN) {
        node = this.rotationLLNode(node);
      } else {
        return this.rotationRLNode(node);
      }
    }
    return node;
  }

  /**
   * LL（left left 不平衡） 向右单旋
   */
  protected rotationLLNode(node: TreeNode<T>) {
    const tmp = node.left;
    if (!tmp) {
      throw new Error('此树不可以向右单旋');
    }
    node.left = tmp?.right || null;
    tmp.right = node;
    return tmp;
  }
  /**
   * 向左单旋
   */
  protected rotationRRNode(node: TreeNode<T>) {
    const tmp = node.right;
    if (!tmp) {
      throw new Error('此树不可以向左单旋');
    }
    node.right = tmp?.left || null;
    tmp.left = node;
    return tmp;
  }

  /**
   * LR 向右双旋，LL + RR
   */
  protected rotationLRNode(node: TreeNode<T>) {
    if (!node.right) {
      throw new Error('此树不可以向右双旋');
    }
    node.right = this.rotationLLNode(node.right);
    return this.rotationRRNode(node);
  }

  /**
   * RL 向左双旋，RR + LL
   */
  protected rotationRLNode(node: TreeNode<T>) {
    if (!node.left) {
      throw new Error('此树不可以向右双旋');
    }
    node.left = this.rotationRRNode(node.left);
    return this.rotationLLNode(node);
  }
}
