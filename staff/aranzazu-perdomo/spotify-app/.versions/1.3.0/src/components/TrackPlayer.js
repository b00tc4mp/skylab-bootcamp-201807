import React from 'react'

function TrackPlayer(props) {
    return <section>
        <h2>{props.track.title}</h2>
        <img src={props.track.image} alt={props.track.title} />
        <audio controls>
            <source src={props.track.file} type="audio/mpeg" />
        </audio>
        <a href={props.track.url} target="_blank">Open in original player</a>
    </section>
}

export default TrackPlayer