/**
 * 散列表
 */
import { loseLoseHashCode } from '@utils';
class ValuePair<K, V> {
  key: K;
  value: V;
  constructor(key: K, value: V) {
    this.key = key;
    this.value = value;
  }
  toString() {
    return `[#${this.key}: ${this.value}]`;
  }
}
export default class HashMap<K = any, V = any> {
  protected size: number;
  table: {
    [key: string]: {
      value: V;
      key: K;
    };
  };
  constructor() {
    this.size = 0;
    this.table = {};
  }

  clear() {
    this.size = 0;
    this.table = {};
  }

  put(key: K, value: V) {
    if (key === null || value === null) {
      return false;
    }
    const position = loseLoseHashCode(key);
    if (this.table[position] === null || this.table[position] === void 0) {
      // 没有 hash 冲突的值，直接插入
      this.table[position] = new ValuePair<K, V>(key, value);
    } else {
      // 有 hash 冲突，找后面的位置，直到找到空位置插入
      let index = position + 1;
      while (this.table[index] !== null && this.table[index] !== void 0) {
        index++;
      }
      this.table[index] = new ValuePair<K, V>(key, value);
    }
    this.size++;
    return true;
  }

  get(key: K) {
    const position = loseLoseHashCode(key);
    if (this.table[position] !== null && this.table[position] !== void 0) {
      if (this.table[position].key === key) {
        return this.table[position];
      } else {
        let index = position + 1;
        while (
          this.table[index] !== null &&
          this.table[index] !== void 0 &&
          this.table[index].key !== key
        ) {
          index++;
        }
        if (
          this.table[index] !== null &&
          this.table[index] !== void 0 &&
          this.table[index].key === key
        ) {
          return this.table[index];
        }
      }
    }
    return void 0;
  }

  remove(key: K) {
    const position = loseLoseHashCode(key);
    if (this.table[position] !== null && this.table[position] !== void 0) {
      if (this.table[position].key === key) {
        delete this.table[position];
        this.verifyRemoveSideEffect(key, position);
        this.size--;
        return true;
      } else {
        let index = position + 1;
        while (
          this.table[index] !== null &&
          this.table[index] !== void 0 &&
          this.table[index].key !== key
        ) {
          index++;
        }
        if (
          this.table[index] !== null &&
          this.table[index] !== void 0 &&
          this.table[index].key === key
        ) {
          delete this.table[index];
          this.verifyRemoveSideEffect(key, index);
          this.size--;
          return true;
        }
      }
    }
    return false;
  }

  getSize() {
    return this.size;
  }

  protected verifyRemoveSideEffect(key: K, removePosition: number) {
    const hash = loseLoseHashCode(key);
    let index = removePosition + 1;
    while (this.table[index] !== null && this.table[index] !== undefined) {
      const posHash = loseLoseHashCode(this.table[index].key);
      if (posHash <= hash || posHash <= removePosition) {
        this.table[removePosition] = this.table[index];
        delete this.table[index];
        removePosition = index;
      }
      index++;
    }
  }
}
