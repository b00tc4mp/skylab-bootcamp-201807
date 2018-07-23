import React, {Component} from 'react';
import logo from './logo.svg';
import './App.css';
import SearchPanel from "./components/SearchPanel";
import ResultList from "./components/ResultsList";
import logic from "./logic/"

logic.token = "BQD-p8ZLOikW-sQYVC1K_o_n8L7ZegYpv14PYu1JodtDwiFYYiQKXOsTVrWI3PnRjoVHLdkMmwx2tFycb4h9BcKHrKt0FN-oT0GJbNHdHVkqLKLgnfIRG0Kq8TQJKyWGdXkNr-0_fbV7";

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
          artists: artists.map(({id,name:text}) => ({id,text}))

        })
      })
      .catch(console.error)
  };

  onArtistClick = (id)=> {
    logic.retrieveAlbumsByArtistId(id)
      .then(albums => {
        this.setState({

          albums: albums.map(({id,name:text}) => ({id,text}))
        })
      })
      .catch(console.error)
  };



  onAlbumClick = (id)=> {
    logic.retrieveTracksByAlbumId(id)
      .then(tracks => {
        console.log(tracks)
        this.setState({

          tracks: tracks.map(({id,name:text}) => ({id,text}))
        })
      })
      .catch(console.error)
  };

  render() {
    return (
      <div className="App">
        <SearchPanel onSearch={this.onSearch}/>
        <ResultList results={this.state.artists} onItemClick={this.onArtistClick}/>
        <ResultList results={this.state.albums} onItemClick={this.onAlbumClick}/>
        <ResultList results={this.state.tracks} />

      </div>
    );
  }
}

export default App;
