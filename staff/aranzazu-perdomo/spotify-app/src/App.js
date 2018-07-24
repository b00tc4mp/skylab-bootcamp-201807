import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';
import SearchPanel from './components/SearchPanel'
import logic from './logic'
import ResultList from './components/ResultList';


logic.token = 'BQAk_xBXnx8aS4GWbKQHbPeyYeSlnKrcOtZWS9cYxx6NcLjc6MNugHxxaUCDDjIyKHVjtYfZHcdL4Xz7l8CukXllfmgH6i_hSchFNZut6iQw-2jt3XvnfotKwcSZi24ajedwE9LnSrONVpN-WQPp2Lgtez5eLYyFPjMpQLrZv_G384g0f6RVoJ5ukd-GtTdEwu91EXyvdI6pPBgAxGE7ye5I9Q'

class App extends Component {
  state = { artists: [] }
  
  onSearch =query=>{

    logic.searchArtists(query)
    .then(artists =>{
      
      this.setState({
        artists: artists.map(artist=>{
          return {id:artist.id, text:artist.name}

        })
      
      
      
      
      
      
      })

    })
    .catch(console.error)
    
  }
  
  onArtist
  
  
  render() {
    return (
      <div className="App">
        <header className="App-header">
          <img src={logo} className="App-logo" alt="logo" />
          <h1 className="App-title">Spotify-app</h1>
        </header>
        <SearchPanel onSearch={this.onSearch}/>
       <ResultList results = {this.state.artists}/>
      </div>
    );
  }
}

export default App;
