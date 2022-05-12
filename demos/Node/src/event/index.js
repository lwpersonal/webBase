// const EventEmitter = require('events');

// let emitter = new EventEmitter();

// emitter.on('myEvent', () => {
//   console.log('hi 1');
// });

// emitter.on('myEvent', () => {
//   console.log('hi 2');
// });

// emitter.emit('myEvent');


// const EventEmitter = require('events');

// let emitter = new EventEmitter();

// emitter.on('myEvent', () => {
//   console.log('hi');
//   emitter.emit('myEvent');
// });

// emitter.emit('myEvent');


const EventEmitter = require('events');

let emitter = new EventEmitter();

let i = 0;
function sth (mark) {
  console.log('hi', mark);
  i++;
  emitter.on('myEvent', sth.bind(this, i));
}
emitter.on('myEvent', sth.bind(this, i));
emitter.emit('myEvent');
emitter.emit('myEvent');
emitter.emit('myEvent');
