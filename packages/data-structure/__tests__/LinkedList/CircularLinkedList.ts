import CircularLinkedList from '../../scripts/LinkedList/CircularLinkedList';

describe('LinkedList 测试', () => {
  let circularLinkedList: CircularLinkedList<number> | null = null;
  beforeAll(() => {
    circularLinkedList = new CircularLinkedList();
  });

  test('isEmpty', () => {
    expect(circularLinkedList.isEmpty()).toBe(true);
  });

  test('尾部插入 push', () => {
    circularLinkedList.push(1);
    circularLinkedList.push(2);
    circularLinkedList.push(5);

    expect(circularLinkedList.getSize()).toBe(3);
  });

  test('toString', () => {
    expect(circularLinkedList.toString()).toBe('1,2,5');
  });

  test('返回特定位置的元素', () => {
    expect(circularLinkedList.getElementAt(0).element).toBe(1);
    expect(circularLinkedList.getElementAt(1).element).toBe(2);
    expect(circularLinkedList.getElementAt(2).element).toBe(5);

    expect(
      circularLinkedList.getElementAt(circularLinkedList.getSize() - 1).next
        .element,
    ).toBe(1);
  });

  test('特定位置插入元素', () => {
    circularLinkedList.insert(6, 0);
    expect(circularLinkedList.toString()).toBe('6,1,2,5');
    expect(circularLinkedList.getSize()).toBe(4);
    // 此时最后一个元素指向新的 head
    expect(
      circularLinkedList.getElementAt(circularLinkedList.getSize() - 1).next
        .element,
    ).toBe(6);
    circularLinkedList.insert(9, circularLinkedList.getSize());
    expect(
      circularLinkedList.getElementAt(circularLinkedList.getSize() - 1).next
        .element,
    ).toBe(6);
    expect(circularLinkedList.toString()).toBe('6,1,2,5,9');
    expect(circularLinkedList.getSize()).toBe(5);
    circularLinkedList.insert(11, 2);
    expect(circularLinkedList.toString()).toBe('6,1,11,2,5,9');
    expect(circularLinkedList.getSize()).toBe(6);
  });

  test('特定位置移除一个元素', () => {
    expect(circularLinkedList.removeAt(-2)).toBe(null);
    expect(circularLinkedList.toString()).toBe('6,1,11,2,5,9');
    expect(circularLinkedList.getSize()).toBe(6);
    expect(circularLinkedList.removeAt(0)).toBe(6);
    expect(circularLinkedList.toString()).toBe('1,11,2,5,9');
    expect(
      circularLinkedList.getElementAt(circularLinkedList.getSize() - 1).next
        .element,
    ).toBe(1);
    expect(circularLinkedList.getSize()).toBe(5);
    expect(circularLinkedList.removeAt(circularLinkedList.getSize())).toBe(
      null,
    );
    expect(circularLinkedList.toString()).toBe('1,11,2,5,9');
    expect(circularLinkedList.getSize()).toBe(5);
    expect(circularLinkedList.removeAt(circularLinkedList.getSize() - 1)).toBe(
      9,
    );
    expect(circularLinkedList.toString()).toBe('1,11,2,5');
    expect(
      circularLinkedList.getElementAt(circularLinkedList.getSize() - 1).next
        .element,
    ).toBe(1);
    expect(circularLinkedList.getSize()).toBe(4);
    expect(circularLinkedList.removeAt(1)).toBe(11);
    expect(circularLinkedList.toString()).toBe('1,2,5');
    expect(circularLinkedList.getSize()).toBe(3);
  });

  test('返回元素的索引', () => {
    expect(circularLinkedList.indexOf(0)).toBe(-1);
    expect(circularLinkedList.indexOf(1)).toBe(0);
    expect(circularLinkedList.indexOf(2)).toBe(1);
    expect(circularLinkedList.indexOf(5)).toBe(2);
    expect(circularLinkedList.indexOf(55)).toBe(-1);
  });

  test('移除元素', () => {
    circularLinkedList.push(6);
    circularLinkedList.push(7);
    circularLinkedList.push(18);
    expect(circularLinkedList.toString()).toBe('1,2,5,6,7,18');
    expect(circularLinkedList.remove(2)).toBe(2);
    expect(circularLinkedList.toString()).toBe('1,5,6,7,18');
    expect(circularLinkedList.remove(1)).toBe(1);
    expect(
      circularLinkedList.getElementAt(circularLinkedList.getSize() - 1).next
        .element,
    ).toBe(5);
    expect(circularLinkedList.toString()).toBe('5,6,7,18');
    expect(circularLinkedList.remove(18)).toBe(18);
    expect(
      circularLinkedList.getElementAt(circularLinkedList.getSize() - 1).next
        .element,
    ).toBe(5);
    expect(circularLinkedList.toString()).toBe('5,6,7');
  });

  test('clear', () => {
    circularLinkedList.clear();
    expect(circularLinkedList.isEmpty()).toBe(true);
  });
});
