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

    const buttonStyle = {
      width: '100%',
      height: 'auto',
      margin: 'auto'
    }

    const objectStyle = {
      objectFit: 'contain',
      margin: 'auto'
    }

    const button = this.props.processedImage && !this.props.isProcessing ?
      <Button
        onClick={this.props.handleRetake}
        className="btn-danger"
        style={buttonStyle}
      >
        Again?
      </Button> :
      <Button
        onClick={this.capture}
        className="btn-success"
        style={buttonStyle}
        disabled={this.props.isProcessing}
      >
        Capture {this.props.isProcessing ? <i className="fa fa-spinner fa-spin" /> : ''}
      </Button>

    return (
        <div className="row">
          <div className="col-md-6">
            {!this.props.processedImage ?
            <Webcam
              audio={false}
              ref={node => (this.webcam = node)}
              screenshotFormat="image/jpeg"
              width='400'
              height='400'
              style={objectStyle}
            /> :
            <img src={this.props.processedImage} alt="processed" width='400' height='400' style={objectStyle}/>}
          </div>
          <div className="col-sm-2 col-sm-offset-2">
            {button}
          </div>
      </div>)
  }
}

Capture.propTypes = {
  handleCapture: PropTypes.func,
  handleRetake: PropTypes.func,
  processedImage: PropTypes.string,
  isProcessing: PropTypes.bool
}

export default Capture
