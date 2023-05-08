// let counter = 0;
// counter++;

// module.exports = {
//   counter,
//   add() {
//     counter++;
//     console.log('-----', counter);
//     return counter;
//   },
// };

module.exports.a = 1;
module.exports.add = () => {
  module.exports.a += 1;
};
