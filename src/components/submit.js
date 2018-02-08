import React from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import { Button } from 'react-bootstrap'

import Pig from '../utils/pig'
import * as Actions from '../actions'
import Api from '../utils/api'

const SubmitButton = (props) => {

  const handleClick = () => {
    const theThrow = props.currentThrow
    props.addThrow(theThrow.slice())
    if (props.processedImage && props.processedImage.uuid) {
      Api.verify(props.processedImage.uuid, theThrow[0], theThrow[1])
    }
    if (Pig.throwScore(theThrow) <= 0) {
      props.addTurn(props.currentTurn.concat([theThrow]))
      props.newTurn()
    }
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
    currentTurn: state.currentTurn,
    processedImage: state.processedImage
  }
}

function mapDispatchToProps(dispatch) {
  return bindActionCreators(
    {
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
  removeAlert: PropTypes.func.isRequired,
  addAlert: PropTypes.func.isRequired,
  children: PropTypes.string.isRequired,
  className: PropTypes.string.isRequired,
  addThrow: PropTypes.func,
  setThrow: PropTypes.func,
  addTurn: PropTypes.func,
  updateCurrent: PropTypes.func,
  newTurn: PropTypes.func,
  setProcessedImage: PropTypes.func,
  currentThrow: PropTypes.array,
  currentTurn: PropTypes.array,
  processedImage: PropTypes.shape({
    uuid: PropTypes.string,
    data: PropTypes.string
  })
}

export default connect(mapStateToProps, mapDispatchToProps)(SubmitButton)
