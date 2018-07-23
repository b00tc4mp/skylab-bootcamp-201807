import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';
import SearchPanel from'./components/SearchPanel';
import ResultList from './components/ResultList';
import logic from './logic'

logic.token = 'BQDzIGTQDpK5nFYYlmlyYxnk0yyXDsNmP84CcYV6x7uTtu39ScbekdiB0BpRhOQSOHQ1_YFHP_OAbR1E77QrRgqr3Xr-8flNbYU3W7KQ_1Z8ac5VVqAsCZV50C8ZhZuMG7_dozSBy_vzMUFwpMOCzVJX2ac'

class App extends Component {

  state = { artists: []}  //por primera vez se crea un array vacio

  onSearch = query => { 
    logic.searchArtists(query)
      .then(artists => {
        this.setState({artists: artists.map(artist=> { return { id: artist.id, text: artist.name}})})
      })
      .catch(console.error)
  }

  onArtistClick = () => {
    
  }

  onAlbumClick = id =>{

    
  }



  render() {
    return (
      <div className="App">
        <header className="App-header">
          <img src={logo} className="App-logo" alt="logo" />
          <h1 className="App-title">Welcome to My App</h1>
        </header>
        <br></br>
        <SearchPanel onSearch = {this.onSearch}/>  {/**instancia. A un componente hijo le pasamos cosas a traves de props*/}
        <ResultList results = {this.state.artists} onItemClick={this.onArtistClick}/>

            
      </div>
    );
  }
}

export default App;
