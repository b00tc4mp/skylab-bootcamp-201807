import React, { Component } from 'react'
import { connect } from 'react-redux'
import { updateSetting, setVideos, setDatasets } from '../redux/actions'
import logic from '../logic'

import './styles/Workspace.css'

import * as posenet from '@tensorflow-models/posenet'

import uploadIcon from './pics/upload-icon.svg'
import saveIcon from './pics/save-icon.svg'
import portraitIcon from './pics/portrait-icon.svg'
import exerciseIcon from './pics/exercise-icon.svg'
import playIcon from './pics/play-icon.svg'
import stopIcon from './pics/stop-icon.svg'
import dancerIcon from './pics/dancer-icon.svg'
import starsIcon from './pics/stars-icon.svg'

const mapStateToProps = ({ video }) => ({
    videoSrc: video.url,
    videoId: video.id
})

const mapDispatchToProps = dispatch => ({
    updateSetting: (key, value) => dispatch(updateSetting(key, value)),
    setVideos: videos => dispatch(setVideos(videos)),
    setDatasets: datasets => dispatch(setDatasets(datasets))
})

class Workspace extends Component {

    state = {
        msg: '',
        save: false,
        video: false,
        frame: false
    }

    componentWillReceiveProps = nextProps => {
        if (this.props.videoSrc !== nextProps.videoSrc)
            this.loadVideo(nextProps.videoSrc)
    }

    uploadVideo = e => {
        this.file = e.target.files[0]
        const url = URL.createObjectURL(e.target.files[0])
        const video = this.refs.video
        video.src = url
        video.addEventListener('loadeddata', () => {
            this.setState({ save: true, video: true, frame: false })
        })
    }

    loadVideo = videoSrc => {
        const video = this.refs.video
        if (videoSrc) {
            video.src = videoSrc
            video.addEventListener('loadeddata', () => {
                this.setState({ save: false, video: true, frame: true })
            })
        } else {
            video.src = ''
            this.setState({ save: false, video: false, frame: false })
        }
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
        logic.saveVideo(this.file)
            .then(() => {
                this.setState({ msg: 'video saved !', save: false })
                return logic.retrieveVideos()
            })
            .then(videos => this.props.setVideos(videos))
            .catch(err => this.setState({ msg: err.message }))
    }

    buildDataset = () => {
        this.setState({ msg: 'building ... (this could take a while)' })
        logic.buildDataset(this.props.videoId)
            .then(() => {
                this.setState({ msg: 'dataset created' })
                return logic.retrieveDatasets()
            })
            .then(datasets => this.props.setDatasets(datasets))
            .catch(err => this.setState({ msg: err.message }))
    }

    render() {
        const { videoSrc } = this.props
        const { msg, save, video, frame } = this.state
        const loggedIn = logic.loggedIn()
        const { uploadVideo, toggleVideo, saveVideo, buildDataset } = this
        return (
            <div className='workspace' >
                <nav className='workspace__nav'>
                    <div className='workspace__nav__upload'>
                        <button><label htmlFor='fileInput'><img src={uploadIcon} alt='upload' /></label></button>
                        <input id='fileInput' type="file" accept="video/*" onChange={uploadVideo} style={{ display: 'none' }} />
                        {save && loggedIn && <button onClick={saveVideo}><img src={saveIcon} alt='save' /></button>}
                    </div>
                    <div className='workspace__nav__actions'>
                        {/* {video && <button onClick={takeFrames}><img src={portraitIcon} alt='upload' /></button>} */}
                        {frame && <button onClick={buildDataset}><img src={exerciseIcon} alt='pose' /></button>}
                    </div>
                    <div className='workspace__nav__controls'>
                        {/* {frame && <button onClick={() => playFrames(this.frames)}><img src={playIcon} alt='play' /></button>} */}
                        {/* {frame && <button onClick={stopFrames}><img src={stopIcon} alt='stop' /></button>} */}
                        {/* {pose && <button onClick={() => playFrames(this.poses)}><img src={dancerIcon} alt='pose' /></button>} */}
                        {/* {pose && <button onClick={() => playFrames(this.poses2)}><img src={starsIcon} alt='only pose' /></button>} */}
                    </div>
                </nav>
                <video onClick={toggleVideo} ref='video' src={videoSrc} className={'video' + (video ? '' : ' hidden')}></video>
                <div>
                    {msg && <p>{msg}</p>}
                </div>
            </div >
        )
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(Workspace)