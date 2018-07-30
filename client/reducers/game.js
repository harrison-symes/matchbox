const initialState = {
  inGame: false,
  inQueue: false,
  player_one: null,
  player_two: null,
  id: null
}

export default (state = initialState, action) => {
  let newState = {...state}
  switch (action.type) {
    case 'JOIN_QUEUE':
      return {
        ...state,
        inQueue: true
      }
    case 'JOIN_GAME':
      console.log({action});
      return {
        ...state,
        inGame: true,
        inQueue: false,
        gameReady: false,
        id: action.game.id,
        player_one: action.game.player_one,
        player_two: action.game.player_two,
        is_player_one: action.is_player_one
      }
    default: return state
  }
}
