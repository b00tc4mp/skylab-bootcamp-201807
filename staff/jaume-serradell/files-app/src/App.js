// Dependencies
import React, { Component } from 'react';
import './App.css';
import { withRouter, Switch, Route } from 'react-router-dom';

import Register from './components/Register';
import Login from './components/Login';
import Landing from './components/Landing';
import Files from './components/Files';
import logic from './logic';
import GoToLogin from './components/GoToLogin'

// Assets

// Components

class App extends Component {
  state = {
    loggedIn: false,
    justRegistered: false,
    username: ''
  }

  goToRegister = () => this.props.history.push('/register')

  goToLogin = () => this.props.history.push('/login')

  registerUser = (username, password) =>
    logic.register(username, password)
      .then(() => {
        this.setState({ justRegistered: true })
        console.log('entro')
        this.props.history.push('/registered')
      })
      .catch(({ message }) => console.log('errorcito'))
  
  loginUser = (username, password) =>
    logic.authenticate(username, password)
      .then(() => {
        this.setState({ loggedIn: true, username})

        this.props.history.push('/files')
      })
      .catch(({ message }) => console.log('errorcito'))
  
  
  render() {

    const { state: { loggedIn, justRegistered, username }, goToRegister, goToLogin, registerUser, loginUser } = this;

    return (
      <div className="App">
        <Switch>
            <Route exact path='/' render={() => <Landing onRegister={goToRegister} onLogin={goToLogin} />} />
            <Route path='/register' render={() => <Register onRegister={registerUser} onLogin={goToLogin} />} />
            <Route path='/registered' render={() => <GoToLogin onLogin={goToLogin}/>} />
            <Route path='/login' render={() => <Login onLogin={loginUser} onGoToRegister={goToRegister} />} />
            <Route path='/files' render={() => <Files name={username}/>} />
        </Switch>
      </div>
    ); 
  }
}

export default withRouter(App);
