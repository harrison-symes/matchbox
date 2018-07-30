import React from 'react'
import {connect} from 'react-redux'

class Lobby extends React.Component {
  constructor(props) {
    super(props)

    const {socket} = this.props
    socket.on('queueJoined', () => {
      console.log("JOin queu");
      this.props.dispatch({
        type: 'JOIN_QUEUE'
      })
    })

    socket.on('joinGame', game_id => {
      console.log("request to join game", game_id);
      socket.emit('joinGame', game_id)
    })

    socket.on('gameInfo', game => {
      console.log({game});
      this.props.dispatch({
        type: 'JOIN_GAME',
        game
      })
    })
  }

  joinQueue = () => {
    const {socket, auth} = this.props
    socket.emit('joinQueue', auth.user.user_id)
  }

  render() {
    const {game} = this.props
    console.log(game);
    return <div className="section">
      {game.inGame && <h1>You are in a game {game.id}, {game.player_two}, {game.player_one}</h1>}
      {game.inQueue
        ? <h1>In Queue..</h1>
        : <button onClick={this.joinQueue}>Join Queue</button>
      }
    </div>
  }
}

const mapStateToProps = state => state

const mapDispatchToProps = dispatch => ({
  joinQueue: () => dispatch(joinQueue())
})

export default connect(mapStateToProps)(Lobby)
