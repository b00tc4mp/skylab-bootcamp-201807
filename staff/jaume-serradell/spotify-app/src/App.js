import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';
import SearchPanel from './components/SearchPanel';
import ResultList from './components/ResultList';
import logic from './logic'

logic.token = 'BQDWpUhNvTCZ8an-Xy4zzQaEOZSfkYdwKztiIvLg_XaDbZjWJhzwq2197QSYMLrrymJEyuOPiItBQq4c0fpPgtw2I4vtQhLo7eSGQS7fdw115qvUUIj7OUsvdQ_LWp-rv43zC8G0drOGXel-faJ9NBS4bkul1vNXuZPR9TqEjp32wuALdrfukaVzzn1BJh9GkyYo6Bdtj31wA7GVOEbDnQ04Ftq-Nd7244kNTr34eP3lyGA6LdSyTONzHWS0iC09wzsEwafLUO8';

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
          })
        })
      })
      .catch(console.error)
  }

  onArtistClick = id => {
    logic.retrieveAlbumsByArtistId(id)
      .then(albums => {
        this.setState({
          albums: album.map(album => {
            return { id: album.id, text: album.name }
          })
        })
      })
      .catch(console.error)
  }

  onAlbumClick = id => {
    logic.retrieveTracksByAlbumId(id)
      .then(tracks => {
        this.setState({
          tracks: track.map(track => {
            return { id: track.id, text: track.name }
          })
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

        <ResultList results={this.state.artists} />
        
      </div>
    );
  }
}

export default App;
