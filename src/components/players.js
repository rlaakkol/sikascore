import React from 'react'
import PropTypes from 'prop-types'
import { Modal, Button } from 'react-bootstrap'

class PlayerModal extends React.Component {

  constructor(props) {
    super(props)

    this.state = {
      text: props.text
    }

    this.handleChange = this.handleChange.bind(this)
    this.handleSubmit = this.handleSubmit.bind(this)
    this.handleCancel = this.handleCancel.bind(this)
  }

  handleChange(event) {
    this.setState({ text: event.target.value })
  }

  handleSubmit(event) {
    event.preventDefault()
    console.log('submit pressed')
    this.props.changePlayers(this.state.text)
  }

  handleCancel() {
    this.setState({ text: this.props.text })
    this.props.toggle()
  }

  render() {
    return (
      <Modal show={this.props.visible}>
        <form onSubmit={this.handleSubmit}>
          <Modal.Header>
            <Modal.Title>Players</Modal.Title>
          </Modal.Header>

          <Modal.Body>
            Separate with newline
            <textarea value={this.state.text} onChange={this.handleChange}/>
          </Modal.Body>

          <Modal.Footer>
            <Button onClick={this.handleCancel}>Cancel</Button>
            <Button type="submit">Submit</Button>
          </Modal.Footer>

        </form>
      </Modal>
    )
  }
}

PlayerModal.propTypes = {
  changePlayers: PropTypes.func,
  visible: PropTypes.bool,
  text: PropTypes.string,
  toggle: PropTypes.func,
}

export default PlayerModal
