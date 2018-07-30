import React, { Component } from 'react'

import logic from '../logic'

import './styles/Main.css'

class Main extends Component {

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
    navigator.mediaDevices.getUserMedia(constraints).then(function success(stream) {
      video.srcObject = stream
    });
  }

  capture() {
    const canvas = document.getElementById('canvas')
    const video = document.getElementById("webcam")
    const img = document.getElementById('image')
    canvas.width = video.width
    canvas.height = video.height
    canvas.getContext('2d').drawImage(video, 0, 0);
    img.src = canvas.toDataURL('image/webp');
    logic.addImage(img)
  }

  upload = event => {
    const file = event.target.files[0]
    logic.addImage(file)
  }

  render() {

    return (
      <div>
        <div>
          <button onClick={this.startWebcam}> Take a picture </button>
          <p> or </p>
          <input type="file" id="fileinput" onChange={this.upload} />
        </div>
        <div>
          <video autoPlay playsInline muted id="webcam" width="224" height="224"></video>
          <canvas id="canvas" style={{ display: "none" }}></canvas>
          <button onClick={this.capture}>Capture</button>
          <img id="image" src="" />
        </div>
      </div>
    )
  }
}

export default Main