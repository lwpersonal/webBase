/**
 * 散列函数 lose lose
 */
export const loseLoseHashCode = (key: any) => {
  if (typeof key === 'number') {
    return key;
  }
  const strKey =
    typeof key.toString === 'function' ? key.toString() : String(key);
  const hash = strKey.split('').reduce((res: number, item: string) => {
    return res + item.charCodeAt(0);
  }, 0);
  return hash % 37;
};

/**
 * 散列函数
 */
export const djb2HashCode = (key: any, num = 1013) => {
  const strKey =
    typeof key.toString === 'function' ? key.toString() : String(key);
  const hash = strKey.split('').reduce((res: number, item: string) => {
    res = res * 33 + item.charCodeAt(0);
  }, 5381);
  // num 为大于散列表的余数
  return hash % num;
};
