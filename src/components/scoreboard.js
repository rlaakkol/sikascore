import React from 'react'
import { connect } from 'react-redux'

import Pig from '../utils/pig'

const ScoreBoard = props => {

  const header = props.players.map((player, i) => (
    <th key={i}>
      {player}
    </th>
  ))
  const playerturns = []
  for (let i = 0; i < props.players.length; i++) {
    playerturns.push([])
  }
  for (let i = 0; i < props.scores.length; i++) {
    playerturns[i % props.players.length].push(props.scores[i])
  }

  const turnScores = playerturns.map(player => player.map(Pig.turnScore))

  const accumulations = turnScores.map(player => player.reduce((acc, cur) => [...acc, cur !== -1
    ? acc.length > 0
      ? acc[acc.length-1]+cur
      : cur
    : 0 /* Makin bacon */
    ], [])
  )

  const transposed = accumulations[0].map((col, i) =>
    accumulations.map(row => row[i])
  )

  const rows = transposed.map((row, i) =>
    <tr key={`row${i}`}>{row.map((score, j) => <td key={`cell${i}${j}`}>{score}</td>)}</tr>
  )


  return (
    <div className="table-responsive">
      <table className="table table-sm table-nonfluid">
        <thead>
          <tr>{header}</tr>
        </thead>
        <tbody>
          {rows}
        </tbody>
      </table>
    </div>
  )
}

ScoreBoard.propTypes = {
  scores: React.PropTypes.arrayOf(
    React.PropTypes.arrayOf(
      React.PropTypes.number
    )
  ).isRequired,
  players: React.PropTypes.number
}

function mapStateToProps(state) {
  return {
    scores: state.scoreBoard,
    players: state.players,
  }
}

export default connect(mapStateToProps)(ScoreBoard)
