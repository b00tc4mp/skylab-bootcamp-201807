import React, { Component } from 'react'
import swal from 'sweetalert2'
import logo from './logo.svg'
import './App.css'
import logic from './logic'
import Landing from './components/Landing'
import Register from './components/Register'
import Login from './components/Login'
import GoToLogin from './components/GoToLogin'
import Main from './components/Main'
import Profile from './components/Profile'
import UpdateUser from './components/UpdateUser';
logic.spotifyToken = 'BQAl8S7DWlpqe4HZgbfQazhTWwypewdKrMtYGA7yDqg2deldLKYW91EhpJO3FJuSXxZLaas3p1NB81OT9WtPfKADxaouqpHKyJmB8A-MnF1McMPa5nYf5c5KqZ2D5QGT-JB3zHMcyMD7'


class App extends Component {
  state = {
    registerActive: false,
    loginActive: false,
    goToLoginActive: false,
    loggedIn: logic.loggedIn,
    errorLogin: null,
    errorRegister: null,
    errorUpdate: null,
    goToMain: true,
    goToProfile: null,
    goToUpdateSettings: null
  }

  goToRegister = () => this.setState({ registerActive: true, loginActive: false })

  goToLogin = () => this.setState({ loginActive: true })

  registerUser = (username, password) =>
    logic.registerUser(username, password)
      .then(() => this.setState({ goToLoginActive: true, registerActive: false }))
      .catch(({ message }) => this.setState({ errorRegister: message }))

  loginUser = (username, password) =>
    logic.loginUser(username, password)
      .then(() => {
        this.setState({ loggedIn: true, loginActive: false, goToMain: true })
        swal({
          title: 'Login Succesful!',
          width: 600,
          padding: '3em',
          background: '#fff url(https://78.media.tumblr.com/155fff0a8c45f385c6861c71e446536f/tumblr_nix7fraY4V1qf8w0bo1_1280.gif)',
          backdrop: `
            rgba(253,245,230,0.4)
            url("https://i.pinimg.com/originals/62/1a/15/621a15c85432d566db70ebbc524dbb79.jpg")
            center left
            no-repeat
          `
        })
      })
      .catch(({ message }) => this.setState({ errorLogin: message }))

  goToLogin = () => this.setState({ loginActive: true, goToLoginActive: false, error: null, registerActive: false })

  logoutUser = () => {
    logic.logout()

    this.setState({ loggedIn: false, goToProfile: false, goToUpdateSettings: false })
  }

  goProfile = () => this.setState({goToMain: false, goToProfile: true, goToUpdateSettings: false, errorUpdate: null})

  onClickUpdateSettings = () => this.setState({goToProfile: false, goToUpdateSettings: true})

  onUpdateSettings = (newUsername, password, newPassword) => {
    logic.updateUser(newUsername, password, newPassword)
        .then(()=> {
          
          this.setState({errorUpdate: null})
          swal({
            title: 'Cool! Your settings have been saved!',
            width: 600,
            padding: '3em',
            background: '#fff url(https://78.media.tumblr.com/155fff0a8c45f385c6861c71e446536f/tumblr_nix7fraY4V1qf8w0bo1_1280.gif)',
            backdrop: `
              rgba(0,0,123,0.4)
              url("https://vignette.wikia.nocookie.net/nyancat/images/e/e7/Nyancat.gif/revision/latest?cb=20130808073427")
              center left
              no-repeat
            `
          })
        
        })
        .catch(({ message }) => this.setState({ errorUpdate: message }))
  }

  goMain = ()=> this.setState({goToMain:true, goToProfile:false, goToUpdateSettings:false})
  render() {
    const { state: { registerActive, loginActive, goToLoginActive, loggedIn, errorRegister, errorLogin,goToMain, goToProfile, goToUpdateSettings,errorUpdate }, goToRegister, goToLogin, registerUser, loginUser, logoutUser ,goProfile,onClickUpdateSettings, onUpdateSettings,goMain} = this

    return (
      <div className="App">
        <header className="App-header">
          <img src={logo} className="App-logo" alt="logo" />
          <h1 className="App-title">Spotify App</h1>
          {loggedIn && <button onClick={goMain}>Home</button>}
          {loggedIn && <button onClick={logoutUser}>Logout</button>}
          {loggedIn && <button onClick={goProfile}>Profile</button>}
        </header>

        {!(registerActive || loginActive || goToLoginActive || loggedIn) && <Landing onRegister={goToRegister} onLogin={goToLogin} />}

        {registerActive && <Register onRegister={registerUser} onGoToLogin={goToLogin} error={errorRegister} />}

        {loginActive && <Login onLogin={loginUser} onGoToRegister={goToRegister} error={errorLogin} />}

        {goToLoginActive && <GoToLogin onLogin={goToLogin} />}

        {loggedIn && goToProfile && <Profile userName = {logic._userUsername} onClickUpdate = {onClickUpdateSettings}/>}
        {loggedIn && goToUpdateSettings && <UpdateUser onClickSave={onUpdateSettings} error={errorUpdate}/>}

        {loggedIn && goToMain && <Main />}
      </div>
    )
  }
}

export default App
