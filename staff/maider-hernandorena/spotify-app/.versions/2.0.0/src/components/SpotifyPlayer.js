import React from 'react'
import './css/player.css'

function SpotifyPlayer(props) {
    return  <section className="player">
                <iframe className="player__box" title={props.track.title} src={`https://open.spotify.com/embed?uri=spotify:track:${props.track.id}`} width="300" height="380" frameborder="0" allowtransparency="true" allow="encrypted-media"></iframe>
            </section>
}

export default SpotifyPlayer