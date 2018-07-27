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
import { Route, withRouter, Link, Redirect } from 'react-router-dom'

logic.spotifyToken = 'BQCGT5G8bMVjag5KSDhqsTOkXlMqu_MkSkVnm9QMCz0CZYVX58ieRRrSpBBreILMlEvOWvdw2hxcpQXZ4O07IAaasLnMUHWrKB_Pqto-aSvWXvNyPxQ7CNeXD8Gez4IKTAwBfenbovqF'

const PROFILE_UPDATE_OK = 'Profile updated correctly'

class App extends Component {
  state = {
    loggedIn: logic.loggedIn,
    justRegistered: false,
    errorLogin: null,
    errorRegister: null,
    errorUpdateProfile: null,
    successUpdateProfile: null
  }

  goToRegister = () => this.props.history.push('/register')

  goToLogin = () => {
    this.setState({ justRegistered: false })
    
    this.props.history.push('/login')
  }

  registerUser = (username, password) =>
    logic.registerUser(username, password)
      .then(() => {
        this.setState({ justRegistered: true })

        this.props.history.push('/registered')
      })
      .catch(({ message }) => this.setState({ errorRegister: message }))

  loginUser = (username, password) =>
    logic.loginUser(username, password)
      .then(() => {
        this.setState({ loggedIn: true })

        this.props.history.push('/home')
      })
      .catch(({ message }) => this.setState({ errorLogin: message }))

  logoutUser = event => {
    event.preventDefault()

    logic.logout()

    this.setState({ loggedIn: false })

    this.props.history.push('/')
  }

  updateProfile = (password, newUsername, newPassword) => {
    logic.updateUser(password, newUsername, newPassword)
      .then(() => this.setState({ successUpdateProfile: PROFILE_UPDATE_OK, errorUpdateProfile: null }))
      .catch(({ message }) => this.setState({ errorUpdateProfile: message, successUpdateProfile: null }))
  }

  render() {
    const { state: { loggedIn, errorRegister, errorLogin, errorUpdateProfile, successUpdateProfile, justRegistered }, goToRegister, goToLogin, registerUser, loginUser, logoutUser, updateProfile } = this

    return (
      <div className="App">
        <header className="App-header">
          <img src={logo} className="App-logo" alt="logo" />
          <h1 className="App-title">Spotify App</h1>
          <Route path="/(home|profile)" render={() => <nav>
            <Link to="/home">Main</Link>
            &nbsp;
              <Link to="/profile">Profile</Link>
            &nbsp;
              <a href="#/" onClick={logoutUser}>Logout</a>
          </nav>} />
        </header>

        <Route exact path="/" render={() => loggedIn ? <Redirect to="/home" /> : <Landing onRegister={goToRegister} onLogin={goToLogin} />} />

        <Route path="/register" render={() => loggedIn ? <Redirect to="/home" /> : <Register onRegister={registerUser} onGoToLogin={goToLogin} error={errorRegister} />} />

        <Route path="/login" render={() => loggedIn ? <Redirect to="/home" /> : <Login onLogin={loginUser} onGoToRegister={goToRegister} error={errorLogin} />} />

        <Route path="/registered" render={() => justRegistered ? <GoToLogin onLogin={goToLogin} /> : <Redirect to="/" />} />

        <Route path="/home" render={() => loggedIn ? <Main /> : <Redirect to="/" />} />

        <Route path="/profile" render={() => loggedIn ? <Profile username={logic.userUsername} onUpdate={updateProfile} error={errorUpdateProfile} success={successUpdateProfile} /> : <Redirect to="/" />} />
      </div>
    )
  }
}

export default withRouter(App)
