const {joinQueue, leaveDouble,leaveQueue, readQueue, findOther} = require('./db/queue')

const {createGame, getGameById} = require('./db/games')

const pendingQueue = user_id => {
  return new Promise(function(resolve, reject) {
    findOther(user_id)
      .then(other => {
        console.log({other});
        if (other) resolve(other)
        else setTimeout(() => resolve(pendingQueue(user_id)),5000)
      })
  });
}

module.exports = http => {
  var io = require('socket.io')(http);

  io.on('connection', (socket) => {
      console.log(`A user connected at ${new Date()}`)
      // io.emit('connectedUsers', socket.Server.parser.CONNECT)
      socket.on('disconnect', function () {
        console.log(`A user disconnected at ${new Date()}`);
        leaveQueue(null, socket.id)
          .then(() => {
            console.log("user has left a queue");
          })
      });

      socket.on('joinGame', game_id => {
        socket.join(game_id)
        console.log(socket.id, 'joining', game_id);
        getGameById(game_id)
          .then(game => {
            io.to(socket.id).emit('gameInfo', game)
          })
      })

      socket.on('joinQueue', function (user_id) {
        console.log(user_id);
        return findOther(user_id)
        .then(other => {
          console.log({other});
          if (!other) {
            leaveQueue(user_id, socket.id)
            .then(() => joinQueue(user_id, socket.id))
            .then(() => {
              socket.emit('queueJoined')
            })
          } else {
            console.log(other.socket_id, socket.id, 'should make a game');
            createGame(user_id, other.id)
              .then(game_id => {
                console.log({game_id});
                leaveDouble(user_id, other.user_id)
                  .then(() => {
                    console.log("game left");
                    io.to(socket.id).emit('joinGame', game_id[0])
                    io.to(other.socket_id).emit('joinGame', game_id[0])
                  })
              })
          }
        })
      })

  });

  return io
}
