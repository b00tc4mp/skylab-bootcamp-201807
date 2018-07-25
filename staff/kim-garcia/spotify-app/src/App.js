import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';
import logic from './logic'
import Landing from './components/Landing'
import Register from './components/Register'
import Login from './components/Login'
import GoToLogin from './components/GoToLogin'
import Main from './components/Main'

logic.to = 'BQCI3EtKDakVB3OJGnbpgO35JZHmoMHVNUyWkv18HME4gsykv2g44D_-0bkrVCnQXqCEPEnJhjBYtvM3Kl1HGRh97Y3Y-JLoUJyCgvFJrs_c5mB_YFGQv6IGCp6Cxcn8KneyQK_L-DeJqizwwG3kRYJdnGc'
// class componenete listo/ stateful porque tienen estado (state). este hace la logica d pedir los datos y hacer cosas
class App extends Component {
  // guarda los datos de su componente
  state = {
    registerActive: false,
    loginActive: false,
    goToLoginActive: false,
    loggedIn: false
  }

  goToRegister = () => this.setState({ registerActive: true })

  goToLogin = () => this.setState({ loginActive: true })

  registerUser = (username, password) =>
    logic.registerUser(username, password)
      .then(() => this.setState({ goToLoginActive: true, registerActive: false }))
      .catch(console.error)

  loginUser = (username, password) =>
    logic.loginUser(username, password)
      .then(() => this.setState({ loggedIn: true, loginActive: false }))
      .catch(console.error)

  goToLogin = () => this.setState({ loginActive: true, goToLoginActive: false })

  render() {

    const { state: {
      registerActive,
      loginActive,
      goToLoginActive,
      loggedIn
    } } = this

    return (
      <div className="App">
        <header className="App-header">
          <img src={logo} className="App-logo" alt="logo" />
          <h1 className="App-title">SPOTIFY</h1>
        </header>

        {!(registerActive || loginActive || goToLoginActive || loggedIn) && <Landing onRegister={this.goToRegister} onLogin={this.goToLogin} />}

        {registerActive && <Register onRegister={this.registerUser} />}

        {loginActive && <Login onLogin={this.loginUser} />}

        {goToLoginActive && <GoToLogin onLogin={this.goToLogin} />}

        {loggedIn && <Main />}


      </div>

    )
  }
}

export default App
