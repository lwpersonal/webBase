const fs = require('fs');
const path = require('path')

fs.readFile(path.resolve(__dirname, './text.txt'), {} , (...args) => {
  console.log('read: ', args[1].toString());
});

fs.open(path.resolve(__dirname, './text.txt'), (...args) => {
  console.log('open: ', args);
})
