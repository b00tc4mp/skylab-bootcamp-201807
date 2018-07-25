import React, { Component } from 'react'
import logo from './spotify.png'
import './app.css'
import logic from './logic'
import Landing from './components/Landing'
import Register from './components/Register'
import Login from './components/Login'
import GoToLogin from './components/GoToLogin'
import Main from './components/Main'

logic.spotifyToken = 'BQBstulcPzGgHxJCL173oWWfc6KIpu8tMdbftX9Fbmmt806NYY6DfA0Y-5CaKfW9vVSwy1LV1WeaFagyBmUSk0Po5CX__EsFG-ak8CL7zlskitbkieAYB2Sz-4EJDwc_cPoHEK3w8nshuA'

class App extends Component {
  state = {
    registerActive: false,
    loginActive: false,
    goToLoginActive: false,
    loggedIn: logic.loggedIn,
    loginWrong: null,
    registerWrong: null
  }

  goToRegister = () => this.setState({ registerActive: true, loginActive: false })

  goToLogin = () => this.setState({ loginActive: true })

  registerUser = (username, password) =>
    logic.registerUser(username, password)
      .then(() => this.setState({ goToLoginActive: true, registerActive: false }))
      .catch(({ message }) => this.setState({ registerWrong: message }))

  loginUser = (username, password) =>
    logic.loginUser(username, password)
      .then(() => this.setState({ loggedIn: true, loginActive: false }))
      .catch(({ message }) => this.setState({ loginWrong: message }))

  goToLogin = () => this.setState({ loginActive: true, goToLoginActive: false, registerActive: false, error: null })

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

        {loggedIn && <Main onLogout={goToLogout} onUpdate={goToUpdate} onDelete={goToDelete}/>}

      </div>
    )
  }
}

export default App