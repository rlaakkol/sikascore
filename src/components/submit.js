import React from 'react'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import uuid from 'node-uuid'
import { Button } from 'react-bootstrap'

import Pig from '../utils/pig'
import * as Actions from '../actions'

const SubmitButton = props => {
  const handleClick = () => {
    props.addThrow(props.currentThrow.slice())
    const id = uuid()
    props.addAlert('Saved', 'alert alert-success', id)
    setTimeout(() => props.removeAlert(id), 2000)
    if (Pig.throwScore(props.currentThrow) === 0) {
      props.addTurn(props.currentTurn.slice())
      props.updateCurrent([])
    }
    props.setThrow([null, null])
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
      addTurn: Actions.addTurn
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
  currentThrow: React.PropTypes.array,
  currentTurn: React.PropTypes.array
}

export default connect(mapStateToProps, mapDispatchToProps)(SubmitButton)
