import React, { Component } from 'react'
import logic from '../logic'
import SearchPanel from './SearchPanel'
import ResultList from './ResultList'
// import TrackPlayer from './TrackPlayer'
import SpotifyPlayer from './SpotifyPlayer'

class Main extends Component {
    state = {
        artists: [],
        albums: [],
        tracks: [],
        track: undefined // { title, image, file, url }
    }

    onSearch = query =>
        logic.searchArtists(query)
            .then(artists =>
                this.setState({
                    artists: artists.map(({ id, name: text }) => ({ id, text })),
                    albums: [],
                    tracks: [],
                    track: undefined
                })
            )
            .catch(console.error)

    onArtistClick = id =>
        logic.retrieveAlbumsByArtistId(id)
            .then(albums =>
                this.setState({
                    albums: albums.map(({ id, name: text }) => ({ id, text })),
                    tracks: [],
                    track: undefined
                })
            )
            .catch(console.error)

    onAlbumClick = id =>
        logic.retrieveTracksByAlbumId(id)
            .then(tracks =>
                this.setState({
                    tracks: tracks.map(({ id, name: text }) => ({ id, text })),
                    track: undefined
                })
            )
            .catch(console.error)

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
                    }
                })
            )
            .catch(console.error)

    render() {
        const { state: { artists, albums, tracks, track }, onSearch, onArtistClick, onAlbumClick, onTrackClick } = this

        return <section>
            <h2>Search</h2>

            <SearchPanel onSearch={onSearch} />

            {artists.length > 0 && <section><h2>Artists</h2><ResultList results={artists} onItemClick={onArtistClick} /></section>}

            {albums.length > 0 && <section><h2>Albums</h2><ResultList results={albums} onItemClick={onAlbumClick} /></section>}

            {tracks.length > 0 && <section><h2>Tracks</h2><ResultList results={tracks} onItemClick={onTrackClick} /></section>}

            {track && <section><h2>Track</h2><SpotifyPlayer track={track} /></section>}
            {/* {track && <section><h2>Track</h2><TrackPlayer track={track} /></section>} */}
        </section>
    }
}

export default Main