import React, { Component } from 'react'
import { Switch, Route, withRouter, Redirect } from 'react-router-dom'
import Landing from './components/Landing'
import Login from './components/Login'
import Contacts from './components/Contacts'
import Register from './components/Register'
import Notes from './components/Notes'


class App extends Component {
  state = {
    usermail: sessionStorage.getItem('usermail') || '',
    token: sessionStorage.getItem('token') || ''
  } 

  handleLogin = (usermail,token) => {
    this.setState({
      usermail,
      token
    })
    sessionStorage.setItem('usermail',usermail)
    sessionStorage.setItem('token',token)
    this.props.history.push('/notes')
  }

  isLoggedIn = () => {
    return !!this.state.usermail
  }

  handleLogout = (e) => {
    e.preventDefault()
    this.setState({
      usermail:'',
      token:''
    })
    sessionStorage.clear()
    // this.props.history.push("/")
  }

  render() {
    return <Switch>
        <Route exact path="/" render={() => this.isLoggedIn() ? <Redirect to="/notes"/> : <Landing/>} />      
        <Route path="/login" render={() => this.isLoggedIn() ? <Redirect to="/notes"/> : <Login handleLogin={this.handleLogin}/>} />      
        <Route path="/register" render={() => this.isLoggedIn() ? <Redirect to="/notes"/> : <Register/>} />      
        <Route path="/notes" render={() => this.isLoggedIn() ? <Notes handleLogout={this.handleLogout} usermail={this.state.usermail} token={this.state.token}/> : <Redirect to="/"/>} />      
        <Route path="/contacts" render={() => this.isLoggedIn() ? <Contacts handleLogout={this.handleLogout} usermail={this.state.usermail} token={this.state.token}/> : <Redirect to="/"/>} />    
      </Switch>
  }
}

export default withRouter(App)