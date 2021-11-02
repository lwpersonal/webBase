/***** 链表 *****/
/**
 * 单节点
 */
export class LinkedNode<T = any> {
  public element: T;
  public next: LinkedNode<T> | null;
  constructor(element: T, next: LinkedNode<T> | null = null) {
    this.element = element;
    this.next = next;
  }
}

/**
 * 双向节点
 */
export class DoublyLinkedNode<T = any> extends LinkedNode<T> {
  public prev: DoublyLinkedNode<T> | null;
  public next: DoublyLinkedNode<T> | null;
  constructor(
    element: T,
    next: DoublyLinkedNode<T> | null = null,
    prev: DoublyLinkedNode<T> | null = null,
  ) {
    super(element);
    this.next = next;
    this.prev = prev;
  }
}

/***** 树 *****/
export class TreeNode<T> {
  value: T;
  left: TreeNode<T> | null;
  right: TreeNode<T> | null;
  constructor(value: T) {
    this.value = value;
    this.left = null;
    this.right = null;
  }
}
