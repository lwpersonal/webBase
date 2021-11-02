import SortedLinkedList from '../../scripts/LinkedList/SortedLinkedList';

describe('SortedLinkedList 测试', () => {
  let sortedLinkedList: SortedLinkedList<number> | null = null;
  beforeAll(() => {
    sortedLinkedList = new SortedLinkedList();
  });

  test('尾部插入 push', () => {
    sortedLinkedList.push(3);
    sortedLinkedList.push(5);
    sortedLinkedList.push(50);
    sortedLinkedList.push(4);
    sortedLinkedList.push(2);
    sortedLinkedList.push(1);

    expect(sortedLinkedList.getSize()).toBe(6);
    expect(sortedLinkedList.toString()).toBe('1,2,3,4,5,50');
  });
});
