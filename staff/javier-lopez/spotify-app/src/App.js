import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';
import SearchPanel from './components/SearchPanel';
import ResultList from './components/ResultList';
import logic from './logic'

logic.token = 'BQAjEiSgj6pL4cl-PRH8a1OCOM1asybF6-S5W73u-l5mJpXo3RXXBS7dBQMCt25P8qwj_KWtnK--utUDLHVwm8b5islQk8oiMRFWOk8QW8qgldyUt96UlnRueZ0ehniO-e_ZjlpDp8k';

class App extends Component {

  state = { artists: []}

  onSearch = query => {
    logic.searchArtists(query)
      .then(artists => {
        this.setState({ artists: artists.map(artist => {
          return {id: artist.id, text: artist.name} 
        })
      })
      })
      .catch(console.error)
  }

  onClick = id => {
    console.log(id);
  }



  render() {
    return (
      <div className="App">
        <header className="App-header">
          <img src={logo} className="App-logo" alt="logo" />
          <h1 className="App-title">Welcome to Spotify</h1>
        </header>
        <SearchPanel onSearch={this.onSearch} />
        <ResultList results={this.state.artists} onItemClick={this.onClick}/>
      </div>
    );
  }
}

export default App;
