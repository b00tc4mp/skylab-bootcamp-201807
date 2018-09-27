import React from 'react'


function SpotifyPlayer({id, name}) {
    return 
    <section>
    <iframe src={`https://open.spotify.com/embed?uri=spotify:track:${id}`} + " width="300" height="380" frameborder="0" allowtransparency="true" allow="encrypted-media"></iframe>;
}   </section>

export default SpotifyPlayer;