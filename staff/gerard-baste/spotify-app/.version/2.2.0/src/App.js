import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';
import SearchPanel from './components/SearchPanel'
import ResultList from './components/ResultList'
import TrackList from './components/TrackList'
import logic from './logic'

logic.token = 'BQB-ZNrX9ADMbC6dyuSbb4F1AsKQHZEdReqtbbormDskBOcTkg91YTecBzFt-brfWnsizuL0R5dlbfQW479RQljMB-KJ8-Gk3js4zhZFDETkSRqljq1ZGLNfMWWPqKbCvTj6p1uEyWrSTOOlEA';

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
      .then (albums => {
        this.setState({
          albums: albums.map(albums => {
            return {id: albums.id, text: albums.name} 
          }),
          tracks: [],
          track: undefined
        })
      })
      .catch(console.error)
  }

  onAlbumsClick = id => {
    logic.retrieveTracksByAlbumId(id)
      .then (tracks => {
        this.setState({
          tracks: tracks.map(({id, name}) => ({id, text: name})),
          track: undefined
        })
      })
      .catch(console.error)
  }

  onTrackClick = id => {
    logic.retrieveTrackById(id)
      .then (track => {
        this.setState({
          track:  {
              name: track.name,
              image: track.album.images[0].url,
              file: track.preview_url,
              link: track.external_urls.spotify
          },
        })
      })
      .catch(console.error)
  }

  render() {
    return (
      <div className="App">
        <header className="App-header">
          <img src={logo} className="App-logo" alt="logo" />
          <h1 className="App-title">Welcome to Espotifaya</h1>
        </header>
        
        <SearchPanel onSearch2={this.onSearch} />
        <ResultList results={this.state.artists} onItemClick={this.onArtistClick} />
        <ResultList results={this.state.albums} onItemClick={this.onAlbumsClick}/>
        <ResultList results={this.state.tracks} onItemClick={this.onTrackClick}/>
        {this.state.track && <TrackList track={this.state.track}/>}
      </div>
    );
  }
}

export default App;
