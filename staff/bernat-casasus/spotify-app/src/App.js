import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';
import SearchPanel from './components/SearchPanel';
import ResultList from './components/ResultList';
import logic from './logic'
logic.token = 'BQC3nZcrr4AquxZ_s4yYze6Rl3D6b3dsPy_R7mSWefxkAiUCnxlv7XTtTYXJS0l6cMr97cqWB8BcmORTgRp3z5VyZq_uT26eZDrdYkYteh0G9-2yYc4yHZSMsXvqFGDZgfE9y8f1Ud6aBUi-7vmNyOgKfrQEbRV-azI'
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

  render() {
    return (
      <div className="App">
        <header className="App-header">
          <img src={logo} className="App-logo" alt="logo" />
          <h1 className="App-title">Spotify App</h1>
        </header>
        <SearchPanel onSearch={this.onSearch} />
        <ResultList results={this.state.artists}/>
      </div>
    );
  }
}

export default App;
