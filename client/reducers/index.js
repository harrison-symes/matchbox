import {combineReducers} from 'redux'

import auth from './auth'
import socket from './socket'
import game from './game'

export default combineReducers({
  auth,
  socket,
  game
})
