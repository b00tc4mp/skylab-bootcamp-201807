import React, { Component } from 'react'
import './App.css'
import logic from './logic'
import Login from './components/pages/Login'
import Home from './components/pages/Home'
import MyFavs from './components/pages/MyFavs'
import Register from './components/pages/Register'
import Update from './components/pages/Update'
import Nav from './components/sections/Nav'
import Footer from './components/sections/Footer'
import { Route, withRouter, Link, Redirect } from 'react-router-dom'



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
    .catch(({message}) => this.setState({errorRegister: message}))
  }

  onLogin = (username, password) => {
    debugger;
    logic.loginUser(username, password)
    .then(() => {
      this.setState({loggedIn: true, errorLogin: null, successLogin: true})
      this.props.history.push('/login')
    })
    .catch(({message}) => {
      this.setState({errorLogin: message})
    })
  
  }

  onUpdate = (password, newUsername, newPassword) => {
    logic.updateUser(password, newUsername, newPassword)
    .then(() => {
      this.setState({errorUpdate: null, successUpdate: true})
      this.props.history.push('/update')
    })
    .catch(({message}) => this.setState({errorUpdate: message}))
  }


  onLogout = () => {
    logic.logout();

    this.setState({loggedIn: false});
  }

  render() {
    const {errorLogin, successLogin, errorRegister, successRegister, errorUpdate, successUpdate, loggedIn} =  this.state
    const {onRegister, onLogin, onUpdate, onLogout} = this

    return (
      <div className="App">
        <Nav onLogoutProp={onLogout}/>

        <Route path="/" exact render={() => <Home />} />
        <Route path="/login" exact render={() => <Login onLoginProp={onLogin} errorMsg={errorLogin} successMsg={successLogin}/>} />
        <Route path="/myfavs" exact render={() => loggedIn ? <MyFavs /> : <Redirect to="/login" />} /> 
        <Route path="/register" exact render={() => <Register onRegisterProp={onRegister} errorMsg={errorRegister} successMsg={successRegister}/>} />
        <Route path="/update" exact render={() => loggedIn ? <Update onUpdateProp={onUpdate} username={logic.userUsername} errorMsg={errorUpdate} successMsg={successUpdate}/> : <Redirect to="/login" />} />

        <Footer />
      </div>
    );
  }
}

export default withRouter(App);
