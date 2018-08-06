import React, {Component} from 'react';
import logo from './logo.svg';
import './App.css';
import SearchPanel from "./components/SearchPanel";
import ResultList from "./components/ResultsList";
import TrackPlayer from "./components/TrackPlayer";
import logic from "./logic/"

logic.token = "BQAePkMCleE54oLLNo47WXe3gRc0nB1vDJQnjsR4cZ8Wx_SQdG2XoBdwH28PWsimLr-d-pTlatBKBOFMrQo7tW8knYmIlYmMw1pNcJwLNV5ITatKq7sgyU4S2grxSK-ljzhqLYQbzR8o";

class App extends Component {
  constructor(props) {
    super(props)
    this.state = {artists: [],albums:[],tracks:[],
      track: undefined /* */};
  }

  onSearch = (query) => {
    // console.log("in app",query);
    logic.searchArtists(query)
      .then(artists => {

        this.setState({
        /*  artists: artists.map(artist => {
            return {id: artist.id, text: artist.name}
          })*/
          artists: artists.map(({id,name:text}) => ({id,text})),
          albums:[],
          tracks:[],
          track:undefined
        })
      })
      .catch(console.error)
  };

  onArtistClick = (id)=> {
    logic.retrieveAlbumsByArtistId(id)
      .then(albums => {
        this.setState({
          albums: albums.map(({id,name:text}) => ({id,text})),
          tracks:[],
          track:undefined
        })
      })
      .catch(console.error)
  };



  onAlbumClick = (id)=> {
    logic.retrieveTracksByAlbumId(id)
      .then(tracks => {
        this.setState({
          tracks: tracks.map(({id,name:text}) => ({id,text})),
          track:undefined
        })
      })
      .catch(console.error)
  };


  onTrackClick = (id)=> {
    logic.retrieveTrackById(id)
      .then(track => {
        this.setState({
          track: {
            title: track.name,
            image: track.album.images[0].url,
            file: track.preview_url,
            url: track.external_urls.spotify
          }
        })
      })
      .catch(console.error)
  };

  render() {
    return (
      <div className="App">
        <SearchPanel onSearch={this.onSearch}/>
        {this.state.artists && <ResultList results={this.state.artists} onItemClick={this.onArtistClick}/>}
        { this.state.albums &&<ResultList results={this.state.albums} onItemClick={this.onAlbumClick}/>}
       { this.state.tracks && <ResultList results={this.state.tracks} onItemClick={this.onTrackClick} />}
        {this.state.track && <TrackPlayer track={this.state.track} />}
      </div>
    );
  }
}

export default App;
