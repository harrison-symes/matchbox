const createBoard = () => Array(9).fill(0).map((el, i)
  => Array(9).fill(0).map((el, j) => ({
    i,
    j,
    isWall: false,
    inPosition: null,
  }))
)

export function (state = createBoard(), action) {

  return default
}
