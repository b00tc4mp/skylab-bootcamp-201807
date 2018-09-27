import React, { Component } from 'react';
import './App.css';
import logic from './logic'
import { Route, withRouter, Redirect } from 'react-router-dom'

import Landing from './components/Landing'
import Register from './components/Register'
import Login from './components/Login'
import Profile from './components/Profile'
import Main from './components/Main'
import Container from './components/Container'
import PuntVerd from './components/PuntVerd'
import Navbar from './components/NavBar'



class App extends Component {
  state = {
    loggedIn: logic.loggedIn,
    container: null,
    namecontainer: null
  }

  onRegister = () => this.props.history.push('/register')
  onLogin = () => this.props.history.push('/login')
  goToProfile = () => this.props.history.push('/profile')
  goToHome = () => this.props.history.push('/home')
  goToMap = () => this.props.history.push('/puntverd')


  registerUser = (email, password) => {
    return logic.register(email, password)
      .then(() => this.onLogin())
  }

  loginUser = (email, password) => {
    return logic.login(email, password)
      .then(() => {
        this.setState({ loggedIn: true })
        this.goToHome()
      })
  }

  updateUser = (email, password, newPassword) => {
    return logic.update(email, password, newPassword)
  }

  logout = () => {
    logic.logout()
    this.setState({ loggedIn: false })
    this.props.history.push('/')
  }

  uploadImage = data => {
    return logic.upload(data)
      .then(({ data }) => {
        this.setState({
          namecontainer: data
        })
        return data
      })
  }

  deleteUser = (password) => {
    return logic.delete(password)
      .then(() => this.setState({ loggedIn: false }))
  }

  render() {
    const {
      state: {
        loggedIn
      },
      onRegister, onLogin, registerUser, loginUser, updateUser, logout, uploadImage, deleteUser, goToProfile, goToHome, goToMap
    } = this
    return (
      <div className="App">
        <Route exact path="/" render={() => !loggedIn ? <Landing onRegister={onRegister} onLogin={onLogin} /> : <Redirect to="/home" />} />
        <Route path="/register" render={() => !loggedIn ? <Register onRegister={registerUser} onLogin={onLogin} /> : <Redirect to="/home" />} />
        <Route path="/login" render={() => !loggedIn ? <Login onLogin={loginUser} onRegister={onRegister} /> : <Redirect to="/home" />} />
        <Route path="/home" render={() => loggedIn ? <Main upload={uploadImage} /> : <Redirect to="/" />} />
        <Route path="/profile" render={() => loggedIn ? <Profile onLogout={logout} updateUser={updateUser} deleteUser={deleteUser} /> : <Redirect to="/" />} />
        <Route path="/container" render={() => loggedIn ? <Container namecontainer={this.state.namecontainer} /> : <Redirect to="/home" />} />
        <Route path="/puntverd" render={() => loggedIn ? <PuntVerd /> : <Redirect to='/home' />} />
        {loggedIn && <Navbar profile={goToProfile} home={goToHome} puntverd={goToMap} />}
      </div>
    );
  }
}

export default withRouter(App);
