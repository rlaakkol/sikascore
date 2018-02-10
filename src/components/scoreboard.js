import React from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import { Button } from 'react-bootstrap'

import * as Actions from '../actions'
import Pig from '../utils/pig'
import Api from '../utils/api'

const ScoreBoard = props => {

  const handleSubmit = () => {
    Api.submitScores(props.players, props.scores)
    Api.resetGameId()
    props.clearTurns()
    props.showPlayerModal(true)
  }

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
    <div>
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
      <div>
        {Pig.gameEnded(props.players, props.scores)
            ? <Button onClick={handleSubmit}>
              Submit score
            </Button>
            : ''
        }
      </div>
    </div>
  )
}

ScoreBoard.propTypes = {
  scores: PropTypes.arrayOf(
    PropTypes.array
  ).isRequired,
  players: PropTypes.arrayOf(
    PropTypes.string
  ),
  clearTurns: PropTypes.func,
  showPlayerModal: PropTypes.func
}

function mapStateToProps(state) {
  return {
    scores: state.scoreBoard,
    players: state.players,
  }
}

function mapDispatchToProps(dispatch) {
  return bindActionCreators(
    {
      clearTurns: Actions.clearTurns,
      showPlayerModal: Actions.showPlayerModal,
    },
    dispatch
  )
}

export default connect(mapStateToProps, mapDispatchToProps)(ScoreBoard)
