const childProcess = require('child_process');
const path = require('path');

let mark = 'master';

// const p1 = childProcess.spawn('ls', ['-lh']);
// p1.stdout.on('data', data => {
//   console.log('输出');
//   process.stdout.write(data);
// });
// p1.stderr.on('data', data => {
//   console.error(`ps stderr: ${data}`);
// });

const p2 = childProcess.fork(path.resolve(__dirname, './fork.js'));
p2.on('data', data => {
  console.log('输出');
  process.stdout.write(data);
});
p2.on('data', data => {
  console.error(`ps stderr: ${data}`);
});
console.log(p2);
