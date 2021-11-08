import AVLTree from '@scripts/Tree/AVLTree';

describe('AVLTree 测试', () => {
  test('插入', () => {
    const AVLTreeInstance = new AVLTree<number>();
    [10, 5, 16, 20, 14, 12].forEach(item => {
      AVLTreeInstance.insert(item);
    });
    let str = '';
    AVLTreeInstance.inOrderTraverse(
      item => (str = str ? `${str},${item}` : `${item}`),
    );
    expect(str).toBe('5,10,12,14,16,20');
  });

  test('删除', () => {
    const AVLTreeInstance = new AVLTree<number>();
    [20, 15, 10, 17, 8, 24, 28].forEach(item => {
      AVLTreeInstance.insert(item);
    });
    let str = '';
    AVLTreeInstance.inOrderTraverse(
      item => (str = str ? `${str},${item}` : `${item}`),
    );
    expect(str).toBe('8,10,15,17,20,24,28');

    AVLTreeInstance.remove(28);
    let str1 = '';
    AVLTreeInstance.inOrderTraverse(
      item => (str1 = str1 ? `${str1},${item}` : `${item}`),
    );
    expect(str1).toBe('8,10,15,17,20,24');

    let str2 = '';
    AVLTreeInstance.preOrderTraverse(
      item => (str2 = str2 ? `${str2},${item}` : `${item}`),
    );
    expect(str2).toBe('15,10,8,20,17,24');
  });
});
