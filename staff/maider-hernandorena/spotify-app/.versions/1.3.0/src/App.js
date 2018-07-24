import React, { Component } from 'react'
import logo from './logo.svg'
import './App.css'
import SearchPanel from './components/SearchPanel'
import ResultList from './components/ResultList'
// import TrackPlayer from './components/TrackPlayer'
import SpotifyPlayer from './components/SpotifyPlayer'
import logic from './logic'

logic.token = 'BQDv1TM46_ZJIXE_MwEuBzFIpuhfwaEjrEUP_0EKSWX-VI7VeDX9jIB4WT11QCuoEpP0R2ziLTeIZow87rNJdVitELDFZkaGAEMW9-YiBxed0xocnUVh0TXgifCHrpou3T8ByZJZU-zUXw';

class App extends Component {

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
      .catch(console.error)
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
      .catch(console.error)
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
      .catch(console.error)
  }

  onTrackClick = id => {
    logic.retrieveTrackById(id)
      .then(track => {
        this.setState({
          track: {id: track.id, title: track.name}
          // track: {title: track.name, image: track.album.images[0].url, file: track.preview_url, url: track.external_urls.spotify}
        })
      })
      .catch(console.error)
  }

  render() {

    const {state: {artists, albums, tracks, track}, onArtistClick, onAlbumClick, onTrackClick} = this

    return (
      <div className="App">
        <header className="App-header">
          <img src={logo} className="App-logo" alt="logo" />
          <h1 className="App-title">Welcome to Spotify App</h1>
        </header>

        <h2>Search by Artist:</h2>
        <SearchPanel onSearch={this.onSearch} />

        {artists.length > 0 && <section><h2>Artists:</h2><ResultList results={artists} clickItem={onArtistClick}/></section>}

        {albums.length > 0 && <section><h2>Albums:</h2><ResultList results={albums} clickItem={onAlbumClick}/></section> }
        
        {tracks.length > 0 && <section><h2>Tracks:</h2><ResultList results={tracks} clickItem={onTrackClick}/></section> }
        
        {/* {track && <TrackPlayer track={track}/>} */}
        {track && <SpotifyPlayer track={track}/>}
        
      </div>
    );
  }
}

export default App;
