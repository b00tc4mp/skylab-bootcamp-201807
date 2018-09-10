import React, { Component } from 'react'
import { connect } from 'react-redux'
import { setVideo, setVideos, setDatasets, setResults, setModels } from '../redux/actions'

import logic from '../logic'

import './styles/MainProfile.css'

import VideoGallery from './VideoGallery'

const mapStateToProps = ({ user }) => ({
    videos: user.videos,
    datasets: user.datasets,
    results: user.results,
    models: user.models
})

const mapDispatchToProps = dispatch => ({
    setVideo: (video, type) => dispatch(setVideo(video, type)),
    setVideos: videos => dispatch(setVideos(videos)),
    setDatasets: datasets => dispatch(setDatasets(datasets)),
    setResults: results => dispatch(setResults(results)),
    setModels: models => dispatch(setModels(models))
})

class MainProfile extends Component {

    state = {
        msg: ''
    }

    retrieveVideos = () =>
        logic.retrieveVideos()
            .then(videos => this.props.setVideos(videos))

    retrieveDatasets = () =>
        logic.retrieveDatasets()
            .then(datasets => this.props.setDatasets(datasets))

    retrieveResults = () =>
        logic.retrieveResults()
            .then(results => this.props.setResults(results))

    retrieveModels = () =>
        logic.retrieveModels()
            .then(models => this.props.setModels(models))

    componentWillMount = () => {
        this.retrieveVideos()
        this.retrieveDatasets()
        this.retrieveResults()
        this.retrieveModels()
    }

    render() {
        const { videos, datasets, results, models, setVideo } = this.props
        return (
            <div className='main-profile'>
                <VideoGallery
                    title={'Videos'}
                    videos={videos}
                    setVideo={setVideo}
                    type='video' />
                <VideoGallery
                    title={'Datasets'}
                    videos={datasets}
                    setVideo={setVideo}
                    type='dataset' />
                <VideoGallery
                    title={'Results'}
                    videos={results}
                    setVideo={setVideo}
                    type='result' />
                <VideoGallery
                    title={'Models'}
                    videos={models}
                    setVideo={setVideo}
                    type='model' />
            </div>
        )
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(MainProfile)