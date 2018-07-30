const {hashSync} = require('../server/auth/hash')

exports.seed = function(knex, Promise) {
  // Deletes ALL existing entries
  return knex('users').del()
    .then(function () {
      // Inserts seed entries
      return knex('users').insert([
        {id: 1, user_name: 'good', hash: hashSync('good')},
        {id: 2, user_name: 'bad', hash: hashSync('bad')},
      ]);
    });
};
