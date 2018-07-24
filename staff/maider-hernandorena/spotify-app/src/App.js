import React, { Component } from 'react'
import logo from './logo.svg'
import './App.css'
import SearchPanel from './components/SearchPanel'
import ResultList from './components/ResultList'
import TrackPlayer from './components/TrackPlayer'
import logic from './logic'

logic.token = 'BQD8wCzfw8D2KBQVdXA-L-zu1XSlC2RYmP7-aV_iGDVOaamZNsUTkoVbT9KgrL9H9dLyRdVyHF7mKgYznWGzopUDvUoIBKFmMJ3rJNr3s8VwZFBNjpB1KVfbSQo24QEEaZ_1xiCkcfCdIQ';

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
          track: {title: track.name, image: track.album.images[0].url, file: track.preview_url, url: track.external_urls.spotify}
        })
      })
      .catch(console.error)
  }

  render() {
    return (
      <div className="App">
        <header className="App-header">
          <img src={logo} className="App-logo" alt="logo" />
          <h1 className="App-title">Welcome to Spotify App</h1>
        </header>
        <SearchPanel onSearch={this.onSearch} />

        <ResultList results={this.state.artists} clickItem={this.onArtistClick} />

        <ResultList results={this.state.albums} clickItem={this.onAlbumClick} />

        <ResultList results={this.state.tracks} clickItem={this.onTrackClick} />

        {this.state.track && <TrackPlayer track={this.state.track}/>}
        
      </div>
    );
  }
}

export default App;
