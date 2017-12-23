import React from 'react'
import { Modal, Button } from 'react-bootstrap'

const ConfirmModal = props => (
  <Modal show={props.stateVar}>
    <Modal.Header>
      <Modal.Title>Confirm</Modal.Title>
    </Modal.Header>

    <Modal.Body>
      {props.text}
    </Modal.Body>

    <Modal.Footer>
      <Button onClick={props.toggle}>Close</Button>
      <Button
        bsStyle="primary"
        onClick={() => {
          props.onConfirm()
          props.toggle()
        }}
      >
        Confirm
      </Button>
    </Modal.Footer>

  </Modal>
)

export default ConfirmModal
