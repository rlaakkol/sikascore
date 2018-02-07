import React from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import { Button } from 'react-bootstrap'

import Pig from '../utils/pig'
import * as Actions from '../actions'
import Api from '../utils/api'

class SubmitButton extends React.Component {

  constructor(props) {
    super(props)

    this.handleClick = this.handleClick.bind(this)
  }

  componentWillMount() {
    if (this.props.currentTurn.length > 0
      && Pig.throwScore(this.props.currentTurn[this.props.currentTurn.length - 1]) <= 0) {
      this.props.addTurn(this.props.currentTurn.slice())
      this.props.newTurn()
    }
  }

  handleClick() {
    const theThrow = this.props.currentThrow
    this.props.addThrow(theThrow.slice())
    if (this.processedImage && this.processedImage.uuid) {
      Api.verify(this.props.processedImage.uuid, theThrow[0], theThrow[1])
    }
    this.props.setThrow([null, null])
    this.props.setProcessedImage(null)
  }

  render() {
    const disabled = this.props.currentThrow[0] === null || this.props.currentThrow[1] === null
    return (
      <Button
        className={this.props.className}
        onClick={this.handleClick}
        disabled={disabled}
      >
        {this.props.children}
      </Button>
    )
  }
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
