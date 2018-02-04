const Position = {
  PLAINSIDE: 'PLAINSIDE',
  DOTSIDE: 'DOTSIDE',
  TROTTER: 'TROTTER',
  RAZORBACK: 'RAZORBACK',
  SNOUTER: 'SNOUTER',
  LEANER: 'LEANER'
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
    ? throws[throws.length - 1] !== -1
      ? throws.
          map(throwScore).
          reduce((acc, cur) => cur < 1 ? 0 : acc + cur)
      : -1 /* Makin bacon */
  : 0

export default { Position, throwScore, turnScore }
