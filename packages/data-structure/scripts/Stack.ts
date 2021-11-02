/**
 * 栈
 */
import type { IBaseItems } from '@utils/interface';
export default class Stack<T> {
  private items: IBaseItems<T> = {};
  private size = 0;

  constructor() {
    //
  }

  public isEmpty() {
    return this.size === 0;
  }

  public clear() {
    this.items = {};
    this.size = 0;
    return true;
  }

  public getSize() {
    return this.size;
  }

  // 查看栈顶元素
  public peek() {
    if (this.isEmpty()) {
      return null;
    }
    return this.items[this.size];
  }

  // 入栈
  public push(val: T) {
    this.size++;
    this.items[this.size] = val;
  }

  // 出栈
  public pop() {
    if (this.isEmpty()) {
      return null;
    }
    const val = this.items[this.size];
    delete this.items[this.size];
    this.size--;
    return val;
  }

  public toString() {
    if (this.isEmpty()) {
      return '';
    }
    let str = `${this.items[1]}`;
    for (let i = 2; i <= this.size; i++) {
      str = `${str},${this.items[i]}`;
    }
    return str;
  }
}
