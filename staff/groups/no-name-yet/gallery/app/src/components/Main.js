import React, { Component } from 'react'

import logic from '../logic'

import './styles/Main.css'

import udnie from '../pics/udnie.jpg'
import wave from '../pics/wave.jpg'
import rain_princess from '../pics/rain_princess.jpg'
import la_muse from '../pics/la_muse.jpg'
import modernist from '../pics/modernist.jpeg'
import menu from '../pics/menu.jpg'

class Main extends Component {

  state = {
    webcamOn: false,
    url: null,
    width: null,
    height: null,
    noTransfer: true,
    imageState: 'Save Image',
    allowSave: true
  }

  startWebcam = () => {
    if (!this.state.webcamOn) {
      this.setState({ url: null, imageState: "Save Image" })
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
    canvas.toBlob(blob => {
      this.image = new File([blob], 'webcam.png', { type: 'image/png', lastModified: Date.now() });
    })
    this.setState({
      url: canvas.toDataURL('image/png'),
      width: video.width,
      height: video.height,
      webcamOn: false,
      noTransfer: true
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
        webcamOn: false,
        noTransfer: true,
        imageState: "Save Image"
      })
    }
  }

  saveImage = () => {
    if (this.state.url && this.state.allowSave) {
      this.setState({ imageState: ' Saving...' })
      logic.addImage(this.image)
        .then(() => {
          this.setState({ imageState: 'Save Image' })
        })
        .catch( () => this.setState({imageState: 'Cloudinary not available', noTransfer: false}))
    }
  }

  transfer = style => {
    this.setState({ allowSave: false, noTransfer: false, imageState: 'Transfering...' })
    logic.transfer(this.image, style)
      .then(blob => {
        this.image = blob
        const url = URL.createObjectURL(blob)
        this.setState({ allowSave: true, url, imageState: 'Save Image' })
      })
      .catch(err => {
        this.setState({ imageState: 'Cloudmersive not available', noTransfer: false })
        console.error(err)
      })
  }

  render() {
    const { webcamOn, url, width, height, noTransfer, imageState } = this.state
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
        {!url && !webcamOn && this.renderWelcome()}
        <video className={webcamOn ? "webcam" : "webcam--hidden"} autoPlay playsInline muted id="webcam"></video>
        {url && <img className="image" id="image" src={url} alt="" width={width} height={height} />}
        {webcamOn && <button onClick={this.capture} className="capture"> </button>}
        {url && <button onClick={this.saveImage} className="save">{imageState}</button>}
        {url && noTransfer && this.renderStyleButtons()}
      </div>
    )
  }

  renderStyleButtons = () => {
    return (
      <div>
        <p> Choose an style: </p>
        <div className="style__images">
          <img alt="" className="style__image udnie" onClick={() => this.transfer('udnie')} src={udnie}></img>
          <img alt="" className="style__image wave" onClick={() => this.transfer('wave')} src={wave}></img>
          <img alt="" className="style__image rain_princess" onClick={() => this.transfer('rain_princess')} src={rain_princess}></img>
          <img alt="" className="style__image la_muse" onClick={() => this.transfer('la_muse')} src={la_muse}></img>
          <img alt="" className="style__image modernist" onClick={() => this.transfer('modernist')} src={modernist}></img>
        </div>
      </div>
    )
  }

  renderWelcome = () => {
    return (
      <div className="menu__container">
        <img alt="" className="menu" src={menu} />
      </div>
    )
  }

}

export default Main