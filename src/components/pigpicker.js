import React from 'react'
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
  label: React.PropTypes.string.isRequired,
  labelColor: React.PropTypes.string.isRequired,
  id: React.PropTypes.number.isRequired,
  value: React.PropTypes.string,
  handleValueChange: React.PropTypes.func.isRequired,
  buttons: React.PropTypes.array
}

export default PigPicker
