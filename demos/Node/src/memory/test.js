/**
 * 输出内存信息
 */
function printMemory() {
  const { rss, heapUsed } = process.memoryUsage();

  return {
    rss: `${(rss / 1024 / 1024).toFixed(2)}MB`,
    heapUsed: `${(heapUsed / 1024 / 1024).toFixed(2)}MB`,
  };
}

console.log(printMemory());

