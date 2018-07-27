import React, { Component } from 'react'
// import logo from './logo.svg'
import './App.css'
import logic from './logic'
import Landing from './components/Landing'
import Register from './components/Register'
import Login from './components/Login'
import GoToLogin from './components/GoToLogin'
import Main from './components/Main'
import UpdateUser from './components/UpdateUser'

logic.spotifyToken = 'BQAl8S7DWlpqe4HZgbfQazhTWwypewdKrMtYGA7yDqg2deldLKYW91EhpJO3FJuSXxZLaas3p1NB81OT9WtPfKADxaouqpHKyJmB8A-MnF1McMPa5nYf5c5KqZ2D5QGT-JB3zHMcyMD7'

class App extends Component {
  state = {
    registerActive: false,
    loginActive: false,
    goToLoginActive: false,
    loggedIn: logic.loggedIn,
    errorLogin: null,
    errorRegister: null,
    updateInformation: false
  }

  goToRegister = () => this.setState({ registerActive: true, loginActive: false })

  goToLogin = () => this.setState({ loginActive: true })

  registerUser = (username, password) =>
    logic.registerUser(username, password)
      .then(() => this.setState({ goToLoginActive: true, registerActive: false, errorLogin: null  }))
      .catch(({ message }) => this.setState({ errorRegister: message }))

  loginUser = (username, password) =>
    logic.loginUser(username, password)
      .then(() => this.setState({ loggedIn: true, loginActive: false,errorLogin: null  }))
      .catch(({ message }) => this.setState({ errorLogin: message }))

  goToLogin = () => this.setState({ loginActive: true, goToLoginActive: false, error: null, registerActive: false, errorLogin: null })

  goToUpdate = () => this.setState({updateInformation: true,loggedIn: false})

  onUpdate = (password, newUsername, newPassword) =>
    logic.updateUser(password, newUsername, newPassword)
      .then(() => this.setState({ updateInformation: false,loggedIn: true})) 

  logoutUser = () => {
    logic.logout()

    this.setState({ loggedIn: false })
  }

  render() {
    const { state: { registerActive, loginActive, goToLoginActive, loggedIn, errorRegister, errorLogin,updateInformation}, goToRegister, goToLogin, registerUser, loginUser, logoutUser, goToUpdate  } = this

    return (
      <div className="App">
        <header className="App-header">
          <img src={"https://developer.spotify.com/assets/branding-guidelines/icon4@2x.png"} className="App-logo" alt="logo" />
          <h1 className="App-title">Spotify App</h1>
          {loggedIn && <button onClick={logoutUser}>Logout</button>}
          {loggedIn && <button onClick={goToUpdate}>Update</button>}
        </header>

        {!(registerActive || loginActive || goToLoginActive || loggedIn || updateInformation ) && <Landing onRegister={goToRegister} onLogin={goToLogin} />}

        {registerActive && <Register onRegister={registerUser} onGoToLogin={goToLogin} error={errorRegister} />}

        {loginActive && <Login onLogin={loginUser} onGoToRegister={goToRegister} error={errorLogin} />}

        {updateInformation  && <UpdateUser onUpdate={this.onUpdate} error={errorRegister} />}

        {goToLoginActive && <GoToLogin onLogin={goToLogin} />}

        {loggedIn && <Main />}
      </div>
    )
  }
}

export default App