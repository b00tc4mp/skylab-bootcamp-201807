import React, { Component } from 'react'

import logic from '../logic'

import './styles/Main.css'

import ml5 from 'ml5'

class Main extends Component {

  state = {
    image: null,
    webcamOn: false,
    result: null,
    probability: null,
    style: ml5.styleTransfer('models/wave', ()=>console.log("ready transfer"))
  }

  startWebcam = () => {
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
          video.width = window.innerWidth
          video.height = video.width * ar
        })
      })
    this.setState({ image: null, webcamOn: true })
  }

  capture = () => {
    const canvas = document.getElementById('canvas')
    let video = document.getElementById("webcam")
    canvas.width = video.videoWidth
    canvas.height = video.videoHeight
    canvas.getContext('2d').drawImage(video, 0, 0, video.videoWidth, video.videoHeight);
    video.pause()
    document.getElementById("image").src = canvas.toDataURL('image/png')
    this.setState({ image: canvas.toDataURL('image/png'), webcamOn: false })
  }

  upload = event => {
    const file = event.target.files[0]
    const url = URL.createObjectURL(file)
    document.getElementById("image").src = url
    this.setState({ image: file, webcamOn: false })
  }

  saveImage = () => {
    logic.addImage(this.state.image)
    this.setState({ image: null })
  }

  classify = () => {
    const image = document.getElementById('image');
    const classifier = ml5.imageClassifier('MobileNet', function() {
      console.log('Model Loaded!');
    })
    classifier.predict(image, (err, results) => {
      this.setState({ result: results[0].className, probability: results[0].probability.toFixed(4)})
    })
  }

  transfer = () => {
    const image = document.getElementById('image');
    this.state.style.transfer(image, function(err, result) {
      image.src = result.src
    });
  }

  render() {
    const { webcamOn, image, result, probability } = this.state
    return (
      <div className="main">
        <canvas id="canvas" style={{ display: "none" }}></canvas>
        <div className="main__upload">
          <button onClick={this.startWebcam}> <i className="fas fa-camera-retro fa-3x"></i> </button>
          <label for="fileinput" class="custom-file-upload fa-3x">
            <i class="far fa-folder-open"></i>
          </label>
          <input id="fileinput" type="file" onChange={this.upload}/>
        </div>
        <video className={webcamOn ? "webcam" : "webcam--hidden"} autoPlay playsInline muted id="webcam"></video>
        <img className={image ? "image" : "image--hidden"} id="image" src="" alt="" />
        {webcamOn && <button onClick={this.capture} className="capture"> </button>}
        {image && <button onClick={this.saveImage} className="save">Save Image</button>}
        {image && <button onClick={this.classify}>Classify</button>}
        {/* {image && <button onClick={this.transfer}>Transfer</button>} */}
        {result && <p>{result}, {probability}</p>}
      </div>
    )
  }
}

export default Main