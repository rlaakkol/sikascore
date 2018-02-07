import React from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'

import Pig from '../utils/pig'

const ScoreBoard = props => {

  const header = props.players.map((player, i) => (
    <th key={i}>
      {player}
    </th>
  ))

  const accumulations = Pig.scoreAccumulations(props.players, props.scores)

  const transposed = accumulations.length > 0
    ? accumulations[0].map((col, i) =>
      accumulations.map(row => row[i])
    )
    : []

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
  scores: PropTypes.arrayOf(
    PropTypes.array
  ).isRequired,
  players: PropTypes.arrayOf(
    PropTypes.string
  )
}

function mapStateToProps(state) {
  return {
    scores: state.scoreBoard,
    players: state.players,
  }
}

export default connect(mapStateToProps)(ScoreBoard)
