/**
 * 双向链表
 */
import { DoublyLinkedNode } from '@utils/nodes';
import LinkedList from './index';
import type { ILinkedListOptions } from './interface';

export default class DoublyLinkedList<T = any> extends LinkedList<T> {
  public tail: DoublyLinkedNode<T> | null;
  public head: DoublyLinkedNode<T> | null;
  constructor(options?: Partial<ILinkedListOptions<T>>) {
    super(options);
    this.head = null;
    this.tail = null;
  }
  // 尾部插入函数
  push(element: T) {
    const node = new DoublyLinkedNode<T>(element);
    if (this.isEmpty() || !this.head) {
      this.head = node;
    } else {
      let current = this.head;
      for (let i = 1; i < this.count && current?.next; i++) {
        current = current.next;
      }
      current.next = node;
      node.prev = current;
    }
    this.tail = node;
    this.count++;
    return node;
  }

  // 返回特定位置的元素
  getElementAt(position: number) {
    return super.getElementAt(position) as DoublyLinkedNode<T> | null;
  }
  // 特定位置插入函数
  insert(element: T, position: number) {
    if (position > this.count || position < 0) {
      return false;
    }
    const node = new DoublyLinkedNode<T>(element);
    if (position === 0) {
      if (this.isEmpty() || !this.head) {
        return this.push(element);
      }
      node.next = this.head;
      this.head.prev = node;
      this.head = node;
      this.count++;
      return true;
    } else if (position === this.count) {
      return this.push(element);
    } else {
      const prevItem = this.getElementAt(position - 1);
      if (!prevItem?.next) {
        return false;
      }
      node.next = prevItem.next || null;
      prevItem.next.prev = node;
      prevItem.next = node;
      node.prev = prevItem;
      this.count++;
      return true;
    }
  }

  // 移除元素
  remove(element: T) {
    let res: T | null = null;
    if (this.isEmpty() || !this.head) {
      return null;
    }
    const { equalsFn } = this.options;
    let current: DoublyLinkedNode<T> | null = this.head;
    if (equalsFn(element, current.element)) {
      res = current.element;
      this.head = current.next;
      if (this.count === 1) {
        this.tail = null;
      }
      this.head && (this.head.prev = null);
      this.count--;
      return res;
    }

    for (let i = 1; i < this.count && current; i++) {
      const prevItem = current;
      current = current.next;
      if (current && equalsFn(element, current.element)) {
        if (i === this.count - 1) {
          this.tail = prevItem;
        }
        res = current.element;
        prevItem.next = current.next;
        prevItem.next && (prevItem.next.prev = prevItem);
        this.count--;
        return res;
      }
    }
    return null;
  }
  // 特定位置移除一个元素
  removeAt(position: number) {
    let res: T | null = null;
    if (this.isEmpty() || position >= this.count || position < 0) {
      return null;
    }
    if (position === 0) {
      const current = this.head;
      if (!current) {
        return null;
      }
      this.head = current.next;
      if (this.count === 1) {
        this.tail = null;
      }
      this.head && (this.head.prev = null);
      res = current.element;
    } else {
      const prevItem = this.getElementAt(position - 1);
      if (!prevItem) {
        return null;
      }
      if (position === this.count - 1) {
        this.tail = prevItem;
      }
      res = prevItem.next?.element || null;
      prevItem.next = prevItem?.next?.next || null;
      prevItem?.next && (prevItem.next.prev = prevItem);
    }
    this.count--;
    return res;
  }

  clear() {
    super.clear();
    this.tail = null;
  }
}
