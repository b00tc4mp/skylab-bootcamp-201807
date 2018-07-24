import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';
import SearchPanel from './components/SearchPanel';
import logic from './logic'
import ResultList from './components/ResultList';
import SpotifyPlayer from './components/SpotifyPlayer';

logic.token = 'BQByo1wOdmS7DnS2gqRuguzx0tlXZqWJMEEQZtwrpifda80VhW10KgGhYuCyY2bhhuN0p1l3PqHUaqXfBiZ7nxArkHRv_v9MWYmf2BDYRnMm4k7J1tM_i1QjiA2UfOe9vxCaSnyFRCo';


class App extends Component {
  state = { artists: [], albums: [], tracks: [] }

  onSearch = query => {
    logic.searchArtists(query)
      .then(artists => {
        this.setState({
          artists: artists.map(artist => {
            return { id: artist.id, text: artist.name }
          })
        })
      })
      .catch(console.error);
  }


  onArtistClick = id => {
    logic.retrieveAlbumsByArtistId(id)
      .then(albums => 
        this.setState({
          albums: albums.map(album => {
            return {id: album.id, text: album.name }
          })
        }))
  .catch(console.error);
}

onAlbumClick = id => {
  logic.retrieveTracksByAlbumId(id)
    .then(tracks => 
      this.setState({
        tracks: tracks.map(track => {
        //  console.log(SpotifyPlayer(id));
          return {id: track.id, text: track.name }
        })
      }))
.catch(console.error);
}

onTrackClick = id => {
  logic.retrieveTrackById(id)
    .then(track => 
      this.setState({
        track: track.map(track => {
          return {id: track.id, text: track.name }
        })
      }))
.catch(console.error);
}


render() {
  return (
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <h1 className="App-title">Play me a song</h1>
      </header>
      <SearchPanel onSearch={this.onSearch} />
      {/* <p className="App-intro">
        To get started, edit <code>src/App.js</code> and save to reload.
        </p> */}

      <h2> Search </h2>

      {this.state.artists.length > 0 && <section> <h2> Artists </h2><ResultList results={this.state.artists} onItemClick={this.onArtistClick} </section>/>}

      {this.state.albums.length > 0 && <section> <h2> Albums </h2> <ResultList results={this.state.albums} onItemClick={this.onAlbumClick} </section> />}

      {this.state.tracks.length > 0 && <section>  <h2> Tracks </h2> <ResultList results={this.state.tracks} onItemClick={this.onTrackClick} </section> />}


      </div>
    );
  }
}



export default App;
