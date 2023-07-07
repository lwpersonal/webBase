// 合并有序链表
var mergeTwoLists = function (l1, l2) {
  const res = new ListNode();
  let current = res;
  let current1 = l1,
    current2 = l2;
  while (current1 || current2) {
    if (!current1) {
      current.next = current2;
      current2 = current2.next;
    } else if (!current2) {
      current.next = current1;
      current1 = current1.next;
    } else if (current1.val <= current2.val) {
      current.next = current1;
      current1 = current1.next;
    } else if (current1.val > current2.val) {
      current.next = current2;
      current2 = current2.next;
    }
    current = current.next;
  }
  return res.next;
};
