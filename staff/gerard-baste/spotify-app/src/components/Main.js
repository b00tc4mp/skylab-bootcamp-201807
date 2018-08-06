import React, { Component } from 'react'
import logic from '../logic'
import SearchPanel from './SearchPanel'
import ResultList from './ResultList'
// import TrackPlayer from './TrackPlayer'
import SpotifyPlayer from './SpotifyPlayer'

const ERROR_HOUSTON = 'We have a problem, Houston! Sorry, try again later.'

class Main extends Component {
    state = {
        artists: [],
        albums: [],
        tracks: [],
        track: undefined, // { title, image, file, url } for TrackPlayer or { id, title } for SpotifyPlayer
        searchError: null,
        artistError: null,
        albumError: null,
        trackError: null
    }

    onSearch = query =>
        logic.searchArtists(query)
            .then(artists =>
                this.setState({
                    artists: artists.map(({ id, name: text }) => ({ id, text })),
                    albums: [],
                    tracks: [],
                    track: undefined,
                    searchError: null,
                    artistError: null,
                    albumError: null,
                    trackError: null
                })
            )
            .catch(() => this.setState({ searchError: ERROR_HOUSTON }))

    onArtistClick = id =>
        logic.retrieveAlbumsByArtistId(id)
            .then(albums =>
                this.setState({
                    albums: albums.map(({ id, name: text }) => ({ id, text })),
                    tracks: [],
                    track: undefined,
                    searchError: null,
                    artistError: null,
                    albumError: null,
                    trackError: null
                })
            )
            .catch(() => this.setState({ artistError: ERROR_HOUSTON }))

    onAlbumClick = id =>
        logic.retrieveTracksByAlbumId(id)
            .then(tracks =>
                this.setState({
                    tracks: tracks.map(({ id, name: text }) => ({ id, text })),
                    track: undefined,
                    searchError: null,
                    artistError: null,
                    albumError: null,
                    trackError: null
                })
            )
            .catch(() => this.setState({ albumError: ERROR_HOUSTON }))

    onTrackClick = id =>
        logic.retrieveTrackById(id)
            .then(track =>
                this.setState({
                    track: {
                        id: track.id,
                        title: track.name
                        // image: track.album.images[0].url,
                        // file: track.preview_url,
                        // url: track.external_urls.spotify
                    },
                    searchError: null,
                    artistError: null,
                    albumError: null,
                    trackError: null
                })
            )
            .catch(() => this.setState({ trackError: ERROR_HOUSTON }))

    render() {
        console.log('Main', 'render')
        
        const { state: { artists, albums, tracks, track, searchError, artistError, albumError, trackError }, onSearch, onArtistClick, onAlbumClick, onTrackClick } = this

        return <section>
            <h2>Search</h2>

            <SearchPanel onSearch={onSearch} error={searchError} />

            {artists.length > 0 && <section><h2>Artists</h2><ResultList results={artists} onItemClick={onArtistClick} error={artistError} /></section>}

            {albums.length > 0 && <section><h2>Albums</h2><ResultList results={albums} onItemClick={onAlbumClick} error={albumError} /></section>}

            {tracks.length > 0 && <section><h2>Tracks</h2><ResultList results={tracks} onItemClick={onTrackClick} error={trackError} /></section>}

            {track && <section><h2>Track</h2><SpotifyPlayer track={track} /></section>}
            {/* {track && <section><h2>Track</h2><TrackPlayer track={track} /></section>} */}
        </section>
    }
}

export default Main