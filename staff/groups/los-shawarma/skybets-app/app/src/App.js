import React, { Component } from 'react';
import './App.css';
import { Route } from 'react-router-dom';
import Home from './components/pages/Home';
import Login from './components/pages/Login';
import MyFavs from './components/pages/MyFavs';
import Profile from './components/pages/Profile';
import Register from './components/pages/Register';
import Update from './components/pages/Update';

class App extends Component {
  render() {
    return (
      <div className="App">
        <Route path="/" exact component={Home} />
        <Route path="/login" exact component={Login} />
        <Route path="/myfavs" exact component={MyFavs} />
        <Route path="/profile" exact component={Profile} />
        <Route path="/register" exact component={Register} />
        <Route path="/update" exact component={Update} />
      </div>
    );
  }
}

export default App;
