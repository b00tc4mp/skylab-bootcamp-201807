import React from 'react'

function TrackPlayer(props) {
    return <section>
        <h2>{props.track.name}</h2>
        <img src={props.track.image} alt="props.track.image" />
        <audio controls>
            <source src={props.track.file} type="audio/mpeg" />
        </audio>
        <a href={props.track.url} target="_blank" />
    </section>
}

export default TrackPlayer