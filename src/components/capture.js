import React from 'react'
import PropTypes from 'prop-types'
import { Button } from 'react-bootstrap'

import Webcam from '../modules/react-webcam'

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

    const button = this.props.processedImage ?
      <Button
        onClick={this.props.handleRetake}
      >
        Again?
      </Button> :
      <Button
        onClick={this.capture}
      >
        Capture
      </Button>

    return (
      <div className="container">
        <div className="row">
          <div className="col-lg-12">
            {!this.props.processedImage ?
            <Webcam
              audio={false}
              ref={node => (this.webcam = node)}
              screenshotFormat="image/jpeg"
            /> :
            <img src={this.props.processedImage} alt="processed"/>}
          </div>
        </div>
        <div className="row">
          <div className="col-lg-2 col-offset-lf-5">
            {button}
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
