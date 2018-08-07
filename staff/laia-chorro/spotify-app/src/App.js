import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';
import SearchPanel from './components/SearchPanel';
import logic from './logic'; // no cal especificar més perquè l'unic arxiu dintre de logic es diu "index"
import ResultList from './components/ResultList';

logic.token = 'BQDbVqkozqQC__kj0EH0eY0-JXSMbfnoWwvFluZGnISDVYUrbhpdt5hsAe62Ai5fwhq1zNMUJIIBDT6v8EGw1r2HunMmSi3ysfaQjZ2U5e8PdEem4fqqVJyU4HIdJMNPl0TFEUHQBnJBuaJZaoWKZLYDL0Yyv24';


class App extends Component {
  state = {
    artists: []
  }

  onSearch = (query) => {
      console.log('search submit query: ' + query)

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
          <h1 className="App-title">Welcome to React</h1>
        </header>
        <SearchPanel onSearch={this.onSearch}/>
        <ResultList results={this.state.artists}/>
        <p className="App-intro">
          To get started, edit <code>src/App.js</code> and save to reload.
        </p>
      </div>
    );
  }
}

export default App;
