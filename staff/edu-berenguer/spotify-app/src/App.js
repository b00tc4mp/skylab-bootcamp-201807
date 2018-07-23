import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';
import SearchPanel from './components/SearchPanel';
import logic from './logic';
import ResultList from './components/ResultList';
import Player from './components/Player';

logic.token = 'BQDLKtsDpTzB_KOzEuKGAUElBrLxDkNSgkzudEM3vcaXZ_Coc3Z8TjQZqdgL4tPAOOTAGlhl51HmDoJZczzjPkoZWhT_ns1rFYjGB698zt9pJY9cxsUPAhDyVQdGuaytLU3j1q28Wp7nSkJc21A';

class App extends Component {

  state= {
    artists: [],
    albums: [],
    tracks: [],
    track: undefined
  }

  onSearch = query =>{
    logic.searchArtists(query)
      .then(artists  => {
          this.setState({
            artists: artists.map(artist => {
            return {
              id: artist.id, 
              text: artist.name
            }
            
          }),
          albums: [],
          tracks: [],
          track: undefined
      })
    })
      .catch(console.error);
  }

  onArtistClick = id => {
    logic.retrieveAlbumsByArtistId(id)
      .then(albums  => {
          this.setState({
            albums: albums.map(album => {
            return {
              id: album.id, 
              text: album.name
            }
            
          }),
          tracks: [],
          track: undefined
      })
    })
      .catch(console.error);
  }

  onAlbumClick = id => {
    logic.retrieveTracksByAlbumId(id)
      .then(tracks  => {
          this.setState({
            tracks: tracks.map(track => {
            return {
              id: 
              track.id, 
              text: track.name}
            
          }),
          track: undefined
          
      })
    })
      .catch(console.error);
  }

  onTrackClick = id =>{
    logic.retrieveTrackById(id)
      .then(track => {
          this.setState(
            {
              track:{
                    title: track.name, 
                    image: track.album.images[0].url, 
                    file: track.preview_url,
                    url: track.external_urls.spotify
            }
            
          })
      })
    .catch(console.error);
  }


  render() {
    return (
      <div className="App">
        <header className="App-header">
          <img src={logo} className="App-logo" alt="logo" />
          <h1 className="App-title">Welcome to Spotify App</h1>
        </header>
        <SearchPanel onSearch3={this.onSearch} />

        <ResultList results={this.state.artists} onItemClick={this.onArtistClick}/>
        <ResultList results={this.state.albums} onItemClick={this.onAlbumClick}/>
        <ResultList results={this.state.tracks} onItemClick={this.onTrackClick}/> 

        {this.state.track && <Player results={this.state.track}/> }

      </div>
    );
  }
}

export default App;
