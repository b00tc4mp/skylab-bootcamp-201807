import React, {Component} from 'react'

import './AlbumPanel.css'

import ListLike from './ListLike'
import SpotifyPlayer from './SpotifyPlayer'

class AlbumPanel extends Component {
    render() {
        const {
            props: {
                back,
                tracks,
                onClickTrack,
                track
            }
        } = this
        return(
            <div className="albumPanel">
                <button className="albumPanel__btn" onClick={back}>Back</button>
                <h3 className="albumPanel__title"> Tracks </h3>
                {track && <SpotifyPlayer track={track}/>}
                <ListLike items={tracks} onClick={onClickTrack} onLike={()=>{}}/>
            </div>
        )
    }
}

export default AlbumPanel