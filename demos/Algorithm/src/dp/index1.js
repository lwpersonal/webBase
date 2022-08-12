// const dp = [0];
const cut = (n, prices, dp) => {
  if (dp[n] > 0) {
    return dp[n];
  }
  if (n === 0) {
    return 0;
  }
  let max = Number.MIN_SAFE_INTEGER;
  for (let i = 0; i < n; i++) {
    max = Math.max(max, prices[i] + cut(n - i - 1, prices, dp));
  }
  dp[n] = max;
  return max;
};

console.log(cut(4, [1, 5, 8, 9, 10, 17, 17, 20, 24, 30], Array(10).fill(0)));
