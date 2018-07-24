import React from 'react'

function SpotifyPlayer(props) {
    return <section>
        <iframe title={props.track.title} src={`https://open.spotify.com/embed?uri=spotify:track:${props.track.id}`} width="300" height="380" frameborder="0" allowtransparency="true" allow="encrypted-media"></iframe>
    </section>
}

export default SpotifyPlayer