function printMemory() {
  const { rss, heapUsed } = process.memoryUsage();
  console.log(`rss: ${(rss / 1024 / 1024).toFixed(2)}MB, heapUsed: ${(heapUsed / 1024 / 1024).toFixed(2)}MB`);
}

// let arr = [];
// setInterval(() => {
//   console.log(arr.length);
//   printMemory();
// }, 1000);
// setInterval(() => {
//   arr.push(1);
  
// }, 10);



const cacheArrWjw = [];
setInterval(() => {
  // cacheArrWjw.push(new ArrayBuffer(10000));

  cacheArrWjw.push(undefined);

}, 10);

setInterval(() => {
  console.log(cacheArrWjw.length);
  printMemory();
}, 1000);
