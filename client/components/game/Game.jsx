import React from 'react'
import {connect} from 'react-redux'

class Game extends React.Component {
  componentDidMount() {

  }

  render() {
    const {game, auth} = this.props
    const cubeStyle = {
      width: '8vh',
      height: '8vh',
      backgroundColor: 'grey',
      border: '1px solid black'
    }

    return <div className="container">
      <div className="columns">
        <div className="column is-3">
          {<React.Fragment>
            <h1>You are in a game!</h1>
            <ul>
              <li>Game Id: {game.id}</li>
              <li>Player one ID: {game.player_one}</li>
              <li>Player two ID: {game.player_two}</li>
              <li>You are Player {game.is_player_one ? 'One' : 'Two'}</li>
            </ul>
          </React.Fragment>}
        </div>
      </div>
      <div className="columns is-centered">
        {Array(9).fill(0).map((el, i) => <div>
          {Array(9).fill(0).map((el, j) => <div style={cubeStyle}>
            X
          </div>)}
        </div>)}

      </div>
    </div>
  }
}

const mapStateToProps = state => state

export default connect(mapStateToProps)(Game)
