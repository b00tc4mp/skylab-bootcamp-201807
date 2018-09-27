import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';
import logic from './logic'
import Landing from './components/Landing'
import Register from './components/Register'
import Login from './components/Login'
import Home from './components/Home'
import { Switch, Route, withRouter } from 'react-router-dom'

class App extends Component {

  state = {
    list: []
  }

  goToRegister = () => {
    this.props.history.push('/register')
  }

  goToLogin = () => {
    this.props.history.push('/login')
  }

  registerUser = (username, password) =>
    logic.register(username, password)
      .then(() => {
        this.props.history.push('/login')
      })
  
  loginUser = (username, password) =>
      logic.authenticate(username, password)
        .then(() => {
          this.props.history.push('/home')
          this.listFiles(username)
        })
  
  listFiles = (username) => 
        logic.listFiles(username)
          .then(res => {
            this.setState({list: res})
          })
    
  render() {
    return (
      <div className="App">
        <Switch>
          <Route exact path="/" render={() => <Landing onLogin={this.goToLogin} onRegister={this.goToRegister}/>}/>
          <Route path="/register" render={() => <Register onRegister={this.registerUser} onGoToLogin={this.goToLogin}/>} />
          <Route path="/login" render={() => <Login onLogin={this.loginUser} onGoToRegister={this.goToRegister}/>} />
          <Route path="/home" render={() => <Home list={this.state.list}/>}/>
          </Switch>
      </div>
    );
  }
}

export default withRouter(App);
