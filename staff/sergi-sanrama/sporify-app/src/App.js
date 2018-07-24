import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';
import SearchPanel from './components/SearchPanel';
import logic from './logic'
import ResultList from './components/ResultList'
import TrackPlayer from './components/TrackPlayer';

logic.token = 'BQBitKmcySh6rJUK1leWI3TMBn-aKDmFpbx1SIMvcu6jCTh7Y2S7eF9UYP8sXwiYXmqgxAtBnD1Zdq10usYdOB_wkjo1EQucR_jfbQuEoCZQ253byT92PX4Hw8EQEjHQcbu6oQEtk0J1YSBUj5wdkYyt1Yh_cBb8rBZDcMBHFJ40';

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
          artists: artists.map(({ id, name: text }) => ({ id, text })),
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
          albums: albums.map(({ id, name: text }) => ({ id, text })),
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
          tracks: tracks.map(({ id, name: text }) => ({ id, text })),
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
            url: track.external_urls.spotify
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
          <h1 className="App-title">Spotify-App with React</h1>
        </header>

        <h2>Search</h2>

        <SearchPanel onSearch={this.onSearch} />

        {this.state.artists.length > 0 && <h2>Artists</h2>} 

        <ResultList results={this.state.artists} onItemClick={this.onArtistClick} />

        {this.state.albums.length > 0 && <h2>Artists</h2>}

        <ResultList results={this.state.albums} onItemClick={this.onAlbumClick} />

        {this.state.tracks.length > 0 && <h2>Tracks</h2>}

        <ResultList results={this.state.tracks} onItemClick={this.onTrackClick} />

        {this.state.track && <TrackPlayer track={this.state.track} />}
      </div>
    );
  }
}

export default App;
