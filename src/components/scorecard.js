import React from 'react'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import { Button } from 'react-bootstrap'

import PigPicker from './pigpicker'
import SubmitButton from './submit'
import Capture from './capture'
import Pig from '../utils/pig'
import * as Actions from '../actions'

const Scorecard = props => {
  const handleValueChange = (pigId, value) => {
    const theThrow = props.currentThrow.slice()
    theThrow[pigId] = value
    props.setThrow(theThrow)
  }

  const handleCapture = imageData => 
    props.setProcessedImage(imageData)

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
    { label: 'Leaning Jowler', value: Pig.Position.LEANER }
  ]

  const pickers = [0, 1]
    .map((i) => (
      <PigPicker
        id={i}
        label={`Pig ${i+1}`}
        buttons={buttons}
        value={props.currentThrow[i]}
        handleValueChange={handleValueChange}
      />
    ))

  const current = props.currentThrow[0] != null && props.currentThrow[1] != null
    ? Pig.throwScore(props.currentThrow)
    : 0
  const turnTotal = Pig.turnScore(props.currentTurn)
  return (
    <div>
      <Capture
        processedImage={props.processedImage}
        handleCapture={handleCapture}
        handleRetake={() => handleCapture(null)}
      />
      <div className="container">
        <div className="row">
          <div className="col-lg-12">
            <strong>{props.scoreBoard.length % props.players + 1}</strong>
          </div>
        </div>
        <div className="h-divider" />
        {pickers}
        <div className="h-divider" />
        <div className="row">
          <div className="col-md-6">
            <strong>Kokonaispisteet:</strong> {current} {turnTotal}
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
  players: React.PropTypes.number,
  processedImage: React.PropTypes.string
}

function mapStateToProps(state) {
  return {
    currentThrow: state.currentThrow,
    currentTurn: state.currentTurn,
    players: state.players,
    scoreBoard: state.scoreBoard,
    processedImage: state.processedImage
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
      setProcessedImage: Actions.setProcessedImage
    },
    dispatch
  )
}

export default connect(mapStateToProps, mapDispatchToProps)(Scorecard)
