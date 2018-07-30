import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';
import { Route, withRouter, Link, Redirect } from 'react-router-dom'
import NavBar from "./components/NavBar";
import HomePage from "./components/HomePage";
import SearchPage from "./components/SearchPage"
import FavouritesPage from "./components/FavouritesPage"
import UserPage from "./components/UserPage"
import { Button } from 'reactstrap';
import UserRegister from './components/UserRegister';
import ImageDisplayer from './components/ImageDisplayer';
import UserLogin from './components/UserLogin';


class App extends Component {
  state = {
    loggedIn:true
  }

  goToRegister = () => {}
  goToLogin = () => {}

  render() {

    const {loggedIn} = this.state;

    return(
      <div>
        <NavBar isLoggedIn={loggedIn}  />
        <Route exact path="/" component={HomePage}/>
        <Route  path="/home" component={HomePage} />
        <Route  path="/search" component={SearchPage  } />
        <Route  path="/user" render={() => loggedIn ? <UserPage/> : <Redirect to="/home" /> } />
        <Route  path="/register" render={() => loggedIn ? <Redirect to="/user" /> : <UserRegister/>} />
        <Route  path="/favourites" render={() => loggedIn ?  <FavouritesPage/> : <Redirect to="/user" /> } />
        <Route  path="/login" render={() => loggedIn ? <Redirect to="/user" /> : <UserLogin/>} />




      </div>)
  }

}

export default App;
