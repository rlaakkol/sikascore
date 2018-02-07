import React from 'react'
import PropTypes from 'prop-types'
import { Button, ControlLabel } from 'react-bootstrap'

const PigPicker = props => {
  const handleChange = value => props.handleValueChange(props.id, value)

  const buttons = props.buttons.map(btnprops => (
      <Button
        className={`button${btnprops.value.toString()}`}
        bsSize="large"
        bsStyle="default"
        active={props.value === btnprops.value}
        onClick={() => handleChange(btnprops.value)}
        key={`button${btnprops.value.toString()}`}
      >
        {btnprops.label}
      </Button>
  ))

  const flexButtons = {
    display: 'flex',
    flexWrap: 'wrap'
  }

  const labelStyle = {
    borderStyle: 'solid',
    borderColor: props.labelColor
  }

  return (
    <div className="row">
      <div className="col-xs-2 rowlabel">
        <form onSubmit={event => event.preventDefault()}>
          <ControlLabel style={labelStyle}>
            {props.label}
          </ControlLabel>
        </form>
      </div>
      <div className="col-xs-10" style={flexButtons}>
        {buttons}
      </div>
    </div>
  )
}

PigPicker.propTypes = {
  label: PropTypes.string.isRequired,
  labelColor: PropTypes.string.isRequired,
  id: PropTypes.number.isRequired,
  value: PropTypes.string,
  handleValueChange: PropTypes.func.isRequired,
  buttons: PropTypes.array
}

export default PigPicker
