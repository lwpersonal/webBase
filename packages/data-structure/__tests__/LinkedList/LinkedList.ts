import LinkedList from '../../scripts/LinkedList';

describe('LinkedList 测试', () => {
  let linkedList: LinkedList<number> | null = null;
  beforeAll(() => {
    linkedList = new LinkedList();
  });

  test('isEmpty', () => {
    expect(linkedList.isEmpty()).toBe(true);
  });

  test('尾部插入 push', () => {
    linkedList.push(1);
    linkedList.push(2);
    linkedList.push(5);

    expect(linkedList.getSize()).toBe(3);
  });

  test('toString', () => {
    expect(linkedList.toString()).toBe('1,2,5');
  });

  test('返回特定位置的元素', () => {
    expect(linkedList.getElementAt(0).element).toBe(1);
    expect(linkedList.getElementAt(1).element).toBe(2);
    expect(linkedList.getElementAt(2).element).toBe(5);
  });

  test('特定位置插入元素', () => {
    linkedList.insert(6, 0);
    expect(linkedList.toString()).toBe('6,1,2,5');
    expect(linkedList.getSize()).toBe(4);
    linkedList.insert(9, linkedList.getSize());
    expect(linkedList.toString()).toBe('6,1,2,5,9');
    expect(linkedList.getSize()).toBe(5);
    linkedList.insert(11, 2);
    expect(linkedList.toString()).toBe('6,1,11,2,5,9');
    expect(linkedList.getSize()).toBe(6);
  });

  test('特定位置移除一个元素', () => {
    expect(linkedList.removeAt(-2)).toBe(null);
    expect(linkedList.toString()).toBe('6,1,11,2,5,9');
    expect(linkedList.getSize()).toBe(6);
    expect(linkedList.removeAt(0)).toBe(6);
    expect(linkedList.toString()).toBe('1,11,2,5,9');
    expect(linkedList.getSize()).toBe(5);
    expect(linkedList.removeAt(linkedList.getSize())).toBe(null);
    expect(linkedList.toString()).toBe('1,11,2,5,9');
    expect(linkedList.getSize()).toBe(5);
    expect(linkedList.removeAt(linkedList.getSize() - 1)).toBe(9);
    expect(linkedList.toString()).toBe('1,11,2,5');
    expect(linkedList.getSize()).toBe(4);
    expect(linkedList.removeAt(1)).toBe(11);
    expect(linkedList.toString()).toBe('1,2,5');
    expect(linkedList.getSize()).toBe(3);
  });

  test('返回元素的索引', () => {
    expect(linkedList.indexOf(0)).toBe(-1);
    expect(linkedList.indexOf(1)).toBe(0);
    expect(linkedList.indexOf(2)).toBe(1);
    expect(linkedList.indexOf(5)).toBe(2);
    expect(linkedList.indexOf(55)).toBe(-1);
  });

  test('移除元素', () => {
    linkedList.push(6);
    linkedList.push(7);
    linkedList.push(18);
    expect(linkedList.toString()).toBe('1,2,5,6,7,18');
    expect(linkedList.remove(2)).toBe(2);
    expect(linkedList.toString()).toBe('1,5,6,7,18');
    expect(linkedList.remove(1)).toBe(1);
    expect(linkedList.toString()).toBe('5,6,7,18');
    expect(linkedList.remove(18)).toBe(18);
    expect(linkedList.toString()).toBe('5,6,7');
  });

  test('clear', () => {
    linkedList.clear();
    expect(linkedList.isEmpty()).toBe(true);
  });
});
