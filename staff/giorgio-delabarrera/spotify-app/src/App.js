import React, { Component } from 'react'
import logo from './logo.svg'
import './App.css'
import logic from './logic'
import Landing from './components/Landing'
import Register from './components/Register'
import Login from './components/Login'
import GoToLogin from './components/GoToLogin'
import Main from './components/Main'
import ButtonLogout from './components/ButtonLogout';
import ErrorPanel from './components/ErrorPanel';

logic.spotifyToken = 'BQCX1Sgb2R-wqiZpWwL555uhHLBgSelTOkFHdGm_NgjAnltOcvXQ53ORf10EFlnH2lnOY0Ukxc7descjJ1TBCukqpHxiSaVnHs4W_gfVAASx_U38Ufcfgtv0UHXinf8HFDPRnkUaZVaw'

class App extends Component {
  state = {
    registerActive: false,
    loginActive: false,
    goToLoginActive: false,
    loggedIn: logic.loggedIn,
    errorMessages: []
  }

  goToRegister = () => this.setState({ registerActive: true })

  goToLogin = () => this.setState({ loginActive: true })

  registerUser = (username, password) =>
    logic.registerUser(username, password)
      .then(() => this.setState({ goToLoginActive: true, registerActive: false }))
      .catch(console.error)

  loginUser = (username, password) =>
    logic.loginUser(username, password)
      .then(() => {
        this.setState({ loggedIn: true, loginActive: false, errorMessages: [] })
      })
      .catch(({ message: errorMessage }) => {
        this.setState({ errorMessages: [] })
        const errorMessages = this.state.errorMessages
        errorMessages.push(errorMessage)
        this.setState({ 
          errorMessages: errorMessages
        })
      })

  goToLogin = () => this.setState({ loginActive: true, goToLoginActive: false })

  logout = () => {
    logic.logout()
    this.setState({loggedIn: logic.loggedIn})
  }

  render() {
    const { state: { registerActive, loginActive, goToLoginActive, loggedIn } } = this

    return (
      <div className="App">
        <header className="App-header">
          <img src={logo} className="App-logo" alt="logo" />
          <h1 className="App-title">Spotify App</h1>
          {loggedIn && <ButtonLogout onClick={this.logout}/>}
        </header>

        {!(registerActive || loginActive || goToLoginActive || loggedIn) && <Landing onRegister={this.goToRegister} onLogin={this.goToLogin} />}

        {registerActive && <Register onRegister={this.registerUser} />}

        {loginActive && <Login onLogin={this.loginUser} errors={this.state.errorMessages}/>}

        {goToLoginActive && <GoToLogin onLogin={this.goToLogin} />}

        {loggedIn && <Main />}
      </div>
    )
  }
}

export default App
