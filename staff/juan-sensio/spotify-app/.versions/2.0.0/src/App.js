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
    profileActive: false,
    registerFailed: false,
    loginFailed: false,
    deleteStatus: 0
  }

  toggleRegister = () => this.setState({ landingActive: false, registerActive: this.state.registerActive ? false : true })
  toggleLogin = () => this.setState({ landingActive: false, loginActive: this.state.loginActive ? false : true })
  toggleProfile = () => this.setState({ profileActive: false, profileActive: this.state.profileActive ? false : true })

  registerUser = (username, password) => {
    logic.registerUser(username, password)
      .then(() => {
        this.toggleRegister()
        this.toggleLogin()
      })
      .catch(() => {
        console.log("bad register")
        this.setState({ registerFailed: true })
        setTimeout(() => {
          this.setState({ registerFailed: false, registerActive: false, landingActive: true })
        }, 2000)
      })
  }
  loginUser = (username, password) => {
    logic.loginUser(username, password)
      .then(() => this.toggleLogin())
      .catch(() => {
        console.log("bad login")
        this.setState({ loginFailed: true })
        setTimeout(() => {
          this.setState({ loginFailed: false, registerActive: false, landingActive: true, loginActive: false })
        }, 2000)
      })
  }
  deleteUser = (password) => {
    logic.unregisterUser(password)
      .then(() => {
        console.log("delete ok")
        this.setState({deleteStatus: 2})
        setTimeout(()=>this.setState({deleteStatus: 0, profileActive: false, landingActive: true}),2000)
      })
      .catch(() => {
        console.log("bad delete")
        this.setState({deleteStatus: 1})
        setTimeout(()=>this.setState({deleteStatus: 0}),2000)
      })
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
        {registerActive && <Register onRegister={this.registerUser} fail={this.state.registerFailed} />}
        {loginActive && <Login onLogin={this.loginUser} fail={this.state.loginFailed} />}
        {profileActive && <Profile onDelete={this.deleteUser} deleteStatus={this.state.deleteStatus}/>}
        {!(landingActive || (registerActive || loginActive)) && <Main />}
      </div>
    );
  }
}

export default App;
