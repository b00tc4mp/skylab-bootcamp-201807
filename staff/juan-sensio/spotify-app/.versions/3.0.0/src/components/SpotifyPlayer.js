import React from 'react';

import './SpotifyPlayer.css'

function SpotifyPlayer({track}) {
    return (
        <section>
            <iframe src={`https://open.spotify.com/embed?uri=spotify:track:${track}`} title="player" width="300" height="380" frameBorder="0" allowtransparency="true" allow="encrypted-media"></iframe>
        </section>
    )
}

export default SpotifyPlayer