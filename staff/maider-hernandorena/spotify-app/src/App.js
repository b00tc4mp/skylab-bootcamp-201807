import React, { Component } from 'react'
import logo from './spotify.png'
import './App.css'
import logic from './logic'
import Landing from './components/Landing'
import Register from './components/Register'
import Login from './components/Login'
import GoToLogin from './components/GoToLogin'
import Main from './components/Main'

logic.spotifyToken = 'BQC2ifAEVTSv5SW-HF6t04fWIxhjzlxj7mUqPDnSvLbBcCZa3SPoKgtL7qhYZ1UbCYMwClZvU_tfSgxryFg9YbmWzxSftfgvQxkYFxyaE3W0-_j0KUEX6ifQv0bTz_k4FJGUut-pSuGPVA'

class App extends Component {
  state = {
    registerActive: false,
    loginActive: false,
    goToLoginActive: false,
    loggedIn: logic.loggedIn
  }

  goToRegister = () => this.setState({ registerActive: true })

  goToLogin = () => this.setState({ loginActive: true })

  registerUser = (username, password) =>
    logic.registerUser(username, password)
      .then(() => this.setState({ goToLoginActive: true, registerActive: false }))
      .catch(() => {
        alert ('The username: ' + username + ', or the password: ' + password + ' you entered are not balid.')
      })

  loginUser = (username, password) =>
    logic.loginUser(username, password)
      .then(() => this.setState({ loggedIn: true, loginActive: false }))
      .catch(() => {
        alert ('Your username: ' + username + ', or your password: ' + password + ', is incorrect.')
      })

  goToLogin = () => this.setState({ loginActive: true, goToLoginActive: false })

  goToLogout = () => {
    this.setState({loggedIn: false})
    logic.logOut()
  }

  goToUpdate = (password, newUsername, newPassword) => {
    logic.updateUser(password, newUsername, newPassword)
  }

  goToDelete = () => {
    this.setState({loggedIn: false})
    const password = prompt('Enter password: ')
    logic.unregisterUser(password)
  }


  render() {
    const { state: { registerActive, loginActive, goToLoginActive, loggedIn } } = this

    return (
      <div className="App">
        <header className="App-header">
          <img src={logo} className="App-logo" alt="logo" />
          <h1 className="App-title">Spotify App</h1>
        </header>

        {!(registerActive || loginActive || goToLoginActive || loggedIn) && <Landing onRegister={this.goToRegister} onLogin={this.goToLogin} />}

        {registerActive && <Register onRegister={this.registerUser} />}

        {loginActive && <Login onLogin={this.loginUser} />}

        {goToLoginActive && <GoToLogin onLogin={this.goToLogin} />}

        {loggedIn && <Main onLogout={this.goToLogout} onUpdate={this.goToUpdate} onDelete={this.goToDelete}/>}

      </div>
    )
  }
}

export default App