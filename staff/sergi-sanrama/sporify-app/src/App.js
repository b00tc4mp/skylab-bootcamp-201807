import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';
import SearchPanel from './components/SearchPanel';
import logic from './logic'
import ResultList from './components/ResultList'

logic.token = 'BQBHEo3SbacdDs_2CPw-DLojiVHn4vReq5ETNyCh789poVkA2jF9jaAO0aMsjwev-2gjA_ACWFSrY85tCeQW-6ffmey8_arthq0tLe_Tnp3swFWlOtjqdwhdOhcIqh0sN1rJk2rEVsvCS3-pyzqaPoZsNSPkEjZlsyUtgkUWFit8';

class App extends Component {
  state = { artists: [] };

  onSearch = query => {
    
    logic.searchArtists(query)
    .then( artists => {
      this.setState({artists: artists.map(artist => {
        return { id: artist.id, text: artist.name }
        })
      })
    }).catch(console.error)
  }


  render() {
    return (
      <div className="App">
        <header className="App-header">
          <img src={logo} className="App-logo" alt="logo" />
          <h1 className="App-title">My Spotify App</h1>
        </header>
        <SearchPanel onSearch={this.onSearch} />
        <p className="App-intro">
          To get started, edit <code>src/App.js</code> and save to reload.
        </p>

        <ResultList results={(this.state.artists)} />

      </div>
    )
  }
}

export default App;
