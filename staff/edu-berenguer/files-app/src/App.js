import React, { Component } from 'react';
import './App.css';
import HomePage from './components/HomePage'
import Register from './components/Register'
import Login from './components/Login'
import Files from './components/Files'
import { Switch, Route, withRouter, Redirect } from 'react-router-dom'
import logic from './logic'

class App extends Component {

  goToRegister = (event) => {
    event.preventDefault()
    this.props.history.push('/Register')
  }

  goToLogin = (event) => {
    event.preventDefault()
    this.props.history.push('/Login')
  }

  onRegister = (username,password) =>{
    logic.registerUser(username,password)
      .then(() => {
        this.props.history.push('/Login')
      })
  }

  onLogin = (userName,password) =>{
    logic.authUser(userName,password)
      .then(() => {
        this.props.history.push('/Files')
      })
  }


  render() {
    return (

      <Switch>
            <Route exact path="/" render={() => <HomePage onRegister={this.goToRegister} onLogin={this.goToLogin}/>}/>
            <Route path="/Register" render={() => <Register onRegister={this.onRegister}/>}/>
            <Route path="/Login" render={() => <Login onLogin={this.onLogin}/>}/>
            <Route path="/Files" render={() => <Files />}/>
      </Switch>
    );
  }
}

export default withRouter(App);
