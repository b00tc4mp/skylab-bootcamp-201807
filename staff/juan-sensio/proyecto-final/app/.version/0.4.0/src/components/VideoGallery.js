import React from 'react';

import './styles/VideoGallery.css'

function VideoGallery(props) {
    const { title, videos, setVideoSrc, deleteVideo } = props
    return (
        <div className='video-gallery'>
            <h3>{title}</h3>
            <div className='video-gallery__container'>
                {videos.map((video, index) => {
                    return (
                        <div key={index} className='video-gallery__video-container'>
                            <video src={video.url} autoPlay playsInline muted onClick={() => setVideoSrc(video.url)} key={index}></video>
                            <button onClick={() => deleteVideo(video.id)}>delete</button>
                        </div>
                    )
                })}
            </div>
        </div>
    )
}

export default VideoGallery