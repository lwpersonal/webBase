const readline = require('readline');
const fs = require('fs');
const path = require('path');

const rl = readline.createInterface({
  input: fs.createReadStream(path.resolve(__dirname, './text.txt'))
});

rl.on('line', (line) => {
  console.log(`Line from file: ${line}`);
});