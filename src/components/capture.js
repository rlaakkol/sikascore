import React from 'react'
import PropTypes from 'prop-types'
import Webcam from 'react-webcam'
import { Button } from 'react-bootstrap'

class Capture extends React.Component {

  constructor(props) {
    super(props)

    this.capture = this.capture.bind(this)
  }

  capture() {
    const imageData = this.webcam.getScreenshot()
    this.props.handleCapture(imageData)
  }

  render() {

    return (
      <div>
        <div>
          <div>
            {!this.props.processedImage ?
            <Webcam
              audio={false}
              ref={node => (this.webcam = node)}
            /> :
            <img src={this.props.processedImage} alt="processed"/>}
          </div>
        </div>
        <div>
          <div>
            <Button
              onClick={this.capture}
            >
              Capture
            </Button>
            <Button
              onClick={this.props.handleRetake}
            >
              Retake
            </Button>
          </div>
        </div>
      </div>)
  }
}

Capture.propTypes = {
  handleCapture: PropTypes.func,
  handleRetake: PropTypes.func,
  processedImage: PropTypes.string
}

export default Capture
