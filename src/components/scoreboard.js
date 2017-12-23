import React from 'react'
import { connect } from 'react-redux'
import _ from 'lodash'

import Pig from '../utils/pig'

const ScoreBoard = props => {
  const header = _.range(0, props.players).map(i => (
    <th key={i}>
      Player {i + 1}
    </th>
  ))
  const playerturns = []
  for (let i = 0; i < props.players; i++) {
    playerturns.push([])
  }
  for (let i = 0; i < props.scores.length; i++) {
    playerturns[i % props.players].push(props.scores[i])
  }

  const turnScores = playerturns.map(player => player.map(Pig.turnScore))

  const playerTotals = turnScores.map(player => player.reduce((acc, cur) => acc + cur, 0))

  const rows = _.range(0, turnScores[0].length).map(i =>
    turnScores.map((player, j) => <td key={`score${j}${i}`}>{player.length > i ? player[i] : '-'}</td>)
  )
  const rowDivs = rows.map((row, i) => (
        <tr key={i}>{row}</tr>
      ))
  const totals = playerTotals.map((player, i) => (
    <td key={`total${i}`}><em>{player}</em></td>
  ))

  return (
    <div className="table-responsive">
      <table className="table table-sm table-nonfluid">
        <thead>
          <tr><th>Kategoria/Joukkue</th>{header}</tr>
        </thead>
        <tbody>
          {rowDivs}
          <tr>
            <th>Kokonaispisteet</th>{totals}
          </tr>
        </tbody>
      </table>
    </div>
  )
}

ScoreBoard.propTypes = {
  scores: React.PropTypes.arrayOf(
    React.PropTypes.arrayOf(
      React.PropTypes.shape({
        key: React.PropTypes.number,
        id: React.PropTypes.number,
        value: React.PropTypes.number
      })
    )
  ).isRequired,
  current: React.PropTypes.arrayOf(
    React.PropTypes.shape({
      key: React.PropTypes.number,
      id: React.PropTypes.number,
      value: React.PropTypes.number
    })
  ).isRequired,
  labels: React.PropTypes.shape({
    id: React.PropTypes.string,
    name: React.PropTypes.string,
    labels: React.PropTypes.arrayOf(React.PropTypes.string).isRequired
  }),
  players: React.PropTypes.number
}

function mapStateToProps(state) {
  return {
    current: state.current,
    scores: state.scores,
    players: state.players,
    labels: state.labels
  }
}

export default connect(mapStateToProps)(ScoreBoard)
