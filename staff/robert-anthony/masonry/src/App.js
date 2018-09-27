import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';
import Gallery from './Gallery'

const images = []

for (let i= 0; i<30; i++) {
    images.push("https://picsum.photos/200/300")
}
class App extends Component {


  render() {
    return (
      <div className="App">
        <header className="App-header">
          <img src={logo} className="App-logo" alt="logo" />
          <h1 className="App-title">Welcome to React</h1>
        </header>
       <Gallery elements={images}/>

      </div>
    );
  }
}

export default App;
