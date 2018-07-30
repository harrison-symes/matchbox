const db = require('./connection')

const getGameById = id => db('games')
  .where({id})
  .first()

module.exports = {
  createGame: (player_one, player_two) => db('games')
    .insert({player_one, player_two}, 'id'),
  getGameById
}
