import React from 'react'

function TrackList(props){
    return <section>
        <h2>{props.results.title}</h2>
        <img src={props.results.image} alt={props.results.name} />
        <audio controls autoPlay>
                <source src={props.results.file} type='audio/mpeg' />
        </audio>
        <a href={props.results.link} target='_blank'>Open in Spotify</a>
    </section>
} 

export default TrackList