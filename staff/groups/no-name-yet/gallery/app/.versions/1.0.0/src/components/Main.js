import React, { Component } from 'react'

import logic from '../logic'

import './styles/Main.css'

class Main extends Component {

  state = {
    image: null
  }

  startWebcam() {
    const video = document.getElementById("webcam")
    navigator.getUserMedia = navigator.getUserMedia || navigator.webkitGetUserMedia || navigator.mozGetUserMedia || navigator.msGetUserMedia;
    var facingMode = "environment";
    var constraints = {
      audio: false,
      video: {
        facingMode: facingMode
      }
    }
    navigator.mediaDevices.getUserMedia(constraints)
      .then(function success(stream) {
        video.srcObject = stream
        video.addEventListener('loadeddata', () => {
          const ar = video.videoHeight / video.videoWidth
          video.width = 240
          video.height = 240*ar
        })
      })
  }

  capture = () => {
    const canvas = document.getElementById('canvas')
    let video = document.getElementById("webcam")
    canvas.width = video.videoWidth
    canvas.height = video.videoHeight
    canvas.getContext('2d').drawImage(video, 0, 0, video.videoWidth, video.videoHeight);
    this.setState({ image: canvas.toDataURL('image/png') })
    video.pause()

  }

  upload = event => {
    const file = event.target.files[0]
    this.setState({ image: file })
  }

  saveImage = () => logic.addImage(this.state.image)


  render() {

    return (
      <div>
        <div>
          <button onClick={this.startWebcam}> Take a picture </button>
          <p> or </p>
          <input type="file" id="fileinput" onChange={this.upload} />
        </div>
        <div>
          <video autoPlay playsInline muted id="webcam" width="240" height="240"></video>
          <canvas id="canvas" style={{ display: "none" }}></canvas>
          <button onClick={this.capture}>Capture</button>
          <button onClick={this.saveImage}>Save Image</button>
          <img id="image" src="" alt="" />
        </div>
      </div>
    )
  }
}

export default Main