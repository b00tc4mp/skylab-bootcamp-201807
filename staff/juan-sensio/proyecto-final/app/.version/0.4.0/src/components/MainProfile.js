import React, { Component } from 'react'

import logic from '../logic'

import './styles/MainProfile.css'

import VideoGallery from './VideoGallery'

class MainProfile extends Component {

    state = {
        videos: [],
        msg: ''
    }

    componentWillMount = () => logic.retrieveData().then(() => this.setState({ videos: logic._userData.videos }))

    deleteVideo = id => {
        this.props.deleteVideo(id) 
            .then(this.setState({ msg: 'deleted !', videos: logic._userData.videos }))
    }

    render() {
        const { videos } = this.state
        const { setVideoSrc } = this.props
        const { deleteVideo } = this
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

export default MainProfile