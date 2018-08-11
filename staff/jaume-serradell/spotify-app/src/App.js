import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';
import SearchPanel from './components/SearchPanel';
import ResultList from './components/ResultList';
import TrackList from './components/TrackList';
import logic from './logic'

logic.token = 'BQC8O9Ks6Er16GrtNnswBciN_TxuSNwA7l4l5fvQo3j1tOwgj-1CTyqVWJE5Dq4h2RE3ADIfqVp70gO2y3EUi-ULUNV5S8EsCvo4wdjnDJFrY7roKa6vNzyVPx2mi5v1UdM-a06OWhGhZnGmxBhG3Dgxe0PIcjQRepz5a_ro9tRDRkyAuMRpTTjWNirvVzkng4C5CUB681wao3qyjQbaAyBZQMlck3e747luVJ5SVuo3zLfWkuyP-CpRVlz7GPlrdCn_6Rf3bxE';

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
