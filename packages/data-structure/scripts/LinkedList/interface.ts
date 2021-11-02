export interface ILinkedListOptions<T = any> {
  equalsFn: (element: T, item: T) => boolean;
}

export interface ISortedLinkedListOptions<T = any> extends ILinkedListOptions {
  equalsFn: (element: T, item: T) => boolean;
  compareFn: (a: T, b: T) => -1 | 1;
}
