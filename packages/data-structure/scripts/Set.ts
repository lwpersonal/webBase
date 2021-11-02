/**
 * 集合
 */
export default class SelfSet<T> extends Set<T> {
  constructor() {
    super();
  }
  // 并集
  union(otherSet: Set<T>) {
    const resSet = new Set();
    for (const item of this.values()) {
      resSet.add(item);
    }
    for (const item of otherSet.values()) {
      resSet.add(item);
    }
    return resSet;
  }
  // 交集
  intersection(otherSet: Set<T>) {
    const resSet = new Set<T>();
    let bigSet: Set<T>;
    let smallSet: Set<T>;
    if (this.size >= otherSet.size) {
      bigSet = this;
      smallSet = otherSet;
    } else {
      bigSet = otherSet;
      smallSet = this;
    }
    for (const item of smallSet.values()) {
      bigSet.has(item) && resSet.add(item);
    }
    return resSet;
  }
  // 差集
  difference(otherSet: Set<T>) {
    const resSet = new Set<T>();
    let bigSet: Set<T>;
    let smallSet: Set<T>;
    if (this.size >= otherSet.size) {
      bigSet = this;
      smallSet = otherSet;
    } else {
      bigSet = otherSet;
      smallSet = this;
    }
    for (const item of bigSet.values()) {
      !smallSet.has(item) && resSet.add(item);
    }
    return resSet;
  }
  // 是否是给定 set 的子集
  isSubsetOf(parentSet: Set<T>) {
    if (this.size > parentSet.size) {
      return false;
    }
    return [...this].every(item => parentSet.has(item));
  }
}
