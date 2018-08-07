import React, { Component } from 'react';

import logic from './logic'

import Landing from './components/Landing'
import Register from './components/Register'
import Login from './components/Login'
import Main from './components/Main'

class App extends Component {
  state = {
    landingActive: !logic.loggedIn,
    registerActive: false,
    loginActive: false,
    registerFail: null,
    loginFail: null,
    appActive: logic.loggedIn
  }

  onRegister = () => this.setState({
    landingActive: false,
    registerActive: true,
    loginActive: false
  })

  onLogin = () => this.setState({
    landingActive: false,
    loginActive: true,
    registerActive: false
  })

  registerUser = (username, password) => {
    logic.registerUser(username, password)
    .then(() => {
      this.onLogin()
      this.setState({registerFail: null})
    })
    .catch((err) => {
      this.setState({registerFail: err.message})
    })
  }

  loginUser = (username, password) => {
    logic.loginUser(username, password)
    .then(() => {
      this.setState({loginFail: null})
      this.goToApp()
    })
    .catch((err) => {
      this.setState({loginFail: err.message})
    })
  }

  goToApp = () => {
    this.setState({loginActive: false, appActive: true})
  }

  logout = () => {
    logic.logout()
    this.setState({landingActive: true, appActive: false})
  }

  render() {

    const {
      state: {
        landingActive,
        registerActive,
        loginActive,
        registerFail,
        loginFail,
        appActive
      },
      onRegister,
      onLogin,
      registerUser,
      loginUser,
      logout
    } = this

    return (
      <div>
        {landingActive && <Landing onRegister={onRegister} onLogin={onLogin}/>}
        {registerActive && <Register onRegister={registerUser} fail={registerFail} onLogin={onLogin}/>}
        {loginActive && <Login onLogin={loginUser} fail={loginFail} onRegister={onRegister}/>}
        {appActive && <Main onLogout={logout}/>}
      </div>
    );
  }
}

export default App;
