/**
 * 循环链表
 */
import LinkedList from './index';
import type { ILinkedListOptions } from './interface';

export default class CircularLinkedList<T = any> extends LinkedList<T> {
  constructor(options?: Partial<ILinkedListOptions<T>>) {
    super(options);
  }

  /**
   * @description 重新更新结尾指针指向 head
   */
  private updateLastNode() {
    const lastItem = this.getElementAt(this.count - 1);
    lastItem && (lastItem.next = this.head);
  }
  // 尾部插入函数
  push(element: T) {
    const lastNode = super.push(element);
    lastNode.next = this.head;
    return lastNode;
  }

  // 特定位置插入元素
  insert(element: T, position: number) {
    if (position > this.count || position < 0) {
      return false;
    }
    const res = super.insert(element, position);
    if (position === 0) {
      this.updateLastNode();
    }
    return res;
  }

  // 特定位置移除一个元素
  removeAt(position: number) {
    if (this.isEmpty() || position >= this.count || position < 0) {
      return null;
    }
    const res = super.removeAt(position);
    if (position === 0 || position === this.count - 1) {
      // 移除第一个元素和最后一个元素时，需要更新循环节点的指向
      this.updateLastNode();
    }
    return res;
  }

  // 移除元素
  remove(element: T) {
    if (this.isEmpty() || !this.head) {
      return null;
    }
    const res = super.remove(element);
    this.updateLastNode();
    return res;
  }
}
