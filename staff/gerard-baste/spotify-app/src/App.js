import React, { Component } from 'react'
import logo from './logo.svg'
import './App.css'
import logic from './logic'
import Landing from './components/Landing'
import Register from './components/Register'
import Login from './components/Login'
import GoToLogin from './components/GoToLogin'
import Main from './components/Main'
import LoginError from './components/LoginError'
import RegisterError from './components/RegisterError'
import LogOut from './components/LogOut'

logic.spotifyToken = 'BQCkQAeHFF1hzC2tSLNMhuR-CXZY4wx-MeVhk3ez7tTmplS4-cnabDXy9ehws1TeupAoyHnBIof3NJizm9eFe_K9fnXlEdVe84Y3xwi_8BIEEZsRUWDoNRu0FfG1DZiFAYHhuvdK-XVr'

class App extends Component {
  state = {
    registerActive: false,
    loginActive: false,
    goToLoginActive: false,
    loggedIn: logic.loggedIn,
    errorLogin: false,
    errorRegister: false
  }

  goToRegister = () => this.setState({ registerActive: true })

  goToLogin = () => this.setState({ loginActive: true })

  registerUser = (username, password) =>
    logic.registerUser(username, password)
      .then(() => this.setState({ goToLoginActive: true, registerActive: false, errorRegister: false, }))
      .catch(() => {
        this.showErrorRegister()
      })

  loginUser = (username, password) =>
    logic.loginUser(username, password)
      .then(() => this.setState({ loggedOut:true, loggedIn: true, loginActive: false, errorLogin: false, errorRegister: false}))
      .catch(() => {
        // alert('Wrong Credentials')
        this.showError()
       
      })

  goToLogin = () => this.setState({ loginActive: true, goToLoginActive: false })

  showError = () => this.setState ({ errorLogin: true})

  showErrorRegister = () => this.setState ({ errorRegister: true})

  userLogedOut = () => {logic.logout()
  this.setState({loggedIn: false})
  }

  render() {
    const { state: { registerActive, loginActive, goToLoginActive, loggedIn, loggedOut, errorLogin, errorRegister } } = this

    return (
      <div className="App">
        <header className="App-header">
          <img src={logo} className="App-logo" alt="logo" />
          <h1 className="App-title">Spotify App</h1>
          {loggedIn && <LogOut  userLogedOut={this.userLogedOut}/>}
        </header>

        {!(registerActive || loginActive || goToLoginActive || loggedIn || errorLogin || errorRegister) && <Landing onRegister={this.goToRegister} onLogin={this.goToLogin} />}


        {registerActive && <Register onRegister={this.registerUser} />}

        {loginActive && <Login onLogin={this.loginUser} />}

        {goToLoginActive && <GoToLogin onLogin={this.goToLogin} />}

        {errorLogin && <LoginError  />}

        {errorRegister && <RegisterError  />}

        {loggedIn && <Main />}

        {/* {loggedOut && <LogOut  />} */}
        
      </div>
    )
  }
}

export default App