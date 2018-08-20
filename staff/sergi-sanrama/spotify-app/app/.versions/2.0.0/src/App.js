import React, { Component } from 'react'
import logo from './logo.svg'
import './App.css'
import logic from './logic'
import Landing from './components/Landing'
import Register from './components/Register'
import Login from './components/Login'
import GoToLogin from './components/GoToLogin'
import Main from './components/Main'
import Profile from './components/Profile'

logic.spotifyToken = 'BQAl8S7DWlpqe4HZgbfQazhTWwypewdKrMtYGA7yDqg2deldLKYW91EhpJO3FJuSXxZLaas3p1NB81OT9WtPfKADxaouqpHKyJmB8A-MnF1McMPa5nYf5c5KqZ2D5QGT-JB3zHMcyMD7'

const PROFILE_UPDATE_OK = 'Profile updated correctly'

class App extends Component {
  state = {
    registerActive: false,
    loginActive: false,
    goToLoginActive: false,
    profileActive: false,
    mainActive: false,
    loggedIn: logic.loggedIn,
    errorLogin: null,
    errorRegister: null,
    errorUpdateProfile: null,
    successUpdateProfile: null
  }

  goToRegister = () => this.setState({ registerActive: true, loginActive: false })

  goToLogin = () => this.setState({ loginActive: true })

  registerUser = (username, password) =>
    logic.registerUser(username, password)
      .then(() => this.setState({ goToLoginActive: true, registerActive: false }))
      .catch(({ message }) => this.setState({ errorRegister: message }))

  loginUser = (username, password) =>
    logic.loginUser(username, password)
      .then(() => this.setState({ loggedIn: true, loginActive: false, mainActive: true }))
      .catch(({ message }) => this.setState({ errorLogin: message }))

  goToLogin = () => this.setState({ loginActive: true, goToLoginActive: false, error: null, registerActive: false })

  logoutUser = () => {
    logic.logout()

    this.setState({ loggedIn: false })
  }

  goToProfile = () => this.setState({ profileActive: true, mainActive: false })

  updateProfile = (password, newUsername, newPassword) => {
    logic.updateUser(password, newUsername, newPassword)
      .then(() => this.setState({ successUpdateProfile: PROFILE_UPDATE_OK, errorUpdateProfile: null }))
      .catch(({ message }) => this.setState({ errorUpdateProfile: message, successUpdateProfile: null }))
  }

  goToMain = () => this.setState({ mainActive: true, profileActive: false, errorUpdateProfile: null, successUpdateProfile: null })

  render() {
    const { state: { registerActive, loginActive, goToLoginActive, loggedIn, errorRegister, errorLogin, profileActive, errorUpdateProfile, successUpdateProfile, mainActive }, goToRegister, goToLogin, registerUser, loginUser, logoutUser, goToProfile, updateProfile, goToMain } = this

    return (
      <div className="App">
        <header className="App-header">
          <img src={logo} className="App-logo" alt="logo" />
          <h1 className="App-title">Spotify App</h1>
          {loggedIn && <a href="#/" onClick={goToMain}>Main</a>}
          &nbsp;
          {loggedIn && <a href="#/" onClick={goToProfile}>Profile</a>}
          &nbsp;
          {loggedIn && <a href="#/" onClick={logoutUser}>Logout</a>}
        </header>

        {!(registerActive || loginActive || goToLoginActive || loggedIn) && <Landing onRegister={goToRegister} onLogin={goToLogin} />}

        {registerActive && <Register onRegister={registerUser} onGoToLogin={goToLogin} error={errorRegister} />}

        {loginActive && <Login onLogin={loginUser} onGoToRegister={goToRegister} error={errorLogin} />}

        {goToLoginActive && <GoToLogin onLogin={goToLogin} />}

        {loggedIn && mainActive && !profileActive && <Main />}

        {loggedIn && profileActive && <Profile username={logic.userUsername} onUpdate={updateProfile} error={errorUpdateProfile} success={successUpdateProfile} />}
      </div>
    )
  }
}

export default App
