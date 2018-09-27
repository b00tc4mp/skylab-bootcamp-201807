import React, { Component } from 'react';
import { Route, Redirect } from 'react-router-dom'
import logic from './logic'
import Home from "./components/Home";
import NavBar from "./components/NavBar";
import Register from "./components/Register";
import Login from "./components/Login";
import Files from "./components/Files";

import "./App.css"
class App extends Component {


  state = {
    loggedIn: false,
    errorLogin: null,
    username:null
  }


  onLogin = (username, password) => {
    logic.authenticate(username, password)
      .then(() => {
        console.log("setting username to",username)
        this.setState({loggedIn: true, username:username,errorLogin: null})})
      .catch(({message}) => this.setState({errorLogin: message}))
  }

  render() {

    const {state :{loggedIn,username, errorLogin} }= this
    return(
      <div className="screen">
        <NavBar isLoggedIn={loggedIn}  />
        <Route exact path="/" component={Home}/>
        <Route  path="/home" component={Home} />
        <Route  path="/files"  render={() =><Files username={username}/>} />
        <Route  path="/register" render={() => loggedIn ? <Redirect to="/home" /> : <Register/>} />
        <Route  path="/login" render={() => loggedIn ? <Redirect to="/files" /> : <Login errorLogin={errorLogin} onLogin={this.onLogin}/>} />




      </div>)
  }

}

export default App;
