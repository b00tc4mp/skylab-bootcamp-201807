import React from 'react'
import Webcam from '../utils/react-webcam'
import { withRouter } from 'react-router'
import Navbar from './NavBar.js'

import './styles/Main.css'

class WebcamCapture extends React.Component {
  state = {
    imageSrc: '',
    namecontainer: null,
    onContainer: false,
    onPuntVerd: false
  }

  setRef = (webcam) => {
    this.webcam = webcam;
  }

  capture = () => {
    const imageSrc = this.webcam.getScreenshot()
    this.setState({ imageSrc })
  }


  uploadImage = () => {
    return this.props.upload(this.state.imageSrc)
      .then(namecontainer => {
        this.setState({ imageSrc: '', namecontainer })
        if (namecontainer !== 'punt verd') {
          this.props.history.push('/container', namecontainer)
        } else {
          this.props.history.push('/puntverd')
        }
      })
  }
  
  componentWillMount = () =>{
    console.log('montar')
  }

  componentWillUnmount = ()  =>{
    console.log('desmontar')
  }

  render() {
    const videoConstraints = {
      width: 1280,
      height: 720,
      facingMode: 'user',
    }
    return (
      <div className='main'>
        <h1 className='main__title'> Be Green, RECYCLE! </h1>
        <button className='main__btn' onClick={this.capture}>Capture</button>
        <div className='main__image'>
          {!this.state.imageSrc && <Webcam audio={false} height={350} ref={this.setRef} screenshotFormat="image/jpeg"
            width={350} videoConstraints={videoConstraints} />}
        </div>
        {this.state.imageSrc ? <div className='main__image'> <img alt='' src={this.state.imageSrc} />
          <br></br><button className='main__btn' onClick={this.uploadImage}>Save</button> </div> : null}

        <Navbar />
      </div>
    )
  }
}

export default withRouter(WebcamCapture)