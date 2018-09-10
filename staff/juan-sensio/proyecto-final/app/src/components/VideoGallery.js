import React from 'react';

import './styles/VideoGallery.css'

function VideoGallery(props) {

    const {
        title,
        videos,
        setVideo,
        type
    } = props

    return (
        <div className='video-gallery'>
            <h3>{title}</h3>
            <div className='video-gallery__container'>
                {videos.map((video, index) =>
                    <video
                        src={video.url}
                        autoPlay
                        playsInline
                        muted
                        onClick={() => setVideo(video, type)}
                        key={index}>
                    </video>
                )}
            </div>
        </div>
    )
}

export default VideoGallery