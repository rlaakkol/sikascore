const Position = {
  PLAINSIDE: 'PLAINSIDE',
  DOTSIDE: 'DOTSIDE',
  TROTTER: 'TROTTER',
  RAZORBACK: 'RAZORBACK',
  SNOUTER: 'SNOUTER',
  LEANER: 'LEANER',
  BACON: 'BACON'
}

const positionScore = (position) => {
  switch (position) {
    case Position.PLAINSIDE:
    case Position.DOTSIDE:
      return 0.25
    case Position.TROTTER:
    case Position.RAZORBACK:
      return 5
    case Position.SNOUTER:
      return 10
    case Position.LEANER:
      return 15
    case Position.BACON:
      return -1
    default:
      return 0
  }
}

const throwScore = (theThrow) => {
  const multiplier = theThrow[0] === theThrow[1] ? 2 : 1
  return Math.floor(multiplier * (positionScore(theThrow[0]) + positionScore(theThrow[1])))
}

const turnScore = throws =>
  throws.length > 0
    ? throwScore(throws[throws.length - 1]) > -1
      ? throws.
          map(throwScore).
          reduce((acc, cur) => cur < 1 ? 0 : acc + cur)
      : -1 /* Makin bacon */
  : 0

const scoreAccumulations = (players, turns) => {
  const playerturns = []
  for (let i = 0; i < players.length; i++) {
    playerturns.push([])
  }
  for (let i = 0; i < turns.length; i++) {
    playerturns[i % players.length].push(turns[i])
  }

  const turnScores = playerturns.map(player => player.map(turnScore))

  const accumulations = turnScores.map(player => player.reduce((acc, cur) => [...acc, cur !== -1
    ? acc.length > 0
      ? acc[acc.length-1]+cur
      : cur
    : 0 /* Makin bacon */
    ], [])
  )
  return accumulations
}

const isLastTurn = (players, turns, currentTurn) => {
  if (turns.length % players.length !== players.length - 1) return false
  const totals = scoreAccumulations(players, turns).map(ar => ar.length > 0 ? ar[ar.length-1] : 0)

  if (totals.filter(score => score >= 100).length > 0) return true
  if (totals[totals.length - 1] + turnScore(currentTurn) >= 100) return true
  return false
}

const gameEnded = (players, turns) => {
  const totals = scoreAccumulations(players, turns).map(ar => ar.length > 0 ? ar[ar.length-1] : 0)
  if (totals.filter(score => score >= 100).length > 0) return true
  return false
}

export default { Position, throwScore, turnScore, scoreAccumulations, isLastTurn, gameEnded }
