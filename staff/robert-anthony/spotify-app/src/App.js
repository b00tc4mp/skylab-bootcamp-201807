import React, {Component} from 'react'
import logo from './logo.svg'
import './App.css'
import logic from './logic'
import Landing from './components/Landing'
import Register from './components/Register'
import Login from './components/Login'
import GoToLogin from './components/GoToLogin'
import Main from './components/Main'
import UpdateUserData from "./components/UpdateUserData";

logic.spotifyToken = 'BQD4-bYbhnV0CzcGZaNEmNOfaLaCDSAVdMA1rb7lhyTKMEBU8kRle4ybywZnrZ0jtyhQDuccrIo7PPgkzV_9r9Pet_JUHNBXvByhj7Lp9huTIpBXaSPBYtxNQ6lgSOYQ3L4KDN5jPoZt'

class App extends Component {
  state = {
    registerActive: false,
    loginActive: false,
    goToLoginActive: false,
    updateUserActive: false,
    loggedIn: logic.loggedIn,
    errorLogin: null,
    errorRegister: null,
    errorUpdateUserData: null
  }

  goToRegister = () => this.setState({registerActive: true, loginActive: false})


  registerUser = (username, password) =>
    logic.registerUser(username, password)
      .then(() => this.setState({goToLoginActive: true, registerActive: false}))
      .catch(({message}) => this.setState({errorRegister: message}))

  loginUser = (username, password) =>
    logic.loginUser(username, password)
      .then(() => this.setState({loggedIn: true, loginActive: false}))
      .catch(({message}) => this.setState({errorLogin: message}))

  goToLogin = () => this.setState({loginActive: true, goToLoginActive: false, error: null, registerActive: false})

  logoutUser = () => {
    logic.logout()

    this.setState({loggedIn: false})
  }

  doUpdateUserData = (password,newUsername,newPassword) => {
    this.setState({updateUserActive: true})
    logic.updateUser(password,newUsername,newPassword)
      .then((res) => {
        if (res)
        {
          this.setState({ updateUserActive: false,errorUpdateUserData:null})
        }
        })
      .catch(({message}) => this.setState({errorUpdateUserData: message}))
  }

  cancelUpdateUserData = () => {
    this.setState({updateUserActive: false,errorUpdateUserData:null})

  }

  showUpdateUserData = () => this.setState({updateUserActive:true})



  render() {
    const {state: {registerActive, loginActive, goToLoginActive, loggedIn, errorRegister, errorLogin, updateUserActive, errorUpdateUserData}, cancelUpdateUserData,showUpdateUserData,doUpdateUserData, goToRegister, goToLogin, registerUser, loginUser, logoutUser} = this

    return (
      <div className="App">
        <header className="App-header">
          <img src={logo} className="App-logo" alt="logo"/>
          <h1 className="App-title">Spotify App</h1>
          {(loggedIn && !updateUserActive) && <button onClick={logoutUser}>Logout</button>}
          {(loggedIn && !updateUserActive) && <button onClick={showUpdateUserData}>Update User Data</button>}
        </header>

        {!(registerActive || loginActive || goToLoginActive || loggedIn) &&
        <Landing onRegister={goToRegister} onLogin={goToLogin}/>}

        {registerActive && <Register onRegister={registerUser} onGoToLogin={goToLogin} error={errorRegister}/>}

        {loginActive && <Login onLogin={loginUser} onGoToRegister={goToRegister} error={errorLogin}/>}

        {goToLoginActive && <GoToLogin onLogin={goToLogin}/>}

        {updateUserActive && <UpdateUserData onChangeUserData={doUpdateUserData} onCancel={cancelUpdateUserData} error={errorUpdateUserData}/>}

        {(loggedIn && !updateUserActive) && <Main/>}
      </div>
    )
  }
}

export default App
