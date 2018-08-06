import React, { Component } from 'react'
import logo from './spotify.png'
import './App.css'
import logic from './logic'
import Landing from './components/Landing'
import Register from './components/Register'
import Login from './components/Login'
import GoToLogin from './components/GoToLogin'
import Main from './components/Main'

logic.spotifyToken = 'BQC0nHFGw5irtZp7xxhHEnPzPmvgQqvTMoOUa64z1OMFNlIp3bMA21Py7lhhIQx3cKuV-PAx4Mu5IPM-nms0D1TTrqYLQxJHteySBwYRCgaE320coKfAmYLS_DmedtwCu9oZ9DhIiDVAQA'

const profileUpdated = 'Profile updated correctly'

class App extends Component {
  state = {
    registerActive: false,
    loginActive: false,
    goToLoginActive: false,
    loggedIn: logic.loggedIn,
    loginWrong: null,
    registerWrong: null,
    goToMain: true,
    updateActive: null,
    updateWrong: null,
    updateOk: null
  }

  goToRegister = () => this.setState({ registerActive: true, loginActive: false })

  goToLogin = () => this.setState({ loginActive: true })

  registerUser = (username, password) =>
    logic.registerUser(username, password)
      .then(() => this.setState({ goToLoginActive: true, registerActive: false }))
      .catch(({ message }) => this.setState({ registerWrong: message }))

  loginUser = (username, password) =>
    logic.loginUser(username, password)
      .then(() => this.setState({ loggedIn: true, goToMain: true, updateActive: false, loginActive: false }))
      .catch(({ message }) => this.setState({ loginWrong: message }))

  goToLogin = () => this.setState({ loginActive: true, goToLoginActive: false, registerActive: false, error: null })

  goToLogout = () => {
    this.setState({loggedIn: false})
    logic.logOut()
  }

  goToUpdate = (password, newUsername, newPassword) => {
    logic.updateUser(password, newUsername, newPassword)
      .then(() => this.setState({ updateOk: profileUpdated }))
      .then(() => this.goToLogin())
      .then(() => this.setState({ updateActive: false }))
      .catch(({ message }) => this.setState({ updateWrong: message }))
  }

  goingToUpdate = () =>  this.setState({ goToMain: false, updateActive: true })
  
  gobackUpdate = () => {this.setState({goToMain: true})}

  goToDelete = () => {
    this.setState({loggedIn: false})
    const password = prompt('Enter password: ')
    logic.unregisterUser(password)
  }


  render() {
    const { state: { registerActive, loginActive, goToLoginActive, loggedIn, registerWrong, loginWrong }, goToRegister, goToLogin, goToLogout, goToDelete, goToUpdate, loginUser, registerUser } = this

    return (
      <div className="App">
        <header className="App__header">
          <img src={logo} className="App__header__logo" alt="logo" />
          <h1 className="App__header__title">Spotify App</h1>
        </header>

        {!(registerActive || loginActive || goToLoginActive || loggedIn) && <Landing onRegister={goToRegister} onLogin={goToLogin} />}

        {registerActive && <Register onRegister={registerUser} error={registerWrong} linkToLogin={goToLogin}/>}

        {loginActive && <Login onLogin={loginUser} error={loginWrong} linkToRegister={goToRegister} />}

        {goToLoginActive && <GoToLogin onLogin={goToLogin} />}

        {loggedIn && <Main onLogout={goToLogout} onUpdate={goToUpdate} goToMain={this.state.goToMain} gobackUpdate={this.gobackUpdate} updateActive={this.state.updateActive} onDelete={goToDelete} onUpdating={this.goingToUpdate}/>}

      </div>
    )
  }
}

export default App