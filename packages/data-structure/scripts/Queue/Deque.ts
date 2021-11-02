/**
 * 双端队列
 */
import Queue from './index';
// import type { IBaseItems } from '@utils/interface';
export default class Deque<T> extends Queue<T> {
  constructor() {
    super();
  }
  // 前端添加
  public addFront(val: T) {
    if (this.isEmpty()) {
      this.enqueue(val);
    } else {
      this.startIndex--;
      this.items[this.startIndex] = val;
    }
  }
  public removeBack() {
    if (this.isEmpty()) {
      return null;
    }
    this.count--;
    const res = this.items[this.count];
    delete this.items[this.count];
    return res;
  }
  public peekBack() {
    if (this.isEmpty()) {
      return null;
    }
    return this.items[this.count - 1];
  }
}
