import React from 'react'
import {connect} from 'react-redux'

import Cell from './Cell'

import classConstructor from '../../utils/classConstructors'

class Game extends React.Component {
  componentDidMount() {
    this.props.dispatch({
      type: 'POPULATE_BOARD',
      roster: this.props.roster.map(dude => classConstructor(dude))
    })
  }
  render() {
    const {game, auth, board} = this.props
    return <div className="container">
      <div className="columns">
        <div className="column is-3">
          {<React.Fragment>
            <h1>You are in a game!</h1>
            <ul>
              <i className="icon ra ra-arena" />
              <li>Game Id: {game.id}</li>
              <li>Player one ID: {game.player_one}</li>
              <li>Player two ID: {game.player_two}</li>
              <li>You are Player {game.is_player_one ? 'One' : 'Two'}</li>
            </ul>
          </React.Fragment>}
        </div>
      </div>
      <div className="columns is-centered">
        {board.map((row, i) => <div>
          {row.map((cell, j) => <Cell cell={cell} />)}
        </div>)}

      </div>
    </div>
  }
}

const mapStateToProps = state => state

export default connect(mapStateToProps)(Game)
