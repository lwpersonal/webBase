// import { test, expect } from 'jest';
import { consoleStr } from '../src/index';

describe('jest 测试 demo', () => {
  test('demo 1', () => {
    const res = consoleStr();
    expect(res).toEqual('type test');
    expect(1).toEqual(1);
  });
});
