const db = require('./connection')

const leaveQueue = (user_id, socket_id) => {
  console.log({user_id, socket_id});
  return db('queue')
  .where({user_id})
  .orWhere({socket_id})
  .del()
}

module.exports = {
  joinQueue: (user_id, socket_id) => db('queue')
    .insert({user_id, socket_id}, 'id'),
  leaveQueue,
  leaveDouble: (user_one, user_two) => leaveQueue(user_one, 1)
    .then(() => leaveQueue(user_two, 1)),
  readQueue: () => db('queue')
    .select('user_id', 'socket_id'),
  findOther: user_id => db('queue')
    .whereNot({user_id})
    .first(),
}
