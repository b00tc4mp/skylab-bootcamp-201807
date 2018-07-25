import React, { Component } from 'react'

import logic from "../logic"

import SearchPanel from './SearchPanel'
import ResultList from './ResultList'
import SpotifyPlayer from './SpotifyPlayer'

logic.spotifyToken = 'BQBJhptn3A7sqC9eOxE3hnO7Z8roi55mlhhBZ4hjiU6CtzX52StYIEB4-Y0LGemRrBL_z6kWz9M1ApChdYOuGQIKoNv5e1Hi-hBVJQjP1bzoA70zCxf4m8FGXEHs1uyW1kPjoX5FVbID2eMxgQ';

class Main extends Component {
    state = {
        artists: [],
        albums: [],
        tracks: [],
        track: undefined
    }
    
    onSearch = query => {
        this.setState({ albums: [], tracks: [], track: undefined })
        logic.searchArtists(query)
            .then(artists => this.setState({
                artists: artists.map(({ id, name }) => ({ id, name }))
            }))
            .catch(console.log)
    }
    onClickArtist = id => {
        this.setState({ tracks: [], track: undefined })
        logic.retrieveAlbumsByArtistId(id)
            .then(albums => this.setState({
                albums: albums.map(({ id, name }) => ({ id, name }))
            }))
            .catch(console.log)
    }
    onClickAlbum = id => {
        this.setState({ track: undefined })
        logic.retrieveTracksByAlbumId(id)
            .then(tracks => this.setState({
                tracks: tracks.map(({ id, name }) => ({ id, name }))
            }))
            .catch(console.log)
    }
    onClickTrack = id => {
        this.setState({ track: id })
    }

    render() {
        return (
            <div>
                <h1> SEARCH </h1>
                <SearchPanel onSearch={this.onSearch} />
                {this.state.artists.length > 0 && <h2> Artists </h2>}
                <ResultList items={this.state.artists} onClick={this.onClickArtist} />
                {this.state.albums.length > 0 && <h2> Albums </h2>}
                <ResultList items={this.state.albums} onClick={this.onClickAlbum} />
                {this.state.tracks.length > 0 && <h2> Tracks </h2>}
                <ResultList items={this.state.tracks} onClick={this.onClickTrack} />
                {this.state.track && <SpotifyPlayer track={this.state.track} />}
            </div>
        )
    }
}

export default Main