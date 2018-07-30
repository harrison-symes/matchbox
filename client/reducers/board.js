const createBoard = () => Array(9).fill(0).map((el, i) => Array(9).fill(0).map((el, j) => ({
    i,
    j,
    isWall: false,
    inPosition: null,
  }))
)

export default function (state = createBoard(), action) {
  let newState = [...state]
  switch(action.type) {
    case 'POPULATE_BOARD':
      newState[1][2].inPosition = action.roster[0]
      return newState
    default:
      return state
  }
}
