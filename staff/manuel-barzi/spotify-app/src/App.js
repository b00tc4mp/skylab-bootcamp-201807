import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';
import SearchPanel from './components/SearchPanel'
import ResultList from './components/ResultList'
import logic from './logic'

logic.token = 'BQCw1b6YMpvMhzqVGo8E5VivWPihx7bNGmmghj94_Hyn_c_C6sxgKJtuSzgfIL248y4EekVSgd8FRg49ER-kS2F07bqNqyll33CvLz60vZnFgvqUVHnnK1ncECo8n9otI6jspJucZXfR'

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

        <ResultList results={this.state.artists} />
      </div>
    );
  }
}

export default App;
