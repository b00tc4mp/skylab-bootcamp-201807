import React from 'react'

function TrackPlayer({track: {title, image, file, url }}) {

    return <section>

        <h1>Title: {title}</h1>
        <img src={image} alt={title} />
        <audio controls>
            <source src={file} type="audio/mpeg" />
        </audio>
        <a href={url} target="_blank">Open in Spotify</a>
    </section>

}

export default TrackPlayer