import React, { Component } from 'react';
import logic from "./logic"
import SearchPanel from './components/SearchPanel'
import ResultList from './components/ResultList'
import SpotifyPlayer from './components/SpotifyPlayer'

logic.token = 'BQCBCtw8WsA9ZLKowehdCOCGlRa0I4DHU5NbKqZ3anMJROxOsz7g7zTzqm27G9Pws6-89GjzefJJpiX91jsuQVUka-tP-XtkWbOmyUPHuof870WGOIAdm_KiZF7l7Pym1WYVsKX668GUq0_Utw';

class App extends Component {
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
        artists: artists.map( ({id,name}) => ({id,name}) )
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
        tracks: tracks.map( ({id,name}) => ({id,name}) )
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
    );
  }
}

export default App;
