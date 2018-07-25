import React, { Component } from 'react'

import logic from "../logic"

import SearchPanel from './SearchPanel'
import ResultList from './ResultList'
import SpotifyPlayer from './SpotifyPlayer'

logic.spotifyToken = 'BQBo7vHc5gW11txoL8znEpB5qKd65TXi0wMpzajN8HkeXoOLzzH2kDhufb4AV3fPDOffmMyCADKW27x_uL43sjZF8R3OG31-9ncRf-hj_1V6CmLf4vs0uJmh0IWntS-BsllD1dnenndURQBjzQ';

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