const vm = require('vm')
let name = 'Node';
// global.name = 'G:Node';
let str = 'console.log(name)';
vm.runInThisContext(str); // name is not defined
// vm.runInNewContext(str, global); // name is not defined