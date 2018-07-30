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
      {game.inGame && <React.Fragment>
        <h1>You are in a game!</h1>
        <ul>
          <li>Game Id: {game.id}</li>
          <li>Player one ID: {game.player_one}</li>
          <li>Player two ID: {game.player_two}</li>
        </ul>
      </React.Fragment>}
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
