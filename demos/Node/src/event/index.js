// NOTE 绑定多个事件回调

// const EventEmitter = require('events');
// let emitter = new EventEmitter();
// emitter.on('myEvent', () => {
//   console.log('hi 1');
// });
// emitter.on('myEvent', () => {
//   console.log('hi 2');
// });
// emitter.emit('myEvent');

// NOTE 循环触发
// const EventEmitter = require('events');
// let emitter = new EventEmitter();
// let i = 10;
// emitter.on('myEvent', () => {
//   if (i <= 0) {
//     return;
//   }
//   i--;
//   console.log('hi');
//   emitter.emit('myEvent');
// });
// emitter.emit('myEvent');

// NOTE
// const EventEmitter = require('events');

// let emitter = new EventEmitter();

// let i = 0;
// function sth (mark) {
//   console.log('hi', mark);
//   i++;
//   emitter.on('myEvent', sth.bind(this, i));
// }
// emitter.on('myEvent', sth.bind(this, i));
// emitter.emit('myEvent');
// emitter.emit('myEvent');
// emitter.emit('myEvent');
