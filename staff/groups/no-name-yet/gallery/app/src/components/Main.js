import React, { Component } from 'react'

import logic from '../logic'

import './styles/Main.css'

class Main extends Component {

  state = {
    webcamOn: false,
    url: null,
    width: null,
    height: null,
    noTransfer: true
  }

  // componentDidMount = () => this.startWebcam()

  startWebcam = () => {
    if (!this.state.webcamOn) {
      this.setState({url: null})
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
        .then(stream => {
          video.srcObject = stream
          video.addEventListener('loadeddata', () => {
            const w = video.videoWidth
            const h = video.videoHeight
            const ar = w / h
            const newWidth = Math.min(window.innerWidth, 500)
            video.width = newWidth
            if (w >= h)
              video.height = newWidth / ar
            else
              video.height = newWidth * ar
            this.setState({ webcamOn: true })
          })
        })
    }
  }

  capture = () => {
    const canvas = document.getElementById('canvas')
    let video = document.getElementById("webcam")
    canvas.width = video.videoWidth
    canvas.height = video.videoHeight
    canvas.getContext('2d').drawImage(video, 0, 0, video.videoWidth, video.videoHeight);
    video.pause()
    canvas.toBlob( blob => {
      this.image = blob
    }, 'image/png')
    this.setState({
      url: canvas.toDataURL('image/png'),
      width: video.width,
      height: video.height,
      webcamOn: false
    })
  }

  upload = event => {
    const file = event.target.files[0]
    if (file) {
      const url = URL.createObjectURL(file)
      this.image = file
      this.setState({
        url,
        width: Math.min(window.innerWidth, 500),
        webcamOn: false
      })
    }
  }

  saveImage = () => {
    if (this.image) {
      logic.addImage(this.image)
        .then(() => {
          this.image = null
          this.setState({ url: null })
        })
    }
  }

  transfer = () => {
    this.setState({ noTransfer: false })
    let formData = new FormData()
    formData.append('file', this.image)
    const myUrl = 'https://api.cloudmersive.com/image/artistic/painting/modernist'
    const config = {
      method: 'post',
      headers: {
        'Apikey': 'e7ea85bd-7635-499e-824e-1a13d942cace'
      },
      body: formData
    }
    fetch(`https://skylabcoders.herokuapp.com/proxy?url=${myUrl}`, config)
      .then(res => res.body)
      .then(body => {
        const reader = body.getReader()
        return new ReadableStream({
          start(controller) {
            return pump();
            function pump() {
              return reader.read().then(({ done, value }) => {
                // When no more data needs to be consumed, close the stream
                if (done) {
                  controller.close();
                  return;
                }
                // Enqueue the next data chunk into our target stream
                controller.enqueue(value);
                return pump();
              });
            }
          }
        })
      })
      .then(stream => new Response(stream))
      .then(response => response.blob())
      .then(blob => {
        this.image = blob
        const url = URL.createObjectURL(blob)
        this.setState({ url, noTransfer: true })
      })
      .catch(err =>  console.error(err))
  }

  render() {
    const { webcamOn, url, width, height, noTransfer } = this.state
    return (
      <div className="main">
        <canvas id="canvas" style={{ display: "none" }}></canvas>
        <div className="main__upload">
          <button onClick={this.startWebcam}> <i className="fas fa-camera-retro fa-3x"></i> </button>
          <label htmlFor="fileinput" className="custom-file-upload fa-3x">
            <i className="far fa-folder-open"></i>
          </label>
          <input id="fileinput" type="file" onChange={this.upload} />
        </div>
        <video className={webcamOn ? "webcam" : "webcam--hidden"} autoPlay playsInline muted id="webcam"></video>
        {url && <img className="image" id="image" src={url} alt="" width={width} height={height} />}
        {webcamOn && <button onClick={this.capture} className="capture"> </button>}
        {url && <button onClick={this.saveImage} className="save">Save Image</button>}
        {url && noTransfer && <button onClick={this.transfer}>Transfer</button>}
      </div>
    )
  }
}

export default Main