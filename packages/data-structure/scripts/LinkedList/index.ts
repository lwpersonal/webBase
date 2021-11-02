/**
 * 链表
 */
import { LinkedNode as Node } from '@utils/nodes';
import type { ILinkedListOptions } from './interface';

export default class LinkedList<T = any> {
  protected options: ILinkedListOptions<T>;
  protected count;
  public head: Node<T> | null;
  constructor(options?: Partial<ILinkedListOptions<T>>) {
    const DEFAULT_OPTIONS: ILinkedListOptions<T> = {
      equalsFn(element, item) {
        return element === item;
      },
    };
    this.options = { ...DEFAULT_OPTIONS, ...options };
    this.count = 0;
    this.head = null;
  }

  // 尾部插入函数
  push(element: T) {
    const node = new Node<T>(element);
    if (this.isEmpty() || !this.head) {
      this.head = node;
    } else {
      let current = this.head;
      for (let i = 1; i < this.count && current?.next; i++) {
        current = current.next;
      }
      current.next = node;
    }
    this.count++;
    return node;
  }

  // 返回特定位置的元素
  getElementAt(position: number) {
    if (this.isEmpty() || position < 0 || position >= this.count) {
      return null;
    }
    let current = this.head;
    for (let i = 1; i <= position && current?.next; i++) {
      current = current.next;
    }
    return current;
  }

  // 特定位置插入元素
  insert(element: T, position: number) {
    if (position > this.count || position < 0) {
      return false;
    }
    const node = new Node<T>(element);
    if (position === 0) {
      node.next = this.head;
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
      prevItem.next = node;
      this.count++;
      return true;
    }
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
      res = current.element;
    } else {
      const prevItem = this.getElementAt(position - 1);
      if (!prevItem) {
        return null;
      }
      res = prevItem.next?.element || null;
      prevItem.next = prevItem?.next?.next || null;
    }
    this.count--;
    return res;
  }

  // 返回元素的索引
  indexOf(element: T) {
    if (this.isEmpty() || !this.head) {
      return -1;
    }
    const { equalsFn } = this.options;
    let current: Node<T> | null = this.head;
    let i = 0;
    for (; i < this.count && current; i++) {
      if (equalsFn(element, current.element)) {
        return i;
      }
      current = current.next;
    }
    return -1;
  }

  // 移除元素
  remove(element: T) {
    let res: T | null = null;
    if (this.isEmpty() || !this.head) {
      return null;
    }
    const { equalsFn } = this.options;
    let current: Node<T> | null = this.head;
    if (equalsFn(element, current.element)) {
      res = current.element;
      this.head = current.next;
      this.count--;
      return res;
    }

    for (let i = 1; i < this.count && current; i++) {
      const prevItem = current;
      current = current.next;
      if (current && equalsFn(element, current.element)) {
        res = current.element;
        prevItem.next = current.next;
        this.count--;
        return res;
      }
    }
    return null;
  }

  // 是否为空
  isEmpty() {
    return this.count === 0;
  }
  getSize() {
    return this.count;
  }

  clear() {
    this.count = 0;
    this.head = null;
  }

  toString() {
    if (this.isEmpty()) {
      return '';
    }
    let current = this.head;
    let str = `${current?.element || ''}`;
    for (let i = 1; i < this.count && current?.next; i++) {
      str = `${str},${current.next.element}`;
      current = current.next;
    }
    return str;
  }
}
