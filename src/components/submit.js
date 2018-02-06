import React from 'react'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import { Button } from 'react-bootstrap'

import Pig from '../utils/pig'
import * as Actions from '../actions'

const SubmitButton = props => {
  if (props.currentTurn.length > 0
    && Pig.throwScore(props.currentTurn[props.currentTurn.length - 1]) <= 0) {
    props.addTurn(props.currentTurn.slice())
    props.newTurn()
  }

  const handleClick = () => {
    props.addThrow(props.currentThrow.slice())
    props.setThrow([null, null])
    props.setProcessedImage(null)
  }
  const disabled = props.currentThrow[0] === null || props.currentThrow[1] === null
  return (
    <Button
      className={props.className}
      onClick={handleClick}
      disabled={disabled}
    >
      {props.children}
    </Button>
  )
}

function mapStateToProps(state) {
  return {
    currentThrow: state.currentThrow,
    currentTurn: state.currentTurn
  }
}

function mapDispatchToProps(dispatch) {
  return bindActionCreators(
    {
      addScore: Actions.addScore,
      addAlert: Actions.addAlert,
      removeAlert: Actions.removeAlert,
      addThrow: Actions.updateCurrent,
      setThrow: Actions.setThrow,
      updateCurrent: Actions.updateCurrent,
      newTurn: Actions.newTurn,
      addTurn: Actions.addTurn,
      setProcessedImage: Actions.setProcessedImage
    },
    dispatch
  )
}

SubmitButton.propTypes = {
  nextPage: React.PropTypes.string,
  rows: React.PropTypes.arrayOf(
    React.PropTypes.shape({
      key: React.PropTypes.number,
      id: React.PropTypes.number,
      value: React.PropTypes.number
    })
  ).isRequired,
  history: React.PropTypes.arrayOf(
    React.PropTypes.arrayOf(
      React.PropTypes.shape({
        key: React.PropTypes.number,
        id: React.PropTypes.number,
        value: React.PropTypes.number
      })
    )
  ).isRequired,
  addScore: React.PropTypes.func.isRequired,
  removeAlert: React.PropTypes.func.isRequired,
  addAlert: React.PropTypes.func.isRequired,
  children: React.PropTypes.string.isRequired,
  className: React.PropTypes.string.isRequired,
  addThrow: React.PropTypes.func,
  setThrow: React.PropTypes.func,
  addTurn: React.PropTypes.func,
  updateCurrent: React.PropTypes.func,
  newTurn: React.PropTypes.func,
  setProcessedImage: React.PropTypes.func,
  currentThrow: React.PropTypes.array,
  currentTurn: React.PropTypes.array
}

export default connect(mapStateToProps, mapDispatchToProps)(SubmitButton)
