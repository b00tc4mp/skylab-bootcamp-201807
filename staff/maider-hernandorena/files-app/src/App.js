import React, { Component } from 'react'
import './App.css'
import logic from './logic'
import Landing from './components/Landing'
import Register from './components/Register'
import Login from './components/Login'
import Main from './components/Main'
import { Route, withRouter } from 'react-router-dom'


class App extends Component {

  state = {
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
        this.props.history.push('/home')
      })
      .catch(({ message }) => this.setState({ loginWrong: message }))


  render() {
    const { state: { registerWrong, loginWrong }, goToRegister, goToLogin, loginUser, registerUser } = this

    return (
      <div className="screen">
        <header>
          <h1>Files App</h1>
        </header>

        <Route exact path="/" render = {() => <Landing onRegister={goToRegister} onLogin={goToLogin} />} /> 

        <Route path="/register" render = {() => <Register onRegister={registerUser} error={registerWrong} linkToLogin={goToLogin}/>} /> 

        <Route path="/login" render = {() =><Login onLogin={loginUser} error={loginWrong} linkToRegister={goToRegister} />} /> 

        <Route path="/home" render = {() => <Main goToMain={this.state.goToMain} />} />

      </div>
    )
  }
}

export default withRouter(App)
