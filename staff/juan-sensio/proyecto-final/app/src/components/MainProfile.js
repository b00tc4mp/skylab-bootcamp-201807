import React, { Component } from 'react'
import { connect } from 'react-redux'
import { setVideo, setVideos, setDatasets } from '../redux/actions'

import logic from '../logic'

import './styles/MainProfile.css'

import VideoGallery from './VideoGallery'

const mapStateToProps = ({ user }) => ({
    videos: user.videos,
    datasets: user.datasets
})

const mapDispatchToProps = dispatch => ({
    setVideo: video => dispatch(setVideo(video)),
    setVideos: videos => dispatch(setVideos(videos)),
    setDatasets: datasets => dispatch(setDatasets(datasets))
})

class MainProfile extends Component {

    state = {
        msg: ''
    }

    setVideo = video => this.props.setVideo(video)

    retrieveVideos = () =>
        logic.retrieveVideos()
            .then(videos => this.props.setVideos(videos))

    retrieveDatasets = () =>
        logic.retrieveDatasets()
            .then(datasets => this.props.setDatasets(datasets))

    componentWillMount = () => {
        this.retrieveVideos()
        this.retrieveDatasets()
    }

    deleteVideo = id =>
        logic.deleteVideo(id)
            .then(() => {
                this.setState({ msg: 'video deleted !' })
                return this.retrieveVideos()
            })

    deleteDataset = id =>
        logic.deleteDataset(id)
            .then(() => {
                this.setState({ msg: 'dataset deleted !' })
                return this.retrieveDatasets()
            })

    render() {
        const { videos, datasets } = this.props
        const { setVideo, deleteVideo, deleteDataset } = this
        return (
            <div className='main-profile'>
                <VideoGallery
                    title={'My Videos'}
                    videos={videos}
                    setVideo={setVideo}
                    deleteVideo={deleteVideo} />
                <VideoGallery
                    title={'My Datasets'}
                    videos={datasets}
                    setVideo={setVideo}
                    deleteVideo={deleteDataset} />
            </div>
        )
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(MainProfile)