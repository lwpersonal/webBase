import HashMap from '@scripts/Map/HashMap';

describe('HashMap 测试', () => {
  let hashMap: HashMap<string, number>;
  beforeAll(() => {
    hashMap = new HashMap();
  });

  test('put', () => {
    hashMap.put('Jonathan', 10);
    hashMap.put('Jamie', 19);
    hashMap.put('xm', 110);

    expect(hashMap.getSize()).toBe(3);
  });

  test('get', () => {
    expect(hashMap.get('Jonathan').value).toBe(10);
    expect(hashMap.get('Jonathan').key).toBe('Jonathan');
    expect(hashMap.get('Jamie').value).toBe(19);
    expect(hashMap.get('Jamie').key).toBe('Jamie');
    expect(hashMap.get('xm').value).toBe(110);
  });

  test('remove', () => {
    expect(hashMap.remove('Jonathan')).toBe(true);
    expect(hashMap.getSize()).toBe(2);
    expect(hashMap.remove('Jamie')).toBe(true);
    expect(hashMap.getSize()).toBe(1);
    expect(hashMap.remove('Jonathan')).toBe(false);
  });
});
