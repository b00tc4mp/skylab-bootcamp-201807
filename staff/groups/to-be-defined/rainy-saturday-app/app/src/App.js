import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';
import { Route, withRouter, Link, Redirect } from 'react-router-dom'
import NavBar from "./components/NavBar";
import HomePage from "./components/HomePage";
import SearchPage from "./components/SearchPage"
import UserPage from "./components/UserPage"
import { Button } from 'reactstrap';
import UserRegister from './components/UserRegister';
import ImageDisplayer from './components/ImageDisplayer';
import UserLogin from './components/UserLogin';


class App extends Component {

  render() {

    return(
      <div>
        <NavBar/>
        <HomePage/>
        <SearchPage/>
        <ImageDisplayer/>
        <UserPage/>
        <UserRegister/>
        <UserLogin/>



      </div>)
  }

}

export default App;
