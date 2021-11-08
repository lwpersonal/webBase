import AVLTree from '@scripts/Tree/AVLTree';

describe('AVLTree 测试', () => {
  test('插入', () => {
    const AVLTreeInstance = new AVLTree<number>();
    [10, 5, 16, 20, 14, 12].forEach(item => AVLTreeInstance.insert(item));
    let str = '';
    AVLTreeInstance.inOrderTraverse(
      item => (str = str ? `${str},${item}` : `${item}`),
    );
    expect(str).toBe('5,10,12,14,16,20');
  });
});
