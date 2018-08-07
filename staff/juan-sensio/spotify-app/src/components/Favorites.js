import React, { Component } from 'react'
import './Favorites.css'
import ListLike from './ListLike'
import logic from '../logic'
import SpotifyPlayer from './SpotifyPlayer'

class Favorites extends Component {
    state = {
        track: null
    }
    getTracks = () => logic._userFavorites.map( id => ({id, name: "name?"}) )
    onClick = id => this.setState({track: id})
    onLike = () => this.setState({track: null})
    render() {
        const { state: {track}, getTracks, onClick, onLike } = this
        return (
            <div className="favorites">
                <h3 className="favorites__title"> Favorites </h3>
                {track && <SpotifyPlayer track={track}/>}
                <ListLike items={getTracks()} onClick={onClick} onLike={onLike}/>
            </div>
        )
    }
}

export default Favorites