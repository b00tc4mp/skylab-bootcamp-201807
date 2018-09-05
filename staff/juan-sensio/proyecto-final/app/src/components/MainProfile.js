import React, { Component } from 'react'
import { connect } from 'react-redux'
import { updateSetting } from '../redux/actions'

import logic from '../logic'

import './styles/MainProfile.css'

import VideoGallery from './VideoGallery'

const mapDispatchToProps = dispatch => ({
    updateSetting: (key, value) => dispatch(updateSetting(key, value))
})

class MainProfile extends Component {

    state = {
        videos: [],
        msg: ''
    }

    setVideoSrc = src => this.props.updateSetting('mainVideoSrc', src)

    componentWillMount = () => 
        logic.retrieveVideos()
            .then(videos => this.setState({ videos }))

    deleteVideo = id => {
        logic.deleteVideo(id)
            .then(this.setState({ msg: 'deleted !', videos: logic.retrieveVideos() }))
            .then(() => window.location.reload())
    }

    render() {
        const { videos } = this.state
        const { setVideoSrc, deleteVideo } = this
        return (
            <div className='main-profile'>
                <VideoGallery
                    title={'My Videos'}
                    videos={videos}
                    setVideoSrc={setVideoSrc}
                    deleteVideo={deleteVideo} />
            </div>
        )
    }
}

export default connect(null, mapDispatchToProps)(MainProfile)