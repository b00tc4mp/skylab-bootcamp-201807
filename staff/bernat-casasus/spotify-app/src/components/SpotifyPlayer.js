import React from 'react'

function SpotifyPlayer({ track: { id, name } }) {
    return <section>
        <iframe title={name} src={`https://open.spotify.com/embed?uri=spotify:track:${id}`} width="300" height="380" frameBorder="0" allowtransparency="true" allow="encrypted-media"></iframe>
    </section>
}

export default SpotifyPlayer