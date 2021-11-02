/**
 * 队列
 */
import type { IBaseItems } from '@utils/interface';
export default class Queue<T> {
  protected items: IBaseItems<T> = {};
  protected count = 0;
  protected startIndex = 0;
  constructor() {
    //
  }
  public enqueue(val: T) {
    this.items[this.count] = val;
    this.count++;
  }
  public dequeue() {
    if (this.isEmpty()) {
      return null;
    }
    const res = this.items[this.startIndex];
    delete this.items[this.startIndex];
    this.startIndex++;
    return res;
  }
  public peek() {
    if (this.isEmpty()) {
      return null;
    }
    return this.items[this.startIndex];
  }
  public isEmpty() {
    return this.size() === 0;
  }
  public size() {
    return this.count - this.startIndex >= 0 ? this.count - this.startIndex : 0;
  }
  public clear() {
    this.items = {};
    this.count = 0;
    this.startIndex = 0;
    return true;
  }
  public toString() {
    if (this.isEmpty()) {
      return '';
    }
    let str = String(this.items[this.startIndex]);
    let index = this.startIndex + 1;
    while (index < this.count) {
      str = `${str},${this.items[index]}`;
      index++;
    }
    return str;
  }
}
