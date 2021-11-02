export function getDataType(data: any) {
  return Object.prototype.toString
    .call(data)
    .toLowerCase()
    .replace(/^\[object (\w+)\]$/, '$1');
}

export const isFunction = (data: any) => typeof data === 'function';
export const isArray = (data: any) => getDataType(data) === 'array';
export const isObject = (data: any) => getDataType(data) === 'object';
