import React from 'react'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import { Button } from 'react-bootstrap'

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
    props.setProcessedImage(imageData)
    Api.detect(imageData)
      .then((result) => {
        props.setProcessedImage(result.image)
        props.setThrow(result.throw)
        props.setProcessing(false)
      })
      .catch(() => {
        setTimeout(() =>
          props.setProcessing(false)
          , 1000)
      })
  }

  const handleEndTurn = () => {
    props.addTurn(props.currentTurn.slice())
    props.newTurn()
    props.setThrow([null, null])
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
      <div>
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

  return (
    <div>
      <div className="container-fluid">
            <Capture
              processedImage={props.processedImage}
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
        </div>
      </div>
      <div className="container">
        <div className="row">
          <div className="col-md-2 col-md-offset-2">
            <SubmitButton className="btn btn-block btn-success">
              Submit
            </SubmitButton>
          </div>
          <div className="col-md-2 col-md-offset-2">
            <Button className="btn btn-block btn-warning" onClick={handleEndTurn}>
              End turn
            </Button>
          </div>
        </div>
      </div>
    </div>
  )
}

Scorecard.propTypes = {
  currentThrow: React.PropTypes.array,
  currentTurn: React.PropTypes.array,
  scoreBoard: React.PropTypes.array,
  players: React.PropTypes.array,
  processedImage: React.PropTypes.string,
  setProcessedImage: React.PropTypes.func,
  processingImage: React.PropTypes.bool
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
