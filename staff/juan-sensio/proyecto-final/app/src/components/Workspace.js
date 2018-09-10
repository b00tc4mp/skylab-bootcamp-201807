import React, { Component } from 'react'
import { connect } from 'react-redux'
import {
    updateSetting,
    setVideos,
    setDatasets,
    setResults,
    setVideo,
    setActions
} from '../redux/actions'

import logic from '../logic'

import './styles/Workspace.css'

import uploadIcon from './pics/upload-icon.svg'
import saveIcon from './pics/save-icon.svg'
import exerciseIcon from './pics/exercise-icon.svg'
import dancerIcon from './pics/dancer-icon.svg'
import starsIcon from './pics/stars-icon.svg'
import garbageIcon from './pics/garbage-icon.svg'

const mapStateToProps = ({ video, settings, actions }) => ({
    videoSrc: video.url,
    videoId: video.id,
    videoType: video.type,
    settings,
    actions
})

const mapDispatchToProps = dispatch => ({
    updateSetting: (key, value) => dispatch(updateSetting(key, value)),
    setVideos: videos => dispatch(setVideos(videos)),
    setDatasets: datasets => dispatch(setDatasets(datasets)),
    setResults: results => dispatch(setResults(results)),
    setVideo: (video, type) => dispatch(setVideo(video, type)),
    setActions: actions => dispatch(setActions(actions))
})

class Workspace extends Component {

    state = {
        msg: ''
    }

    componentDidMount = () => {
        const src = this.props.videoSrc
        const type = this.props.videoType
        if (src)
            this.buildView(type, src)
    }

    componentWillReceiveProps = nextProps => {
        const src = nextProps.videoSrc
        const type = nextProps.videoType
        if (this.props.videoSrc !== src)
            this.buildView(type, src)
    }

    buildView = (type, src) => {
        this.setState({ msg: '' })
        switch (type) {
            case 'video':
                this.props.setActions({ save: false, pose: true, prepTransfer: false, transfer: false, delete: true, dataset: { url: '', id: '' } })
                break
            case 'dataset':
                this.props.setActions({ save: false, pose: false, prepTransfer: true, transfer: false, delete: true, dataset: { url: '', id: '' } })
                break
            case 'result':
                this.props.setActions({ save: false, pose: false, prepTransfer: false, transfer: false, delete: true, dataset: { url: '', id: '' } })
                break
            case 'model':
                const transfer = this.props.actions.dataset.url && this.props.actions.dataset.url
                this.props.setActions({ save: false, pose: false, prepTransfer: false, transfer, delete: false })
                break
            default:
                break
        }
        this.loadVideo(src)

    }

    uploadVideo = e => {
        this.file = e.target.files[0]
        const url = URL.createObjectURL(e.target.files[0])
        const video = this.refs.video
        video.src = url
        this.props.setActions({ save: true, pose: false, prepTransfer: false, transfer: false, delete: false })
    }

    loadVideo = src => {
        const video = this.refs.video
        video.src = src
    }

    toggleVideo = (video) => {
        if (video.paused || video.ended) video.play()
        else video.pause()
    }

    saveVideo = () => {
        this.setState({ msg: 'saving ... (this could take a while)' })
        logic.saveVideo(this.file)
            .then(() => {
                this.setState({ msg: 'video saved !' })
                this.props.setActions({ save: false })
                return logic.retrieveVideos()
            })
            .then(videos => this.props.setVideos(videos))
            .catch(err => this.setState({ msg: err.message }))
    }

    buildDataset = () => {
        if (this.props.videoType === 'video') {
            this.setState({ msg: 'building ... (this could take a while)' })
            logic.buildDataset(this.props.videoId, this.props.settings)
                .then(() => {
                    this.setState({ msg: 'dataset created' })
                    return logic.retrieveDatasets()
                })
                .then(datasets => this.props.setDatasets(datasets))
                .catch(err => this.setState({ msg: err.message }))
        } else {
            this.setState({ msg: 'select a video' })
        }
    }

    resetVideo = () => {
        this.props.setVideo({ video: { url: '', id: '' }, type: '' })
    }

    deleteVideo = () => {
        const id = this.props.videoId
        switch (this.props.videoType) {
            case 'video':
                logic.deleteVideo(id)
                    .then(() => {
                        this.setState({ msg: 'video deleted !' })
                        return logic.retrieveVideos()
                    })
                    .then(videos => {
                        this.props.setVideos(videos)
                        this.resetVideo()
                    })
                    .catch(err => this.setState({ msg: err.message }))
                break
            case 'dataset':
                logic.deleteDataset(id)
                    .then(() => {
                        this.setState({ msg: 'dataset deleted !' })
                        return logic.retrieveDatasets()
                    })
                    .then(datasets => {
                        this.props.setDatasets(datasets)
                        this.resetVideo()
                    })
                    .catch(err => this.setState({ msg: err.message }))
                break
            case 'result':
                logic.deleteResult(id)
                    .then(() => {
                        this.setState({ msg: 'result deleted !' })
                        return logic.retrieveResults()
                    })
                    .then(results => {
                        this.props.setResults(results)
                        this.resetVideo()
                    })
                    .catch(err => this.setState({ msg: err.message }))
                break
            case 'model':
                this.setState({ msg: 'models cannot be deleted' })
                break
            default:
                break
        }
        this.props.setActions({ save: false, pose: false, prepTransfer: false, transfer: false, delete: false, dataset: { url: '', id: '' } })
    }

    prepResult = () => {
        this.setState({ msg: 'select a model' })
        this.props.setActions({ dataset: { url: this.props.videoSrc, id: this.props.videoId }, pose: false, delete: false, prepTransfer: false })
        this.refs.video.src = ''
    }

    buildResult = () => {
        const datasetId = this.props.actions.dataset.id
        const modelId = this.props.videoId
        this.setState({ msg: 'building ... (this could take a while)' })
        this.props.setActions({ transfer: false })
        logic.buildResult(datasetId, modelId, this.props.settings)
            .then(() => {
                this.setState({ msg: 'result created' })
                return logic.retrieveResults()
            })
            .then(results => {
                this.props.setResults(results)
                this.resetVideo()
                this.props.setActions({ save: false, pose: false, prepTransfer: false, transfer: false, delete: false, dataset: { url: '', id: '' } })
            })
            .catch(err => this.setState({ msg: err.message }))
    }

    render() {
        const { videoSrc } = this.props
        const { save, delete: allowDelete, pose, transfer, prepTransfer, dataset: { url } } = this.props.actions
        const { msg } = this.state
        const loggedIn = logic.loggedIn()
        const { uploadVideo, toggleVideo, saveVideo, buildDataset, deleteVideo, buildResult, prepResult } = this
        return (
            <div className='workspace' >

                <nav className='workspace__nav'>
                    <div className='workspace__nav__upload'>
                        <button><label htmlFor='fileInput'><img src={uploadIcon} alt='upload' /></label></button>
                        <input id='fileInput' type="file" accept="video/*" onChange={uploadVideo} style={{ display: 'none' }} />
                        {save && loggedIn && <button onClick={saveVideo}><img src={saveIcon} alt='save' /></button>}
                    </div>
                    <div className='workspace__nav__actions'>
                        {pose && <button onClick={buildDataset}><img src={exerciseIcon} alt='pose' /></button>}
                        {prepTransfer && <button onClick={prepResult}><img src={starsIcon} alt='perp' /></button>}
                        {transfer && <button onClick={buildResult}><img src={dancerIcon} alt='transform' /></button>}
                    </div>
                    <div className='workspace__nav__controls'>
                        {allowDelete && <button onClick={deleteVideo}><img src={garbageIcon} alt='garbage' /></button>}
                    </div>
                </nav>

                <div>
                    {url && <video
                        onClick={() => toggleVideo(this.refs.video2)}
                        ref='video2'
                        src={url}
                        className='video-small'
                        muted
                    ></video>}
                    <video
                        onClick={() => toggleVideo(this.refs.video)}
                        ref='video'
                        src={videoSrc}
                        className={'video' + (url ? '-small' : '')}
                        muted
                    ></video>
                </div>

                <div>
                    {msg && <p>{msg}</p>}
                </div>
            </div >
        )
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(Workspace)