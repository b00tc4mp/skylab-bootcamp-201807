import React, { Component } from 'react'
import logic from '../logic'
import './styles/Main.css'
import profileIcon from './pics/profile-icon.png'
import settingsIcon from './pics/settings-icon.png'

import * as posenet from '@tensorflow-models/posenet'

const imageScaleFactor = 0.8
const outputStride = 16
const flipHorizontal = false

const MAX_DIM = 300

// import Webcam from './Webcam'
class Main extends Component {
    net = null
    file = null
    state = {
        stopPose: false,
        webcam: false,
        video: false,
        msg: ''
    }

    componentWillMount = () => {
        posenet.load().then(res => {
            this.net = res
            console.log('posenet loaded')
        })
    }

    adjustVideoSize = video => {
        const w = video.videoWidth
        const h = video.videoHeight
        const ar = w / h
        if (w < h) {
            video.height = Math.min(MAX_DIM, h)
            video.width = ar * video.height
        } else {
            video.width = Math.min(MAX_DIM, w)
            video.height = video.width / ar
        }
        const canvas = this.refs.canvas
        canvas.width = video.width
        canvas.height = video.height
    }

    startWebcam = () => {
        if (!this.state.webcam) {
            let video = this.refs.webcam
            navigator.getUserMedia = navigator.getUserMedia || navigator.webkitGetUserMedia || navigator.mozGetUserMedia || navigator.msGetUserMedia
            var facingMode = 'environment'
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
                        this.setState({ webcam: true })
                        this.adjustVideoSize(video)
                    })
                })
        }
    }

    pose = () => {
        const canvas = this.refs.canvas
        const video = this.refs.webcam
        const image = this.refs.image
        canvas.getContext('2d').drawImage(video, 0, 0, canvas.width, canvas.height)
        image.src = canvas.toDataURL()

        setTimeout(() =>
            //image.addEventListener('loadeddata', () =>
            this.net.estimateSinglePose(image, imageScaleFactor, flipHorizontal, outputStride)
                .then(pose => {
                    // console.log(pose)
                    let ctx = canvas.getContext('2d')
                    pose.keypoints.forEach(point => {
                        //ctx.fillRect(point.position.x, point.position.y, 20, 20)
                        if (point.score > 0.2) {
                            ctx.beginPath();
                            ctx.arc(point.position.x, point.position.y, 3, 2 * Math.PI, false)
                            ctx.fillStyle = 'blue';
                            ctx.fill();
                            ctx.lineWidth = 1;
                        }

                    })
                    this.refs.image2.src = canvas.toDataURL()
                    if (!this.state.stopPose)
                        this.pose()
                }), 10)
        //}))


    }

    stopPose = () => {
        this.setState({ stopPose: true })
    }

    uploadVideo = e => {
        const video = this.refs.webcam
        const url = URL.createObjectURL(e.target.files[0])
        video.src = url
        video.onloadedmetadata = event => {
            this.adjustVideoSize(video)
            this.setState({ video: true })
        }
        this.file = e.target.files[0]
    }

    saveVideo = () => 
        logic.saveVideo(this.file)
            .then( () => this.setState({msg: 'saved'}))
            .catch(err => this.setState({msg: err.message}))

    render() {
        const { webcam, msg, video } = this.state
        const { settings, profile, openSettings, openProfile, mainSrc } = this.props
        const { startWebcam, uploadVideo, saveVideo } = this
        return (
            <div className='main'>

                <nav className='main__nav'>
                    {!settings && <img alt='' className='main__nav__settings' src={settingsIcon} onClick={openSettings} />}
                    {!settings && profile && <div></div>}
                    {settings && !profile && <div></div>}
                    {!profile && <img alt='' className='main__nav__profile' src={profileIcon} onClick={openProfile} />}
                </nav>

                {msg && <p>{msg}</p>}

                <div className='main__options'>
                    <button onClick={startWebcam}>Start webcam</button>
                    <p> or </p>
                    {/* <button> upload video</button> */}
                    <input type="file" accept="video/*" onChange={uploadVideo} />
                </div>

                <video src={mainSrc} autoPlay playsInline muted ref='webcam' controls className={'webcam' + ( ((webcam || video) || mainSrc) ? '' : ' hidden')}></video>
                {(webcam || video || mainSrc) && <div>
                    <button onClick={this.pose}>pose</button>
                    <button onClick={this.stopPose}>stop</button>
                    {video && logic.loggedIn() && <button onClick={saveVideo}>save</button>}
                    <div style={{ position: 'relative' }}>
                        <img src='' alt='' ref='image' style={{ display: 'none' }} />
                        <img src='' alt='' ref='image2' />
                    </div>
                    {/* <PosenetCanvas /> */}
                </div>}
                <canvas ref='canvas' style={{ display: 'none' }}></canvas>
            </div>
        )
    }
}

export default Main