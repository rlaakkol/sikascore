import React from 'react'
import { Button, ButtonGroup, ControlLabel } from 'react-bootstrap'

const PigPicker = props => {
  const handleChange = value => props.handleValueChange(props.id, value)

  const buttons = props.buttons.map(btnprops => (
    <ButtonGroup key={`row${props.id.toString()}btn${btnprops.value.toString()}`}>
      <Button
        className={`button${btnprops.value.toString()}`}
        bsSize="large"
        bsStyle="default"
        active={props.value === btnprops.value}
        onClick={() => handleChange(btnprops.value)}
      >
        {btnprops.label}
      </Button>
    </ButtonGroup>
  ))

  return (
    <div className="row equal">
      <div className="col-lg-4 rowlabel">
        <form onSubmit={event => event.preventDefault()}>
          <ControlLabel>
            {props.label}
          </ControlLabel>
        </form>
      </div>
      <div className="col-lg-8">
        <ButtonGroup justified>
          {buttons}
        </ButtonGroup>
      </div>
    </div>
  )
}

PigPicker.propTypes = {
  label: React.PropTypes.string.isRequired,
  id: React.PropTypes.number.isRequired,
  value: React.PropTypes.string,
  handleValueChange: React.PropTypes.func.isRequired,
  buttons: React.PropTypes.array
}

export default PigPicker
