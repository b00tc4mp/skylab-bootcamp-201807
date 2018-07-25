import React, { Component } from 'react'
import logo from './logo.svg'
import './App.css'
import logic from './logic'
import Landing from './components/Landing'
import Register from './components/Register'
import Login from './components/Login'
import GoToLogin from './components/GoToLogin'
import Main from './components/Main'

logic.spotifyToken = 'BQALQdM91bB94L46-LHYny5yzS4KSZW9NqhnaGrtf9Hi7Yvv9uVfcYKsgxqbYyrryQwM3JwzKEb8cmlygJ6d1jDyvsMg9hcsITVls5I1hT8BYJKAMjaXUDUBRYPLWIPnOumMJ_3zONiT0Jc2s4MU_9L3WR4toWsVrYL7HbSpPEPxmZh671nj0YUi0rV5_8Wl8XVzB1NPI4klyzhA-wnpZrt4yNr8naOTV6lrzaU7YOc16IC5q3s7Funj4EWCEsXaWbusHGy_rxw'

class App extends Component {
  state = {
    registerActive: false,
    loginActive: false,
    goToLoginActive: false,
    loggedIn: logic.loggedIn,
    errorLogin: null,
    errorRegister: null
  }

  goToRegister = () => this.setState({ registerActive: true, loginActive: false })

  goToLogin = () => this.setState({ loginActive: true })

  registerUser = (username, password) =>
    logic.registerUser(username, password)
      .then(() => this.setState({ goToLoginActive: true, registerActive: false }))
      .catch(({ message }) => this.setState({ errorRegister: message }))

  loginUser = (username, password) =>
    logic.loginUser(username, password)
      .then(() => this.setState({ loggedIn: true, loginActive: false }))
      .catch(({ message }) => this.setState({ errorLogin: message }))

  goToLogin = () => this.setState({ loginActive: true, goToLoginActive: false, error: null, registerActive: false })

  logoutUser = () => {
    logic.logout()

    this.setState({ loggedIn: false })
  }

  render() {
    const { state: { registerActive, loginActive, goToLoginActive, loggedIn, errorRegister, errorLogin }, goToRegister, goToLogin, registerUser, loginUser, logoutUser } = this

    return (
      <div className="App">
        <header className="App-header">
          <img src={logo} className="App-logo" alt="logo" />
          <h1 className="App-title">Spotify App</h1>
          {loggedIn && <button onClick={logoutUser}>Logout</button>}
        </header>

        {!(registerActive || loginActive || goToLoginActive || loggedIn) && <Landing onRegister={goToRegister} onLogin={goToLogin} />}

        {registerActive && <Register onRegister={registerUser} onGoToLogin={goToLogin} error={errorRegister} />}

        {loginActive && <Login onLogin={loginUser} onGoToRegister={goToRegister} error={errorLogin} />}

        {goToLoginActive && <GoToLogin onLogin={goToLogin} />}

        {loggedIn && <Main />}
      </div>
    )
  }
}

export default App
