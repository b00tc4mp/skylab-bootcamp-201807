import React, { Component } from 'react'
import './App.css'
import { Route } from 'react-router-dom'
import logic from './logic'
import Home from './components/pages/Home'
import Login from './components/pages/Login'
import MyFavs from './components/pages/MyFavs'
import Register from './components/pages/Register'
import Update from './components/pages/Update'
import Nav from './components/sections/Nav'
import Footer from './components/sections/Footer'

class App extends Component {

  state = {
    loggedIn: false,
    errorLogin: null,
    successLogin: null,
    errorRegister: null,
    successRegister: null,
    errorUpdate: null,
    successUpdate: null
  }


  onRegister = (username, password) => {

    logic.registerUser(username, password)
    .then(() => {
      this.setState({errorRegister: null, successRegister: true})
      this.props.history.push('/register')
    })
    .catch(({message}) => {
      this.setState({errorRegister: message})
    })
  }

  onLogin = (username, password) => {
    logic.loginUser(username, password)
    .then(this.setState({loggedIn: true, errorLogin: null, successLogin: true}))
    .catch(({message}) => this.setState({errorLogin: message}))
  }

  onUpdate = (password, newUsername, newPassword) => {
    logic.updateUser(password, newUsername, newPassword)
    .then(this.setState({errorUpdate: null, successUpdate: true}))
    .catch(({message}) => this.setState({errorUpdate: message}))
  }


  onLogout = () => {
    logic.logout();

    this.setState({loggedIn: false});
  }

  render() {
    const {errorLogin, successLogin, errorRegister, successRegister, errorUpdate, successUpdate} =  this.state
    const {onRegister, onLogin, onUpdate, onLogout} = this
    //const { state: {onRegister}, onRegister} = this

    return (
      <div className="App">
        <Nav onLogoutProp={onLogout}/>

        <Route path="/" exact render={() => <Home />} />
        <Route path="/login" exact render={() => <Login onLoginProp={onLogin} errorMsg={errorLogin} successMsg={successLogin}/>} />
        <Route path="/myfavs" exact component={MyFavs} />
        <Route path="/register" exact render={() => <Register onRegisterProp={onRegister} errorMsg={errorRegister} successMsg={successRegister}/>} />
        <Route path="/update" exact render={() => <Update onUpdateProp={onUpdate} username={logic.userUsername} errorMsg={errorUpdate} successMsg={successUpdate}/>} />

        <Footer />
      </div>
    );
  }
}

export default App;
