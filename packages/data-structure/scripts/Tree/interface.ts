import type { COMPARE_STA } from './BinaryTree';
export interface IBinaryTreeOptions<T = any> {
  compareFn: (
    a: T,
    b: T,
  ) => COMPARE_STA.LESS_THEN | COMPARE_STA.BIGGER_THEN | COMPARE_STA.EQUAL;
}
