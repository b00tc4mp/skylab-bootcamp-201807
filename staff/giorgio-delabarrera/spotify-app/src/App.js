import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';
import SearchPanel from './components/SearchPanel';
import logic from './logic';
import ResultList from './components/ResultList';

logic.token = 'BQDL0jDrwJ-JeYx6_sGUsi9MvgwYuFbZ4H5epnFie0a1AUqPEZxDNUsP3D3ypr_NfBWLe34i0UwwxCFoHeU';

class App extends Component {

  state = { artists: [] }

  onSearch = query => {
    logic.searchArtists(query)
        .then(artists => {
          this.setState({
            artists: artists.map(artist => { return { id: artist.id, text: artist.name } })
          })
        })
        .catch(console.error)
  }

  onItemClick = artistId => {
    logic.retrieveAlbumsByArtistId(artistId)
        .then(console.log)
        .catch(console.error)
  }

  render() {
    return (
      <div className="App">
        <header className="App-header">
          <img src={logo} className="App-logo" alt="logo" />
          <h1 className="App-title">Welcome to Spotify App</h1>
        </header>
        <SearchPanel onSearch={this.onSearch}/>
        <ResultList results={this.state.artists} onItemClick={this.onItemClick}/>
      </div>
    );
  }
}

export default App;
