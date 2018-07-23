import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';
import SearchPanel from './components/SearchPanel';
import ResultList from './components/ResultList';
import logic from './logic'
logic.token = 'BQAI4WG5Rqp83cGznCC4mRdtasmar5rxZGMmi0EL7Gtw90kFtC6B2VD_LGaJhR1zHeVlWZd1UOEhuJGot_6d2tcvfay8WAMJoQ3fg9Z2wcKvldzz25qSwVh3jAF89p5Rj5rSnsS_tM0z78F399loGnLxbnuaZIWBejQ'
class App extends Component {
  state = { artists: [] }
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

  onArtistClick = (id) =>{
    //TODO search albums from artist id
    console.log(id)
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
      </div>
    );
  }
}

export default App;
