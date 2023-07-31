/**
 * 旋转列表
 * 输入：head = [1,2,3,4,5], k = 2
 * 输出：[4,5,1,2,3]
 */
// 1234556;
function rotateRight(head, k) {
  if (!head || !head.next || k === 0) {
    return head;
  }

  let current = head;
  let current2 = head;
  while (k > 0) {
    k--;
    current = current.next || head;
  }
  if (current === head) {
    return head;
  }

  while (current.next) {
    current = current.next;
    current2 = current2.next;
  }
  const res = current2.next;
  current2.next = null;
  current.next = head;
  return res;
}
