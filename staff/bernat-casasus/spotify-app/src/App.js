import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';
import SearchPanel from './components/SearchPanel';
import ResultList from './components/ResultList';
import TrackPanel from './components/TrackPanel';
import logic from './logic'
logic.token = 'BQDJVfA66YsdwTzw7zX1yORP3i4VGsuaQfwbvv8SxA3Wa8-xDCIv1lemOjLx-E5ywYPd0VW5LRfifBnv1TosKswvmgrDdmJqu34Acu4rKij_T_QMtXafj5K70QzRfBIri0n7ue4JMlJm-Ft5U6M36FbGACDLuNm7g7Y'
class App extends Component {

  state = { artists: [], albums: [], tracks: [], track: {} }
  onSearch = query => {
    logic.searchArtists(query)
      .then(artists => {
        this.setState({
          artists: artists.map(artist => {
            return { id: artist.id, text: artist.name }
          }), albums:[],tracks:[],track:[]
        })
      })
      .catch(console.error)
  }

  onArtistClick = (id) =>{
    //TODO search albums from artist id
    logic.retrieveAlbumsByArtistId(id)
      .then(albums =>{
          this.setState({
            albums: albums.map(album =>{
              return {id: album.id, text: album.name}
            }),tracks:[],track:[]
          })
      })
  }

  onAlbumClick = (id) =>{
    logic.retrieveTracksByAlbumId(id)
      .then(tracks =>{
        this.setState({
          tracks: tracks.map(track => {
            return {id: track.id, text: track.name}
          }),track:[]
        })
      })
  }

  onTrackClick = (id) => {
    logic.retrieveTrackById(id)
        .then(track => {
          this.setState({
            track: {id: track.id, text: track.name, preview_url: track.preview_url}
          })
        })
    
  }

  render() {
    return (
      <div className="App">
        <header className="App-header">
          <img src={logo} className="App-logo" alt="logo" />
          <h1 className="App-title">Spotify App</h1>
        </header>
        <SearchPanel onSearch={this.onSearch} />
        <ResultList results={this.state.artists} onItemClick={this.onArtistClick} />
        <ResultList results={this.state.albums} onItemClick={this.onAlbumClick} />
        <ResultList results={this.state.tracks} onItemClick={this.onTrackClick} />
        <TrackPanel result={this.state.track} />
      </div>
    );
  }
}

export default App;
