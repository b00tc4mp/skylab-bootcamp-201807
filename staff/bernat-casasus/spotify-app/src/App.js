import React, { Component } from 'react'
import logo from './logo.svg'
import './App.css'
import logic from './logic'
import Landing from './components/Landing'
import Register from './components/Register'
import Login from './components/Login'
import GoToLogin from './components/GoToLogin'
import Logout from './components/Logout'
import Main from './components/Main'
import AlertError from './components/AlertError';

logic.spotifyToken = 'BQCX1Sgb2R-wqiZpWwL555uhHLBgSelTOkFHdGm_NgjAnltOcvXQ53ORf10EFlnH2lnOY0Ukxc7descjJ1TBCukqpHxiSaVnHs4W_gfVAASx_U38Ufcfgtv0UHXinf8HFDPRnkUaZVaw'

class App extends Component {
  state = {
    registerActive: false,
    loginActive: false,
    goToLoginActive: false,
    loggedIn: logic.loggedIn,
    error: false
  }

  goToRegister = () => this.setState({ registerActive: true })

  goToLogin = () => this.setState({ loginActive: true })

  registerUser = (username, password) =>
    logic.registerUser(username, password)
      .then(() => this.setState({ goToLoginActive: true, registerActive: false,error:false }))
      .catch((err)=>{
        this.setState({error: err.message})
    })

  loginUser = (username, password) =>
    logic.loginUser(username, password)
      .then(() => this.setState({ loggedIn: true, loginActive: false, error:false }))
      .catch((err)=>{
          this.setState({error: err.message})
      })

  goToLogin = () => this.setState({ loginActive: true, goToLoginActive: false })

  logoutUser = () => {
    this.setState({loggedIn:false})
    logic.logout()
  }

  render() {
    const { state: { registerActive, loginActive, goToLoginActive, loggedIn,error } } = this

    return (
      <div className="App">
        <header className="App-header">
          <img src={logo} className="App-logo" alt="logo" />
          <h1 className="App-title">Spotify App</h1>
        </header>

        {!(registerActive || loginActive || goToLoginActive || loggedIn) && <Landing onRegister={this.goToRegister} onLogin={this.goToLogin} />}

        {registerActive && <Register onRegister={this.registerUser} />}

        {loginActive && <Login onLogin={this.loginUser} />}

        {error && <AlertError Alert={error}/>}

        {goToLoginActive && <GoToLogin onLogin={this.goToLogin} />}

        {loggedIn && <Main onLogoutUser = {this.logoutUser}/>}
      </div>
    )
  }
}

export default App
