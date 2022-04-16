const Knex = require('knex');

const knex = Knex({
  client: 'sql',
  // Params
});

const str = knex.select('id as Id').from('wwwwwwww').where({
  a: 1,
});

console.log(str);
