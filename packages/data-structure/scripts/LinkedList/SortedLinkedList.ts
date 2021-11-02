/**
 * 有序链表
 */
import { LinkedNode as Node } from '@utils/nodes';
import type { ISortedLinkedListOptions } from './interface';
import LinkedList from './index';
export default class SortedLinkedList<T = any> extends LinkedList<T> {
  protected options: ISortedLinkedListOptions<T>;
  constructor(options?: Partial<ISortedLinkedListOptions<T>>) {
    const DEFAULT_OPTIONS: ISortedLinkedListOptions<T> = {
      compareFn(a, b) {
        return a < b ? -1 : 1;
      },
      equalsFn(element, item) {
        return element === item;
      },
    };
    super();
    this.options = { ...DEFAULT_OPTIONS, ...options };
  }

  push(element: T) {
    const { compareFn } = this.options;
    const node = new Node<T>(element);
    if (this.isEmpty() || !this.head) {
      this.head = node;
    } else {
      let current = this.head;
      let inserted = false;

      if (compareFn(element, this.head.element) === -1) {
        node.next = this.head;
        this.head = node;
      } else {
        for (let i = 1; i < this.count && current?.next; i++) {
          if (compareFn(element, current.next.element) === -1) {
            // element 小于 next 的 element，插入当前位置
            node.next = current.next;
            current.next = node;
            inserted = true;
            break;
          }
          current = current.next;
        }
        // 循环完成后还没有插入，则插入末尾
        !inserted && (current.next = node);
      }
    }
    this.count++;
    return node;
  }

  insert(element: T) {
    return this.push(element);
  }
}
