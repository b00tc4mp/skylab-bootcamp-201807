import React from 'react';

function Player(props){

    return  (
            <section>
            <h2>{props.results.title}</h2>
            <img src={props.results.image}/>
            <audio controls><source src={props.results.file} type="audio/mpeg"></source></audio>
            <a href={props.results.url}>Link</a>
            </section>
    )
}

export default Player