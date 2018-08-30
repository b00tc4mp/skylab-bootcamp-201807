import React, { Component } from 'react';

import './styles/Workspace.css'

import * as posenet from '@tensorflow-models/posenet'

class Workspace extends Component {

    state = {
        msg: '',
        save: false,
        video: false,
        showVideo: true,
        frame: false,
        pose: false
    }
    net = null
    file = null
    frames = []
    poses = []
    poses2 = []
    intervalId = null
    cnt = 0

    componentWillMount = () => {
        posenet.load().then(res => {
            this.net = res
            console.log('posenet loaded')
        })
    }

    componentDidMount = () => {
        if (this.props.videoSrc)
            this.loadVideo(this.props.videoSrc)
    }

    componentWillReceiveProps = nextProps => {
        if (this.props.videoSrc !== nextProps.videoSrc) {
            this.loadVideo(nextProps.videoSrc)
        }
    }

    loadVideo = videoSrc => {
        const video = this.refs.video
        if (videoSrc) {
            fetch(videoSrc)
                .then(res => res.body)
                .then(stream => new Response(stream))
                .then(response => response.blob())
                .then(blob => {
                    let url = URL.createObjectURL(blob)
                    video.src = url
                    video.addEventListener('loadeddata', () => {
                        this.adjustVideoSize(video)
                        this.setState({ save: false, video: true })
                    })
                })
        } else {
            video.src = ''
            this.setState({ frame: false, pose: false, video: false })
        }
    }

    adjustVideoSize = video => {
        const w = video.videoWidth
        const h = video.videoHeight
        const ar = w / h
        const MAX_DIM = this.props.settings.MAX_DIM
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

    uploadVideo = e => {
        this.file = e.target.files[0]
        const video = this.refs.video
        const url = URL.createObjectURL(e.target.files[0])
        video.src = url
        //video.onloadedmetadata = event => {
        let cb = () => {
            this.adjustVideoSize(video)
            this.setState({ save: true, video: true, pose: false, frame: false })
        }
        video.addEventListener('loadeddata', cb)
    }

    toggleVideo = () => {
        this.setState({ msg: '' })
        const video = this.refs.video
        if (video.paused || video.ended)
            video.play()
        else
            video.pause()
    }

    saveVideo = () => {
        this.setState({ msg: 'saving ... (this could take a while)' })
        this.props.saveVideo(this.file)
            .then(() => this.setState({ msg: 'video saved !', save: false }))
            .catch(err => this.setState({ msg: err.message }))
    }

    takeFrames = () => {
        const canvas = this.refs.canvas
        let ctx = canvas.getContext('2d');
        const video = this.refs.video
        let frames = this.frames = []
        this.poses = this.poses2 = []
        const REF_RATE = this.props.settings.REF_RATE
        const FPS = this.props.settings.FPS
        this.setState({ msg: 'taking frames at ' + FPS + ' fps', video: false, frame: false, pose: false })
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
        video.currentTime = 0
        video.play()
        video.addEventListener('ended', () => {
            this.setState({ msg: 'done', video: true, frame: true })
            video.removeEventListener('ended', () => { })
        })
    }

    playFrames = frames => {
        this.setState({ showVideo: false, msg: '' })
        const image = this.refs.image
        const REF_RATE = this.props.settings.REF_RATE
        clearInterval(this.intervalId)
        this.intervalId = setInterval(() => {
            image.src = frames[this.cnt]
            this.cnt++
            if (this.cnt >= frames.length)
                this.cnt = 0
        }, REF_RATE)
    }

    stopFrames = () => {
        clearInterval(this.intervalId)
        this.setState({ showVideo: true })
    }

    takePoses = () => {
        this.setState({ msg: 'taking poses ... (this may take a while) ', video: false, frame: false, pose: false })
        this.poses = []
        this.poses2 = []
        let cb1 = msg => this.setState({ msg })
        let cb2 = msg => this.setState({ msg, pose: true, frame: true, video: true })
        const ISF = this.props.settings.ISF
        const FH = this.props.settings.FH
        const OS = this.props.settings.OS
        this.pose(0, this.frames, this.net, this.poses, this.poses2, this.refs, cb1, cb2, ISF, FH, OS)
    }

    pose = (cnt, frames, net, poses, poses2, refs, cb1, cb2, ISF, FH, OS) => {
        (function loop() {
            if (cnt < frames.length) {
                const image = refs.image2
                const canvas = refs.canvas
                let ctx = canvas.getContext('2d')
                image.src = frames[cnt]
                setTimeout(() => {
                    net.estimateSinglePose(image, ISF, FH, OS)
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
                            cb1(`taking pose: ${cnt}/${frames.length}`)
                            if (cnt >= frames.length)
                                cb2('done !')
                            loop()
                        })
                }, 10)
            }
        })();

    }

    render() {
        const { msg, save, video, showVideo, frame, pose } = this.state
        const { loggedIn } = this.props
        const { uploadVideo, toggleVideo, saveVideo, takeFrames, takePoses, playFrames, stopFrames } = this
        return (
            <div className='workspace'>
                <nav className='workspace__nav'>
                    <div className='workspace__nav__upload'>
                        <button><label htmlFor='fileInput'>Upload</label></button>
                        <input id='fileInput' type="file" accept="video/*" onChange={uploadVideo} style={{ display: 'none' }} />
                        {save && loggedIn && <button onClick={saveVideo}>save</button>}
                    </div>
                    <div className='workspace__nav__actions'>
                        {video && <button onClick={takeFrames}>frame</button>}
                        {frame && <button onClick={takePoses}>pose</button>}
                    </div>
                    <div className='workspace__nav__controls'>
                        {frame && <button onClick={() => playFrames(this.frames)}>play frames</button>}
                        {pose && <button onClick={() => playFrames(this.poses)}>play pose</button>}
                        {pose && <button onClick={() => playFrames(this.poses2)}>play only pose</button>}
                        {pose && <button onClick={stopFrames}>stop</button>}
                    </div>
                </nav>
                <video onClick={toggleVideo} ref='video' src='' className={'video' + (showVideo ? '' : ' hidden')}></video>
                <img src='' alt='' ref='image' className={'image' + (showVideo ? ' hidden' : '')}></img>
                <div>
                    {msg && <p>{msg}</p>}
                </div>
                <canvas ref='canvas' style={{ display: 'none' }}></canvas>
                <img src='' alt='' ref='image2' style={{ display: 'none' }} />
            </div>
        )
    }
}

export default Workspace