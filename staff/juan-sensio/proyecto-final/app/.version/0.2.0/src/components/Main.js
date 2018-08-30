import React, { Component } from 'react'
import logic from '../logic'
import './styles/Main.css'
import profileIcon from './pics/profile-icon.png'
import settingsIcon from './pics/settings-icon.png'

import * as posenet from '@tensorflow-models/posenet'

const imageScaleFactor = 0.8
const outputStride = 16
const flipHorizontal = false

const MAX_DIM = 500
const FPS = 23
const REF_RATE = 1000 / FPS

// import Webcam from './Webcam'
class Main extends Component {
    net = null
    file = null
    poses = []
    poses2 = []
    frames = []
    state = {
        stopPose: false,
        video: false,
        msg: ''
    }

    componentWillMount = () => {
        posenet.load().then(res => {
            this.net = res
            console.log('posenet loaded')
        })
    }

    componentWillReceiveProps = nextProps => {
        if (this.props.mainSrc !== nextProps.mainSrc) {
            const video = this.refs.video
            fetch(nextProps.mainSrc)
                .then(res => res.body)
                .then(stream => new Response(stream))
                .then(response => response.blob())
                .then(blob => {
                    let url = URL.createObjectURL(blob)
                    video.src = url
                    video.addEventListener('loadeddata', () => {
                        this.adjustVideoSize(video)
                        this.setState({ video: true })
                    })
                })
        }
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

    takeFrames = () => {
        const canvas = this.refs.canvas
        let ctx = canvas.getContext('2d');
        const video = this.refs.video
        let frames = this.frames = []
        console.log('taking frames at ' + FPS + ' fps')
        video.addEventListener('play', () => {
            (function loop() {
                if (!video.paused && !video.ended) {
                    ctx.drawImage(video, 0, 0, canvas.width, canvas.height);
                    frames.push(canvas.toDataURL())
                    //image.src = canvas.toDataURL()
                    setTimeout(loop, REF_RATE);
                }
            })();
        }, 0);

        video.play()

        video.addEventListener('ended', () => console.log('done'))
    }

    play = () => {
        const frames = this.frames
        const image = this.refs.image2
        let cnt = 0
        const id = setInterval(() => {
            image.src = frames[cnt]
            cnt++
            if (cnt >= frames.length)
                clearInterval(id)
        }, REF_RATE)
    }

    playPose = () => {
        const frames = this.poses
        const image = this.refs.image2
        let cnt = 0
        const id = setInterval(() => {
            image.src = frames[cnt]
            cnt++
            if (cnt >= frames.length)
                clearInterval(id)
        }, REF_RATE)
    }

    playOnlyPose = () => {
        const frames = this.poses2
        const image = this.refs.image2
        let cnt = 0
        const id = setInterval(() => {
            image.src = frames[cnt]
            cnt++
            if (cnt >= frames.length)
                clearInterval(id)
        }, REF_RATE)
    }

    pose = (cnt, frames, net, poses, poses2, refs) => {

        (function loop() {
            if (cnt < frames.length) {
                const image = refs.image
                const canvas = refs.canvas
                let ctx = canvas.getContext('2d')
                image.src = frames[cnt]
                setTimeout(() => {
                    net.estimateSinglePose(image, imageScaleFactor, flipHorizontal, outputStride)
                        .then(pose => {
                            ctx.drawImage(image, 0, 0, canvas.width, canvas.height)
                            pose.keypoints.forEach(point => {
                                if (point.score > 0.2) {
                                    ctx.beginPath();
                                    ctx.arc(point.position.x, point.position.y, 3, 2 * Math.PI, false)
                                    ctx.fillStyle = 'blue';
                                    ctx.fill();
                                    ctx.lineWidth = 1;
                                }
                            })
                            poses.push(canvas.toDataURL())

                            ctx.fillStyle = 'white'
                            ctx.fillRect(0, 0, canvas.width, canvas.height)
                            pose.keypoints.forEach(point => {
                                if (point.score > 0.2) {
                                    ctx.beginPath();
                                    ctx.arc(point.position.x, point.position.y, 3, 2 * Math.PI, false)
                                    ctx.fillStyle = 'black';
                                    ctx.fill();
                                    ctx.lineWidth = 1;
                                }
                            })
                            poses2.push(canvas.toDataURL())

                            cnt++
                            console.log(`${cnt}/${frames.length}`)
                            if (cnt >= frames.length)
                                console.log('done')
                            loop()
                        })
                }, 10)
            }
        })();

    }

    uploadVideo = e => {
        const video = this.refs.video
        const url = URL.createObjectURL(e.target.files[0])
        video.src = url
        video.onloadedmetadata = event => {
            this.adjustVideoSize(video)
            this.setState({ video: true, msg: '' })
        }
        this.file = e.target.files[0]
    }

    saveVideo = () => {
        logic.saveVideo(this.file)
            .then(() => this.setState({ msg: 'saved' }))
            .catch(err => this.setState({ msg: err.message }))
    }

    render() {
        const { msg, video } = this.state
        const { settings, profile, openSettings, openProfile, mainSrc } = this.props
        const { uploadVideo, saveVideo, play, pose, takeFrames, playPose, playOnlyPose } = this
        return (
            <div className='main'>

                <nav className='main__nav'>
                    {!settings && <img alt='' className='main__nav__settings' src={settingsIcon} onClick={openSettings} />}
                    {!settings && profile && <div></div>}
                    {settings && !profile && <div></div>}
                    {!profile && <img alt='' className='main__nav__profile' src={profileIcon} onClick={openProfile} />}
                </nav>

                {msg && <p>{msg}</p>}

                <input type="file" accept="video/*" onChange={uploadVideo} />

                <video src='' playsInline muted ref='video' className={'webcam' + ((video || mainSrc) ? '' : ' hidden')}></video>
                {(video || mainSrc) && <div>
                    <button onClick={takeFrames}>take frames</button>
                    <button onClick={() => { console.log('taking pose'); this.poses=[]; this.poses2=[]; pose(0, this.frames, this.net, this.poses, this.poses2, this.refs) }}>capture pose</button>
                    <button onClick={play}>play</button>
                    <button onClick={playPose}>play pose</button>
                    <button onClick={playOnlyPose}>play only pose</button>
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