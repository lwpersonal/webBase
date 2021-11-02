import Stack from '../scripts/Stack';

describe('Stack 测试', () => {
  let stack: Stack<number> | null = null;
  beforeAll(() => {
    stack = new Stack();
  });

  test('isEmpty', () => {
    expect(stack.isEmpty()).toBe(true);
  });

  test('入栈', () => {
    stack.push(1);
    stack.push(2);
    stack.push(5);

    expect(stack.getSize()).toBe(3);
  });

  test('toString', () => {
    expect(stack.toString()).toBe('1,2,5');
  });

  test('查看栈顶元素', () => {
    expect(stack.peek()).toBe(5);
  });

  test('出栈', () => {
    expect(stack.pop()).toBe(5);
    expect(stack.getSize()).toBe(2);
    expect(stack.peek()).toBe(2);
    expect(stack.toString()).toBe('1,2');
  });

  test('clear', () => {
    stack.clear();
    expect(stack.isEmpty()).toBe(true);
    expect(stack.peek()).toBe(null);
  });
});
