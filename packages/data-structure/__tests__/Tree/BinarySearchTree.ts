import BinarySearchTree from '@scripts/Tree/BinarySearchTree';

describe('BinarySearchTree 测试', () => {
  let binarySearchTree: BinarySearchTree<number> | null = null;
  beforeAll(() => {
    binarySearchTree = new BinarySearchTree();
  });

  test('插入', () => {
    [11, 7, 15, 5, 3, 9, 8, 10, 13, 12, 14, 20, 18, 25, 6].forEach(item =>
      binarySearchTree.insert(item),
    );
    expect(binarySearchTree.root.value).toBe(11);
    expect(binarySearchTree.root.left.value).toBe(7);
    expect(binarySearchTree.root.left.left.left.value).toBe(3);
    expect(binarySearchTree.root.left.right.left.value).toBe(8);
    expect(binarySearchTree.root.right.value).toBe(15);
  });

  test('中序遍历', () => {
    let str = '';
    binarySearchTree.inOrderTraverse(
      item => (str = str ? `${str},${item}` : `${item}`),
    );
    expect(str).toBe('3,5,6,7,8,9,10,11,12,13,14,15,18,20,25');
  });

  test('先序遍历', () => {
    let str = '';
    binarySearchTree.preOrderTraverse(
      item => (str = str ? `${str},${item}` : `${item}`),
    );
    expect(str).toBe('11,7,5,3,6,9,8,10,15,13,12,14,20,18,25');
  });

  test('后序遍历', () => {
    let str = '';
    binarySearchTree.postOrderTraverse(
      item => (str = str ? `${str},${item}` : `${item}`),
    );
    expect(str).toBe('3,6,5,8,10,9,7,12,14,13,18,25,20,15,11');
  });

  test('最小值', () => {
    expect(binarySearchTree.min().value).toBe(3);
  });

  test('最大值', () => {
    expect(binarySearchTree.max().value).toBe(25);
  });

  test('搜索', () => {
    expect(binarySearchTree.search(25)).toBe(true);
    expect(binarySearchTree.search(255)).toBe(false);
    expect(binarySearchTree.search(11)).toBe(true);
  });

  test('删除', () => {
    expect(binarySearchTree.remove(6));
    expect(binarySearchTree.remove(5));
    expect(binarySearchTree.remove(15));
    let str = '';
    binarySearchTree.inOrderTraverse(
      item => (str = str ? `${str},${item}` : `${item}`),
    );
    expect(str).toBe('3,7,8,9,10,11,12,13,14,18,20,25');
  });

  test('获取高度', () => {
    expect(binarySearchTree.getHeight()).toBe(3);
  });
});
