/**
 * 二叉搜索树
 */
import { TreeNode } from '@utils/nodes';
import BinaryTree, { COMPARE_STA } from './BinaryTree';
import type { IBinaryTreeOptions } from './interface';

export default class BinarySearchTree<T> extends BinaryTree<T> {
  constructor(options?: Partial<IBinaryTreeOptions<T>>) {
    super(options);
  }
  /**
   * 插入
   */
  insert(key: T) {
    if (this.root === null) {
      this.root = new TreeNode(key);
    } else {
      this.root = this.insertNode(this.root, key);
    }
  }
  protected insertNode(node: TreeNode<T>, key: T) {
    const { compareFn } = this.options;
    const nodeItem = new TreeNode(key);
    const compareSta = compareFn(key, node.value);
    if (compareSta === COMPARE_STA.LESS_THEN) {
      if (node.left === null) {
        node.left = nodeItem;
      } else {
        node.left = this.insertNode(node.left, key) || null;
      }
    } else if (compareSta === COMPARE_STA.BIGGER_THEN) {
      if (node.right === null) {
        node.right = nodeItem;
      } else {
        node.right = this.insertNode(node.right, key) || null;
      }
    }
    return node;
  }

  /**
   * 最小值
   */
  min() {
    if (this.root === null) {
      return null;
    }
    return this.minNode(this.root);
  }
  protected minNode(node: TreeNode<T>): TreeNode<T> {
    if (node.left) {
      return this.minNode(node.left);
    } else {
      return node;
    }
  }
  /**
   * 最大值
   */
  max() {
    if (this.root === null) {
      return null;
    }
    return this.maxNode(this.root);
  }
  protected maxNode(node: TreeNode<T>): TreeNode<T> {
    if (node.right) {
      return this.maxNode(node.right);
    } else {
      return node;
    }
  }
  /**
   * 删除
   */
  remove(key: T) {
    this.root = this.removeNode(this.root, key);
  }
  protected removeNode(node: TreeNode<T> | null, key: T) {
    if (node === null) {
      return null;
    }
    const { compareFn } = this.options;
    const compareSta = compareFn(key, node.value);
    if (compareSta === COMPARE_STA.LESS_THEN) {
      node.left = this.removeNode(node.left, key);
      return node;
    } else if (compareSta === COMPARE_STA.BIGGER_THEN) {
      node.right = this.removeNode(node.right, key);
      return node;
    } else {
      // 相等时
      if (node.left === null && node.right === null) {
        // 当前节点没有子节点，直接删除返回 null
        return null;
      } else if (node.right && node.left) {
        // 有两个子节点时
        const rightMinNode = this.minNode(node.right);
        node.value = rightMinNode.value;
        node.right = this.removeNode(node.right, rightMinNode.value);
        return node;
      } else {
        // 当前节点只有一个子节点，子节点直接替换当前节点
        return node.left ? node.left : node.right;
      }
    }
  }
}
