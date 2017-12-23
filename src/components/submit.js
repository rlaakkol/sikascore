import React from 'react'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import uuid from 'node-uuid'
import { Button } from 'react-bootstrap'
import { browserHistory } from 'react-router'

import * as Actions from '../actions'

const SubmitButton = props => {
  const handleClick = () => {
    props.addThrow(props.currentThrow)
    const id = uuid()
    props.addAlert('Saved', 'alert alert-success', id)
    setTimeout(() => props.removeAlert(id), 2000)
    browserHistory.push(props.nextPage)
  }
  const disabled = props.currentThrow === null
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
    rows: state.current,
    scoreboard: state.scores
  }
}

function mapDispatchToProps(dispatch) {
  return bindActionCreators(
    {
      addScore: Actions.addScore,
      addAlert: Actions.addAlert,
      removeAlert: Actions.removeAlert
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
  addThrow: React.PropTypes.function,
  currentThrow: React.PropTypes.array
}

export default connect(mapStateToProps, mapDispatchToProps)(SubmitButton)
