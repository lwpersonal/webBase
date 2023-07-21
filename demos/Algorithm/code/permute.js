/**
 * 输入：nums = [1,2,3]
 * 输出：[[1,2,3],[1,3,2],[2,1,3],[2,3,1],[3,1,2],[3,2,1]]
 */

// function permute(nums) {
//   const res = [];
//   const len = nums.length;
//   const map = new Map();

//   function fn(path) {
//     if (path.length === len) {
//       res.push(path.slice());
//       return;
//     }
//     for (let i = 0; i < len; i++) {
//       const item = nums[i];
//       const key = `${item}_${i}`;
//       if (map.has(key)) {
//         continue;
//       }
//       path.push(item);
//       map.set(key);
//       fn(path);
//       path.pop();
//       map.delete(key);
//     }
//   }

//   fn([]);
//   return res;
// }

function permute(nums) {
  const res = [];
  const map = new Map();
  const len = nums.length;
  function fn(path) {
    if (path.length === len) {
      res.push(path.slice());
      return;
    }
    for (let i = 0; i < len; i++) {
      const item = nums[i];
      const key = `${item}_${i}`;
      if (map.has(key)) {
        continue;
      }
      path.push(item);
      map.set(key, true);
      fn(path);
      path.pop();
      map.delete(key);
    }
  }
  fn([]);
  return res;
}

console.log(permute([1, 2, 3]));
