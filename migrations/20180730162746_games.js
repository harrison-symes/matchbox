
exports.up = function(knex, Promise) {
  return knex.schema.createTableIfNotExists('games', table => {
    table.increments('id')
    table.integer('player_one')
    table.integer('player_two')
    table.boolean('is_complete').defaultTo(false)
  })
};

exports.down = function(knex, Promise) {
  return knex.schema.dropTableIfExists('games')
};
