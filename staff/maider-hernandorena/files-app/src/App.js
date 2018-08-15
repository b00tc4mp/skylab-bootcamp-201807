import React, { Component } from 'react'
import './App.css'
import logic from './logic'
import Landing from './components/Landing'
import Register from './components/Register'
import Login from './components/Login'
import Main from './components/Main'
import { Route, withRouter, Redirect } from 'react-router-dom'


class App extends Component {

  state = {
    username: '',
    registerWrong: false,
    loginWrong: false
  }

  goToRegister = (event) => {
    event.preventDefault()
    this.props.history.push('/register')
  }

  goToLogin = (event) => {
    event.preventDefault()
    this.props.history.push('/login')
  }

  registerUser = (username, password) =>
    logic.register(username, password)
      .then(() => {
        this.props.history.push('/login')
      })
      .catch(({ message }) => this.setState({ registerWrong: message }))

  loginUser = (username, password) =>
    logic.authenticate(username, password)
      .then(() => {
        this.onLoggedIn(username)
        this.props.history.push('/home')
      })
      .catch(({ message }) => this.setState({ loginWrong: message }))

  onLoggedIn = username => {
    this.setState({ username })
    this.props.history.push('/home')
  }
  
  isLoggedIn() {
    return !!this.state.username
  }
    

  render() {
    const { state: { registerWrong, loginWrong, username }, goToRegister, goToLogin, loginUser, registerUser } = this

    return <div className="screen">
              <header>
                <h1>Files App</h1>
              </header>
              <Route exact path="/" render = {() => this.isLoggedIn() ? <Redirect to="/home" /> : <Landing onRegister={goToRegister} onLogin={goToLogin} />} /> 
              <Route path="/register" render = {() => this.isLoggedIn() ? <Redirect to="/home" /> : <Register onRegister={registerUser} error={registerWrong} linkToLogin={goToLogin}/>} /> 
              <Route path="/login" render = {() => this.isLoggedIn() ? <Redirect to="/home" /> : <Login onLogin={loginUser} error={loginWrong} linkToRegister={goToRegister} />} /> 
              <Route path="/home" render = {() => this.isLoggedIn() ? <Main username={username}/> : <Redirect to="/" />}  />
            </div>

  }
}

export default withRouter(App)
