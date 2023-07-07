// 反转链表

// 递归
function reverseList(head) {
  if (!head || !head.next) {
    return head;
  }
  const _head = reverseList(head.next);
  head.next.next = head;
  head.next = null;
  return _head;
}

// 1 => 2 => 3 => 4 => 5 => null
// 1 => 2 => 3 => 4 => null
// 5 => 4 => null

// 原地遍历
function reverseList(head) {
  if (!head || !head.next) {
    return head;
  }
  let current = head;
  let _head = head.next;
  head.next = null;
  while (_head.next) {
    const _next = _head.next;
    _head.next = current;
    current = _head;
    _head = _next;
  }
  _head.next = current;

  return _head;
}

// - => 1 => 2 => 3 => 4 => 5 => null
