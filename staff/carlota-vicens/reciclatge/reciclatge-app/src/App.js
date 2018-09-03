import React, { Component } from 'react';
import './App.css';
import logic from './logic'
import { Route, withRouter, Redirect } from 'react-router-dom'

import Landing from './components/Landing'
import Register from './components/Register'
import Login from './components/Login'
import Profile from './components/Profile'

class App extends Component {
  state = {
    loggedIn: logic.loggedIn
  }

  onRegister = () => this.props.history.push('/register')
  onLogin = () => this.props.history.push('/login')
  onUpdate = () => this.props.history.push('/profile')

  registerUser = (email, password) => {
    return logic.register(email, password)
      .then(() => this.onLogin())
  }

  loginUser = (email, password) => {
    return logic.login(email, password)
      .then(() => {
        this.setState({ loggedIn: true })
        this.goToHome()
      })
  }

  updateUser = (password, newEmail, newPassword) => {
    return logic.updateUser(password, newEmail, newPassword)
  }

  logout = () => {
    logic.logout()
    this.setState({ loggedIn: false })
    this.props.history.push('/')
  }

  render() {
    const {
      state: {
        loggedIn
      },
      onRegister, onLogin, registerUser, loginUser, updateUser, logout
    } = this
    return (
      <div className="App">
        <Route exact path="/" render={() => !loggedIn ? <Landing onRegister={onRegister} onLogin={onLogin} /> : <Redirect to="/home" />} />
        <Route path="/register" render={() => !loggedIn ? <Register onRegister={registerUser} onLogin={onLogin} /> : <Redirect to="/home" />} />
        <Route path="/login" render={() => !loggedIn ? <Login onLogin={loginUser} onRegister={onRegister} /> : <Redirect to="/home" />} />
       {/* <Route path="/home" render={() => loggedIn ? <Main onLogout={logout} /> : <Redirect to="/" />} />  */}
        <Route path="/profile" render={() => loggedIn ? <Profile onLogout={logout} updateUser={updateUser} /> : <Redirect to="/" />} /> 

      </div>
    );
  }
}

export default withRouter(App);
