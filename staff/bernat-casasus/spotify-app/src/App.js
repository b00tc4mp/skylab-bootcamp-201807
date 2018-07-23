import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';
import SearchPanel from './components/SearchPanel';
import ResultList from './components/ResultList';
import logic from './logic'
logic.token = 'BQDa50ZLyAIiu5HPvW5-vqmmqfO7deePp6lrDW1v57EU2CJ2uCaXj5Np3TINOZyzldw-A6Kw6Yj13SoT0ueeZqekDpuwWwH2L-dd1zKlcq2SrSTt-jRjHpQCkelKWUIcMxjcHn39u3MkT6f_C6RFQDp2W2sb0TK_I70'
class App extends Component {

  state = { artists: [], albums: [] }
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
    logic.retrieveAlbumsByArtistId(id)
      .then(albums =>{
          this.setState({
            albums: albums.map(album =>{
              return {id: album.id, text: album.name}
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
        <ResultList results={this.state.artists} onItemClick={this.onArtistClick} />
      </div>
    );
  }
}

export default App;
