/**
 * 凑银币
 * 输入：coins = [1, 2, 5], amount = 11
 * 输出：3
 * 解释：11 = 5 + 5 + 1
 */

function coinChange(coins, amount) {
  const cache = [0, 1];
  function dp(n) {
    if (n < 0) {
      return -1;
    }
    if (cache[n]) {
      return cache[n];
    }
    let res = Number.MAX_SAFE_INTEGER;
    coins.forEach(coin => {
      const num = dp(n - coin);
      if (num !== -1) {
        res = Math.min(num, res);
      }
    });
    if (res === Number.MAX_SAFE_INTEGER) {
      res = -1;
    }
    cache[n] = res + 1;
    return cache[n];
  }
  return dp(amount);
}
