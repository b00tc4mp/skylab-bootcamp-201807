import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';
import SearchPanel from './components/SearchPanel';
import ResultList from './components/ResultList';
import TrackPanel from './components/TrackPanel';
import logic from './logic'
logic.token = 'BQDlWTEwHUxqa1Ba90EnDZk_yPv_SyhhV8gRgcm2RH6X5ZhzvTU6NwCntbsel90pkTbMmq_I9VMXsEQQqCyAG1WBYLPJe59fytXG9KHPHltfGYOQGh-fJNF3QNRqE8IbSQZJxBNtay9ZPlV39HYlVqAIpB5eJiXi41o'
class App extends Component {

  state = { artists: [], albums: [], tracks: [], track: {} }
  
  onSearch = query => {
    logic.searchArtists(query)
      .then(artists => {
        this.setState({
          artists: artists.map(({id, name:text}) => ({ id, text }))
          , albums:[],tracks:[],track:[]
        })
      })
      .catch(console.error)
  }

  onArtistClick = (id) =>{
    logic.retrieveAlbumsByArtistId(id)
      .then(albums =>{
          this.setState({
            albums: albums.map(({id, name:text}) =>({id, text}))
            ,tracks:[],track:[]
          })
      })
      .catch(console.error)
  }

  onAlbumClick = (id) =>{
    logic.retrieveTracksByAlbumId(id)
      .then(tracks =>{
        this.setState({
          tracks: tracks.map(({id, name:text}) => ({id, text}))
          ,track:[]
        })
      })
      .catch(console.error)
  }

  onTrackClick = (id) => {
    logic.retrieveTrackById(id)
        .then(track => {
          this.setState({
            track: {id: track.id, text: track.name, preview_url: track.preview_url}
          })
        })
        .catch(console.error)
  }

  render() {
    const {state: {artists, albums, tracks, track},onAlbumClick,onArtistClick,onSearch,onTrackClick} = this
    return (
      <div className="App">
        <header className="App-header">
          <img src={logo} className="App-logo" alt="logo" />
          <h1 className="App-title">Spotify App</h1>
        </header>
        <SearchPanel onSearch={onSearch} />
        <ResultList results={artists} onItemClick={onArtistClick} />
        <ResultList results={albums} onItemClick={onAlbumClick} />
        <ResultList results={tracks} onItemClick={onTrackClick} />
        <TrackPanel result={track} />
      </div>
    );
  }
}

export default App;
