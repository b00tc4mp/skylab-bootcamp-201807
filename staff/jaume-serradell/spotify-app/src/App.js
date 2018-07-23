import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';
import SearchPanel from './components/SearchPanel';
import ResultList from './components/ResultList';
import TrackList from './components/TrackList';
import logic from './logic'

logic.token = 'BQDA9zh_7FyCYinVZCccFND7tfLDvYxMmiwqtDK6xebGsTQUZu92IeQDd1jKj1YF_vYo64kYa63hKon98RJ6SRJvhbtU66ydor2U-H3aimcVYN7bE6SxRiH0VoZHYm_ZnVAFH_5p000fjC38qs5Vbyk0aD3ecCbvtcgZyrYTu5McI8unO2mos444CIG1xXj0QA2k64IADa8esnGKPLV9GW12GC2lbiuTTFIaj1SKSDBZokkLU-GX1pUgG2ebgsNGXAppUlq-XPE';

class App extends Component {
  state = { 
    artists: [],
    albums: [],
    tracks: [],
    track: undefined 
  }
  
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

  //Método onArtistClick
  onArtistClick = id => {
    logic.retrieveAlbumsByArtistId(id)
      .then(albums => {
        this.setState({
          albums: albums.map(album => {
            return { id: album.id, text: album.name }
          })
        })
      })
      .catch(console.error)
  }

  //Método onAlbumClick
  onAlbumClick = id => {
    logic.retrieveTracksByAlbumId(id)
      .then(tracks => {
        this.setState({
          tracks: tracks.map(track => {
            return { id: track.id, text: track.name }
          })
        })
      })
      .catch(console.error)
  }

  onTrackClick = id => {
    logic.retrieveTrackById(id)
      .then(track => {
        this.setState({
          track: {
            title: track.name,
            image: track.album.images[0].url,
            file: track.preview_url,
            link: track.external_urls.spotify
          }
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
        
        {/* Componente SearchPanel con su propiedad onSearch */}
        <SearchPanel onSearch={this.onSearch} />

        <ResultList results={this.state.artists} onItemClick={this.onArtistClick} />

        <ResultList results={this.state.albums} onItemClick={this.onAlbumClick} />

        <ResultList results={this.state.tracks} onItemClick={this.onTrackClick} />

        {this.state.track && <TrackList results={this.state.track}/>}
        
      </div>
    );
  }
}

export default App;
