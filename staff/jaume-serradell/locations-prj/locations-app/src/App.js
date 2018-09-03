import React, { Component } from 'react';
import { Switch, Route, withRouter, Redirect } from 'react-router-dom'
import Landing from './compoenents/Landing'
import Register from './compoenents/Register'
import Login from './compoenents/Login'
import Nav from './compoenents/Nav'

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

  handleLogout = (e) => {
    e.preventDefault()
    this.setState({
      email: '',
      token: ''
    })
    sessionStorage.clear()
  }



  render() {
    return <Switch>
      <Route exact path='/' render={() => this.isLoggedIn() ? <Redirect to='/' /> : <Landing />} />
      <Route path='/login' render={() => this.isLoggedIn() ? <Redirect to='/' /> : <Login handleLogin={this.handleLogin}/>}/>
      <Route path='/register' render={() => this.isLoggedIn() ? <Redirect to='/' /> : <Register />} />
      <Route path='/' />
      <Route path='/' />
    </Switch>
  }
}

export default withRouter(App)
