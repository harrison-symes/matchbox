import {combineReducers} from 'redux'

import auth from './auth'
import socket from './socket'
import game from './game'
import board from './board'
import roster from './roster'

export default combineReducers({
  auth,
  socket,
  game,
  board,
  roster
})
