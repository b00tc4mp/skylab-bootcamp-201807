import React, { Component } from 'react'
import logo from './logo.svg'
import './App.css'
import logic from './logic'
import Landing from './components/Landing'
import Register from './components/Register'
import Login from './components/Login'
import GoToLogin from './components/GoToLogin'
import Main from './components/Main'
import LogOut from './components/LogOut'

logic.spotifyToken = 'BQCkQAeHFF1hzC2tSLNMhuR-CXZY4wx-MeVhk3ez7tTmplS4-cnabDXy9ehws1TeupAoyHnBIof3NJizm9eFe_K9fnXlEdVe84Y3xwi_8BIEEZsRUWDoNRu0FfG1DZiFAYHhuvdK-XVr'

class App extends Component {
  state = {
    registerActive: false,
    loginActive: false,
    goToLoginActive: false,
    loggedIn: false,
    loggedOut: false
  }

  goToRegister = () => this.setState({ registerActive: true })

  goToLogin = () => this.setState({ loginActive: true })

  registerUser = (username, password) =>
    logic.registerUser(username, password)
      .then(() => this.setState({ goToLoginActive: true, registerActive: false }))
      .catch(console.error)

  loginUser = (username, password) =>
    logic.loginUser(username, password)
      .then(() => this.setState({ loggedOut: true, loggedIn: true, loginActive: false }))
      .catch(console.error)

  goToLogin = () => this.setState({ loginActive: true, goToLoginActive: false })

  // logOutHandler = () => {

  // }
      // .then(() => this.setState({ loggedOut: false, registerUser: true, loginActive: true }))

  render() {
    const { state: { registerActive, loginActive, goToLoginActive, loggedIn, loggedOut } } = this

    return (
      <div className="App">
        <header className="App-header">
          <img src={logo} className="App-logo" alt="logo" />
          <h1 className="App-title">Spotify App</h1>
        </header>

        {!(registerActive || loginActive || goToLoginActive || loggedIn) && <Landing onRegister={this.goToRegister} onLogin={this.goToLogin} />}

        {registerActive && <Register onRegister={this.registerUser} />}

        {loginActive && <Login  goToLogOut={}  onLogin={this.loginUser} />}

        {goToLoginActive && <GoToLogin onLogin={this.goToLogin} />}

        {loggedIn && <Main />}

        {loggedOut && <LogOut onLogOut={this.logOutHandler}/>}
      </div>
    )
  }
}

export default App
