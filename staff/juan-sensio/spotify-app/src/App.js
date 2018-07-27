import React, { Component } from 'react';

import logic from './logic'

import { Route, withRouter, Redirect } from 'react-router-dom'
import Landing from './components/Landing'
import Register from './components/Register'
import Login from './components/Login'
import Main from './components/Main'

class App extends Component {
  state = {
    registerFail: null,
    loginFail: null,
    loggedIn: logic.loggedIn
  }

  onRegister = () => this.props.history.push("/register")
  onLogin = () => this.props.history.push("/login")

  registerUser = (username, password) => {
    logic.registerUser(username, password)
      .then(() => {
        this.onLogin()
        this.setState({ registerFail: null })
      })
      .catch((err) => {
        this.setState({ registerFail: err.message })
      })
  }
  loginUser = (username, password) => {
    logic.loginUser(username, password)
      .then(() => {
        this.setState({ loginFail: null, loggedIn: true })
        this.goToApp()
      })
      .catch((err) => {
        this.setState({ loginFail: err.message })
      })
  }
  goToApp = () => this.props.history.push("/home")
  logout = () => {
    logic.logout()
    this.setState({ loggedIn: false })
    this.props.history.push("/")
  }

  render() {

    const {
      state: {
        registerFail,
        loginFail,
        loggedIn
      },
      onRegister,
      onLogin,
      registerUser,
      loginUser,
      logout
    } = this

    return (
      <div>
        <Route exact path="/" render={() => !loggedIn ? <Landing onRegister={onRegister} onLogin={onLogin} /> : <Redirect to="/home" />} />
        <Route path="/register" render={() => !loggedIn ? <Register onRegister={registerUser} fail={registerFail} onLogin={onLogin} /> : <Redirect to="/home" />} />
        <Route path="/login" render={() => !loggedIn ? <Login onLogin={loginUser} fail={loginFail} onRegister={onRegister} /> : <Redirect to="/home" />} />
        <Route path="/home" render={() => loggedIn ? <Main onLogout={logout} /> : <Redirect to="/" />} />
      </div>
    )
  }
}

export default withRouter(App);
