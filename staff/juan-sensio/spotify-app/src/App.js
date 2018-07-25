import React, { Component } from 'react';

import './App.css'

import logic from "./logic"

import Landing from './components/Landing'
import Register from './components/Register'
import Login from './components/Login'
import Profile from './components/Profile'
import Main from './components/Main'

class App extends Component {
  state = {
    registerActive: false,
    loginActive: false,
    landingActive: true,
    profileActive: false
  }

  toggleRegister = () => this.setState({ landingActive: false, registerActive: this.state.registerActive ? false : true })
  toggleLogin = () => this.setState({ landingActive: false, loginActive: this.state.loginActive ? false : true })
  toggleProfile = () => this.setState({ profileActive: false, profileActive: this.state.profileActive ? false : true })
  
  registerUser = (username, password) => {
    logic.registerUser(username, password)
    this.toggleRegister()
    this.toggleLogin()
  }
  loginUser = (username, password) => {
    logic.loginUser(username, password)
    this.toggleLogin()
  }

  render() {
    const { state: { registerActive, loginActive, landingActive, profileActive } } = this
    return (
      <div className="app">
        <header className="header">
          <h1 className="header__title">
            Spotify App
          </h1>
        </header>
        {!(landingActive || (registerActive || loginActive)) && <a href="#" onClick={this.toggleProfile}>profile</a>}
        {landingActive && <Landing onRegister={this.toggleRegister} onLogin={this.toggleLogin} />}
        {registerActive && <Register onRegister={this.registerUser} />}
        {loginActive && <Login onLogin={this.loginUser} />}
        {profileActive && <Profile />}
        {!(landingActive || (registerActive || loginActive)) && <Main />}
      </div>
    );
  }
}

export default App;
