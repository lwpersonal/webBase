// 链表是否有环

function hasCycle(head) {
  if (!head || !head.next) {
    return false;
  }

  let slow = head,
    fast = head;

  while (slow.next && fast) {
    slow = slow.next;
    fast = fast?.next?.next;
    if (slow === fast && slow) {
      return true;
    }
  }
  return false;
}
