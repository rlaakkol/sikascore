import React from 'react'
import Webcam from 'react-webcam'
import { Button } from 'react-bootstrap'

class Capture extends React.Component {

  constructor(props) {
    super(props)

    this.state = {
      imageData: null
    }

    this.capture = this.capture.bind(this)
    this.enable = this.enable.bind(this)
  }

  capture() {
    const imageData = this.webcam.getScreenshot()
    this.setState({ imageData })
  }

  enable() {
    this.setState({ imageData: null })
  }

  render() {

    console.log(this.state.imageData)

    return (
      <div>
        <div>
          <div>
            <Webcam
              audio={false}
              ref={node => (this.webcam = node)}
            />
          </div>
          <div>
            {this.state.imageData ? <img src={this.state.imageData} alt="foo"/> : ''}
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
              onClick={this.enable}
            >
              Retake
            </Button>
          </div>
        </div>
      </div>)
  }
}

export default Capture
