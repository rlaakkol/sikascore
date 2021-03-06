import React from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import { Button } from 'react-bootstrap'
import { browserHistory } from 'react-router'

import PigPicker from './pigpicker'
import SubmitButton from './submit'
import Capture from './capture'
import Pig from '../utils/pig'
import * as Actions from '../actions'
import Api from '../utils/api'

const Scorecard = props => {
  const handleValueChange = (pigId, value) => {
    const theThrow = props.currentThrow.slice()
    theThrow[pigId] = value
    props.setThrow(theThrow)
  }

  const handleCapture = (imageData) => {
    props.setProcessing(true)
    props.setProcessedImage(null, imageData)
    Api.detect(imageData)
      .then((result) => {
        props.setProcessedImage(result.uuid, result.image)
        props.setThrow(result.throw)
        props.setProcessing(false)
      })
      .catch(() => {
        setTimeout(() =>
          props.setProcessing(false)
          , 1000)
      })
  }

  const checkEndTurn = () => {
    if (Pig.isLastTurn(props.players, props.scoreBoard, props.currentTurn))
      browserHistory.push('/scoreboard')
  }


  const handleEndTurn = () => {
    props.addTurn(props.currentTurn.slice())
    props.newTurn()
    props.setThrow([null, null])
    checkEndTurn()
  }

  const buttons = [
    { label: 'Plain side', value: Pig.Position.PLAINSIDE },
    { label: 'Dot side', value: Pig.Position.DOTSIDE },
    { label: 'Trotter', value: Pig.Position.TROTTER },
    { label: 'Razorback', value: Pig.Position.RAZORBACK },
    { label: 'Snouter', value: Pig.Position.SNOUTER },
    { label: 'Leaning Jowler', value: Pig.Position.LEANER },
    { label: 'Makin Bacon', value: Pig.Position.BACON }
  ]

  const labelcolors = ['blue', 'red']
  const pickers = [0, 1]
    .map((i) => (
      <div key={`pickerdiv-${i}`}>
        <PigPicker
          id={i}
          label={`Pig ${i+1}`}
          labelColor={labelcolors[i]}
          buttons={buttons}
          value={props.currentThrow[i]}
          handleValueChange={handleValueChange}
        />
        <div className="h-divider" />
      </div>
    ))

  const current = props.currentThrow[0] != null && props.currentThrow[1] != null
    ? Pig.throwScore(props.currentThrow)
    : 0
  const turnTotal = Pig.turnScore(props.currentTurn)
  const playerIdx = props.scoreBoard.length % props.players.length
  const playerScores = Pig.scoreAccumulations(props.players, props.scoreBoard)[playerIdx]
  const gameTotal = playerScores ? playerScores.pop() : 0

  const image = props.processedImage !== null ? props.processedImage.data : null

  return (
    <div>
      <div className="container-fluid">
            <Capture
              processedImage={image}
              handleCapture={handleCapture}
              handleRetake={() => props.setProcessedImage(null)}
              isProcessing={props.processingImage}
            />
        <div className="row">
          <div className="col-md-12">
            <strong>Player {playerIdx + 1}:</strong> {props.players[playerIdx]}
          </div>
        </div>
        <div className="h-divider" />
        {pickers}
        <div className="h-divider" />
        <div className="row">
          <div className="col-md-6">
            <strong>This throw:</strong> {current}
          </div>
          <div className="col-md-6">
            <strong>This turn:</strong> {turnTotal}
          </div>
          <div className="col-md-6">
            <strong>This game:</strong> {gameTotal}
          </div>
        </div>
      </div>
      <div className="container">
        <div className="row">
          <div className="col-md-2 col-md-offset-2">
            <SubmitButton
              className="btn btn-block btn-success"
              checkEndTurn={checkEndTurn}
            >
              Submit
            </SubmitButton>
          </div>
          <div className="col-md-2 col-md-offset-2">
            <Button className="btn btn-block btn-warning" onClick={handleEndTurn} style={{ marginTop: '20px'}}>
              End turn
            </Button>
          </div>
        </div>
      </div>
    </div>
  )
}

Scorecard.propTypes = {
  currentThrow: PropTypes.array,
  currentTurn: PropTypes.array,
  scoreBoard: PropTypes.array,
  players: PropTypes.array,
  processedImage: PropTypes.shape({
    uuid: PropTypes.string,
    data: PropTypes.string
  }),
  setProcessedImage: PropTypes.func,
  processingImage: PropTypes.bool
}

function mapStateToProps(state) {
  return {
    currentThrow: state.currentThrow,
    currentTurn: state.currentTurn,
    players: state.players,
    scoreBoard: state.scoreBoard,
    processedImage: state.processedImage,
    processingImage: state.processingImage
  }
}

function mapDispatchToProps(dispatch) {
  return bindActionCreators(
    {
      setThrow: Actions.setThrow,
      undoThrow: Actions.undoThrow,
      updateCurrent: Actions.updateCurrent,
      newTurn: Actions.newTurn,
      addTurn: Actions.addTurn,
      setProcessedImage: Actions.setProcessedImage,
      setProcessing: Actions.setProcessing
    },
    dispatch
  )
}

export default connect(mapStateToProps, mapDispatchToProps)(Scorecard)
