import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';
import SearchPanel from './components/SearchPanel';
import ResultList from './components/ResultList';
import TrackList from './components/TrackList';
import logic from './logic'

logic.token = 'BQAmR1cYvx_lVrs7-NFbWAIoGCdmp-xItk0InfiHv-5v_AzxWnvzhmQn5t4cB_etxGvfUmfQe6S9O858p-q8heVPHPjTcwLqfqxxPAf6n8PNUfYJYUAD8H5iVqVW2CLv6-fIwbNsH8zYXN-Jd9MdhV6pTcHX4u1n5oESGp8o7U6hJaNOwC8OAtyMbx-oN5TcdTcVwqqquoqvGC6bwFsVpD2diskaBIfm4nuI931PscRAmAJbboFfag81o4fy8RxObRGdfAgkFwg';

class App extends Component {
  state = { 
    artists: [],
    albums: [],
    tracks: [],
    track: undefined 
  }
  
  onSearch = query => {
    logic.searchArtists(query)
      .then(artists => {
        this.setState({ 
          artists: artists.map(({ id, name:text }) => ({ id, text })),
          albums: [],
          tracks: [],
          track: undefined
        })
      })
      .catch(console.error)
  }

  //Método onArtistClick
  onArtistClick = id => {
    logic.retrieveAlbumsByArtistId(id)
      .then(albums => {
        this.setState({
          albums: albums.map(({ id, name: text }) => ({ id, text })),
          tracks: [],
          track: undefined
        })
      })
      .catch(console.error)
  }

  //Método onAlbumClick
  onAlbumClick = id => {
    logic.retrieveTracksByAlbumId(id)
      .then(tracks => {
        this.setState({
          tracks: tracks.map(({ id, name:text }) => ({ id, text })),
          track: undefined
        })
      })
      .catch(console.error)
  }

  onTrackClick = id => {
    logic.retrieveTrackById(id)
      .then(track => {
        this.setState({
          track: {
            title: track.name,
            image: track.album.images[0].url,
            file: track.preview_url,
            link: track.external_urls.spotify
          }
        }) 
      })
      .catch(console.error)
  }
  
  render() {
    return (
      <div className="App">
        <header className="App-header">
          <img src={logo} className="App-logo" alt="logo" />
          <h1 className="App-title">Spotify App</h1>
        </header>
        
        {/* Componente SearchPanel con su propiedad onSearch */}
        <SearchPanel onSearch={this.onSearch} />

        <ResultList results={this.state.artists} onItemClick={this.onArtistClick} />

        <ResultList results={this.state.albums} onItemClick={this.onAlbumClick} />

        <ResultList results={this.state.tracks} onItemClick={this.onTrackClick} />

        {this.state.track && <TrackList results={this.state.track}/>}
        
      </div>
    );
  }
}

export default App;
