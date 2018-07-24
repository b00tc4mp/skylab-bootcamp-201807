import React, { Component } from 'react'
import SearchPanel from './SearchPanel'
import ResultList from './ResultList'
// import TrackPlayer from './TrackPlayer'
import SpotifyPlayer from './SpotifyPlayer'
import logic from '../logic'
import LogoutPlace from './Logout-place';
import Logout from './Logout';
// import GoToLogout from './GoToLogout';


class Main extends Component {

  state = { artists: [], albums: [], tracks: [], track: undefined }

  onSearch = query => {
    logic.searchArtists(query)
      .then(artists => {
        this.setState({ 
          artists: artists.map(artist => {
            return { id: artist.id, text: artist.name }
          }), 
          albums: [],
          tracks: [],
          track: undefined
        })
      })
      .catch(() => {
        alert ('The artist ' + query + ', is not on Spotify.')
      })
  }

  onArtistClick = id => {
    logic.retrieveAlbumsByArtistId(id)
      .then(albums => {
        this.setState({ 
          albums: albums.map(album => {
            return { id: album.id, text: album.name }
          }) , 
          tracks: [],
          track: undefined
        })
      })
      .catch(() => {
        alert ('Sorry we have troubles with this artist, try it later!')
      })
  }

  onAlbumClick = id => {
    logic.retrieveTracksByAlbumId(id)
      .then(tracks => {
        this.setState({ 
        tracks: tracks.map(track => {
            return { id: track.id, text: track.name }
        }) ,
        track: undefined
        })
      })
      .catch(() => {
        alert ('Sorry we have troubles with this album, try it later!')
      })
  }

  onTrackClick = id => {
    logic.retrieveTrackById(id)
      .then(track => {
        this.setState({
          track: {id: track.id, title: track.name}
          // track: {title: track.name, image: track.album.images[0].url, file: track.preview_url, url: track.external_urls.spotify}
        })
      })
      .catch(() => {
        alert ('Sorry we have troubles with this track, try it later!')
      })
  }

  GoToLogout = id => {
    logic.logOut(id)

  }

  render() {

    const {state: {artists, albums, tracks, track}, onSearch, onArtistClick, onAlbumClick, onTrackClick} = this

    return (
      <section>

        <LogoutPlace clickItem={this.GoToLogout} />

        <h2>Search by Artist:</h2>
        <SearchPanel onSearch={onSearch} />

        {artists.length > 0 && <section><h2>Artists:</h2><ResultList results={artists} clickItem={onArtistClick}/></section>}

        {albums.length > 0 && <section><h2>Albums:</h2><ResultList results={albums} clickItem={onAlbumClick}/></section> }
        
        {tracks.length > 0 && <section><h2>Tracks:</h2><ResultList results={tracks} clickItem={onTrackClick}/></section> }
        
        {/* {track && <TrackPlayer track={track}/>} */}
        {track && <SpotifyPlayer track={track}/>}
        
      </section>
    );
  }
}

export default Main