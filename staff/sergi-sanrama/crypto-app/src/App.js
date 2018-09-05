import React, { Component } from 'react';
import { Switch, Route, withRouter, Redirect } from 'react-router-dom'
import './App.css';
import Register from './components/Register'
import Login from './components/Login'
import Landing from './components/Landing'
import Market from './components/Market'
import Portfolio from './components/Portfolio'

class App extends Component {
  state = {
    email: sessionStorage.getItem('email') || '',
    token: sessionStorage.getItem('token') || ''
  } 

  handleLogin = (email, token) => {
    this.setState({
      email,
      token
    })

    sessionStorage.setItem('email', email)
    sessionStorage.setItem('token', token)
  }

  isLoggedIn = () => {
    return !!this.state.email
  }

  //TODO FRONT
  handleLogout = (e) => {
    e.preventDefault()
    this.setState({
      email:'',
      token:''
    })
    sessionStorage.clear()
  }

  render() {
    return <Switch>
    <Route exact path="/" render={() => this.isLoggedIn() ? <Redirect to="/market"/> : <Landing/>} />      
    <Route path="/user/authenticate" render={() => this.isLoggedIn() ? <Redirect to="/market"/> : <Login handleLogin={this.handleLogin}/>} />      
    <Route path="/user/register" render={() => this.isLoggedIn() ? <Redirect to="/market"/> : <Register/>} />      
    <Route path="/market" render={() => this.isLoggedIn() ? <Market handleLogout={this.handleLogout} email={this.state.email} token={this.state.token}/> : <Redirect to="/"/>} />      
    <Route path="/user/portfolio" render={() => this.isLoggedIn() ? <Portfolio handleLogout={this.handleLogout} email={this.state.email} token={this.state.token}/> : <Market /> } />
    </Switch>
  }

}


export default App;
