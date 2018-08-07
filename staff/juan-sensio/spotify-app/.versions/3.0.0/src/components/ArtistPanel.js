import React, { Component } from 'react'

import './ArtistPanel.css'

import List from './List'

class ArtistPanel extends Component {

    render() {
        const {
            props: {
                back,
                albums,
                onClickAlbum
            }
        } = this
        return (
            <div className="artistPanel">
                <button className="artistPanel__btn" onClick={back}>Back</button>
                <h3 className="artistPanel__title"> Albums </h3>
                <List items={albums} onClick={onClickAlbum} />
            </div>
        )
    }
}

export default ArtistPanel