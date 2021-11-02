import DoublyLinkedList from '../../scripts/LinkedList/DoublyLinkedList';

describe('DoublyLinkedList 测试', () => {
  let doublyLinkedList: DoublyLinkedList<number> | null = null;
  beforeAll(() => {
    doublyLinkedList = new DoublyLinkedList();
  });

  test('isEmpty', () => {
    expect(doublyLinkedList.isEmpty()).toBe(true);
  });

  test('尾部插入 push', () => {
    doublyLinkedList.push(1);
    expect(doublyLinkedList.head.element).toBe(1);
    expect(doublyLinkedList.tail.element).toBe(1);
    doublyLinkedList.push(2);
    doublyLinkedList.push(5);
    expect(doublyLinkedList.head.element).toBe(1);
    expect(doublyLinkedList.tail.element).toBe(5);
    expect(doublyLinkedList.tail.prev.element).toBe(2);
    expect(doublyLinkedList.tail.prev.prev.element).toBe(1);

    expect(doublyLinkedList.getSize()).toBe(3);
  });

  test('toString', () => {
    doublyLinkedList.push(9);
    expect(doublyLinkedList.toString()).toBe('1,2,5,9');
  });

  test('返回元素的索引', () => {
    expect(doublyLinkedList.indexOf(0)).toBe(-1);
    expect(doublyLinkedList.indexOf(1)).toBe(0);
    expect(doublyLinkedList.indexOf(2)).toBe(1);
    expect(doublyLinkedList.indexOf(5)).toBe(2);
    expect(doublyLinkedList.indexOf(9)).toBe(3);
    expect(doublyLinkedList.indexOf(91)).toBe(-1);
  });

  test('返回特定位置的元素', () => {
    expect(doublyLinkedList.getElementAt(0).element).toBe(1);
    expect(doublyLinkedList.getElementAt(1).element).toBe(2);
    expect(doublyLinkedList.getElementAt(2).element).toBe(5);
    expect(doublyLinkedList.getElementAt(3).element).toBe(9);
    expect(doublyLinkedList.getSize()).toBe(4);

    expect(
      doublyLinkedList.getElementAt(doublyLinkedList.getSize() - 1).prev
        .element,
    ).toBe(5);
  });

  test('特定位置插入元素', () => {
    doublyLinkedList.insert(6, 0);
    expect(doublyLinkedList.toString()).toBe('6,1,2,5,9');
    expect(doublyLinkedList.getSize()).toBe(5);

    expect(doublyLinkedList.head.element).toBe(6);
    expect(doublyLinkedList.head.next.element).toBe(1);
    expect(doublyLinkedList.getElementAt(1).element).toBe(1);
    expect(doublyLinkedList.getElementAt(1).prev.element).toBe(6);

    doublyLinkedList.insert(90, doublyLinkedList.getSize());
    expect(doublyLinkedList.toString()).toBe('6,1,2,5,9,90');
    expect(doublyLinkedList.getSize()).toBe(6);
    expect(doublyLinkedList.tail.next).toBe(null);
    expect(doublyLinkedList.tail.prev.element).toBe(9);
    expect(doublyLinkedList.tail.element).toBe(90);
    expect(
      doublyLinkedList.getElementAt(doublyLinkedList.getSize() - 1).prev
        .element,
    ).toBe(9);
    expect(
      doublyLinkedList.getElementAt(doublyLinkedList.getSize() - 1).next,
    ).toBe(null);
    expect(
      doublyLinkedList.getElementAt(doublyLinkedList.getSize() - 2).next
        .element,
    ).toBe(90);

    doublyLinkedList.insert(11, 100);
    expect(doublyLinkedList.toString()).toBe('6,1,2,5,9,90');
    expect(doublyLinkedList.getSize()).toBe(6);

    doublyLinkedList.insert(11, 2);
    expect(doublyLinkedList.toString()).toBe('6,1,11,2,5,9,90');
    expect(doublyLinkedList.getSize()).toBe(7);

    expect(doublyLinkedList.getElementAt(2).element).toBe(11);
    expect(doublyLinkedList.getElementAt(2).prev.element).toBe(1);
    expect(doublyLinkedList.getElementAt(2).next.element).toBe(2);
    expect(doublyLinkedList.getElementAt(3).prev.element).toBe(11);
    expect(doublyLinkedList.getElementAt(1).next.element).toBe(11);
  });

  test('特定位置移除一个元素', () => {
    expect(doublyLinkedList.removeAt(-2)).toBe(null);
    expect(doublyLinkedList.toString()).toBe('6,1,11,2,5,9,90');
    expect(doublyLinkedList.getSize()).toBe(7);
    expect(doublyLinkedList.removeAt(0)).toBe(6);
    expect(doublyLinkedList.toString()).toBe('1,11,2,5,9,90');
    expect(doublyLinkedList.head.prev).toBe(null);
    expect(doublyLinkedList.head.next.element).toBe(11);

    expect(doublyLinkedList.removeAt(doublyLinkedList.getSize() - 1)).toBe(90);
    expect(
      doublyLinkedList.getElementAt(doublyLinkedList.getSize() - 1).next,
    ).toBe(null);
    expect(
      doublyLinkedList.getElementAt(doublyLinkedList.getSize() - 1).prev
        .element,
    ).toBe(5);
    expect(doublyLinkedList.tail.next).toBe(null);
    expect(doublyLinkedList.tail.prev.element).toBe(5);
    expect(doublyLinkedList.toString()).toBe('1,11,2,5,9');

    expect(doublyLinkedList.removeAt(1)).toBe(11);
    expect(doublyLinkedList.getElementAt(1).element).toBe(2);
    expect(doublyLinkedList.getElementAt(1).prev.element).toBe(1);
    expect(doublyLinkedList.getElementAt(1).next.element).toBe(5);
  });

  test('移除元素', () => {
    doublyLinkedList.push(6);
    doublyLinkedList.push(7);
    doublyLinkedList.push(18);
    expect(doublyLinkedList.toString()).toBe('1,2,5,9,6,7,18');
    expect(doublyLinkedList.remove(1)).toBe(1);
    expect(doublyLinkedList.toString()).toBe('2,5,9,6,7,18');

    expect(doublyLinkedList.getElementAt(0).element).toBe(2);
    expect(doublyLinkedList.getElementAt(0).prev).toBe(null);
    expect(doublyLinkedList.getElementAt(0).next.element).toBe(5);

    expect(doublyLinkedList.remove(0)).toBe(null);

    expect(doublyLinkedList.remove(18)).toBe(18);
    expect(
      doublyLinkedList.getElementAt(doublyLinkedList.getSize() - 1).next,
    ).toBe(null);
    expect(
      doublyLinkedList.getElementAt(doublyLinkedList.getSize() - 1).prev
        .element,
    ).toBe(6);
    expect(doublyLinkedList.tail.next).toBe(null);
    expect(doublyLinkedList.tail.prev.element).toBe(6);
    expect(doublyLinkedList.toString()).toBe('2,5,9,6,7');
  });

  test('clear', () => {
    doublyLinkedList.clear();
    expect(doublyLinkedList.isEmpty()).toBe(true);
  });
});
