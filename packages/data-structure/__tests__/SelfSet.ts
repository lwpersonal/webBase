import SelfSet from '../scripts/Set';

describe('Set 测试', () => {
  let set: SelfSet<number> | null = null;
  beforeAll(() => {
    set = new SelfSet();
    set.add(1);
    set.add(2);
    set.add(3);
    set.add(4);
  });

  test('并集', () => {
    const otherSet = new SelfSet<number>();
    otherSet.add(3);
    otherSet.add(4);
    otherSet.add(5);
    otherSet.add(6);

    const newSet = set.union(otherSet);
    expect(newSet.size).toBe(6);
    expect(newSet.has(6)).toBe(true);
    expect(newSet.has(1)).toBe(true);
  });

  test('交集', () => {
    const otherSet = new SelfSet<number>();
    otherSet.add(3);
    otherSet.add(4);
    otherSet.add(5);
    otherSet.add(6);

    const newSet = set.intersection(otherSet);
    expect(newSet.size).toBe(2);
    expect(newSet.has(6)).toBe(false);
    expect(newSet.has(1)).toBe(false);
    expect(newSet.has(3)).toBe(true);
    expect(newSet.has(4)).toBe(true);
  });

  test('差集', () => {
    const otherSet = new SelfSet<number>();
    otherSet.add(3);
    otherSet.add(4);
    otherSet.add(5);
    otherSet.add(6);

    const newSet = set.difference(otherSet);
    expect(newSet.size).toBe(2);
    expect(newSet.has(6)).toBe(false);
    expect(newSet.has(1)).toBe(true);
    expect(newSet.has(2)).toBe(true);
    expect(newSet.has(4)).toBe(false);
  });

  test('是否是给定 set 的子集', () => {
    const otherSet1 = new SelfSet<number>();
    otherSet1.add(3);
    otherSet1.add(4);
    otherSet1.add(5);
    otherSet1.add(6);
    expect(set.isSubsetOf(otherSet1)).toBe(false);

    const otherSet2 = new SelfSet<number>();
    otherSet2.add(1);
    otherSet2.add(2);
    otherSet2.add(3);
    otherSet2.add(4);
    otherSet2.add(5);
    expect(set.isSubsetOf(otherSet2)).toBe(true);
  });
});
