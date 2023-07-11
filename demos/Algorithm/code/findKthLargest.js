function mp_px(nums) {
  let count = 0;
  let flag = true;
  let num;
  let i = 0,
    j = 0;
  let len = nums.length;
  for (i = 0; i < len && flag; i++) {
    flag = false;
    for (j = 0; j < len - i - 1; j++) {
      if (nums[j] > nums[j + 1]) {
        num = nums[j];
        nums[j] = nums[j + 1];
        nums[j + 1] = num;
        flag = true;
      }
      count++;
    }
  }
  // console.log('count: ', count);
  return nums;
}

function ks_px(nums) {
  const len = nums.length;
  if (len <= 1) {
    return nums;
  }
  const middle = Math.floor(len / 2);
  const val = nums[middle];
  const left = [],
    right = [];
  for (let i = 0; i < len; i++) {
    if (i === middle) {
      continue;
    }
    if (nums[i] > val) {
      right.push(nums[i]);
    } else {
      left.push(nums[i]);
    }
  }
  return [...ks_px(left), val, ...ks_px(right)];
}

console.log(ks_px([3, 2, 1, 5, 6, 4]));

// 3,10,1,2,3,4,5

// 数组中的第K个最大元素

var findKthLargest = function (nums, k) {
  const arr = ks_px(nums);
  return arr[nums.length - k];
};
console.log(findKthLargest([1, 2, 3, 4, 5], 2));
