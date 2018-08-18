import React, { Component } from 'react'
import { Switch, Route, withRouter, Redirect } from 'react-router-dom'
import Landing from './components/Landing'
import Register from './components/Register'
import Login from './components/Login'
import Agenda from './components/Agenda'
import Profile from './components/Profile'

class App extends Component {
  state = {
    username: sessionStorage.getItem('username') || '',
    token: sessionStorage.getItem('token') || ''
  }

  onLoggedIn = (username, token) => {
    this.setState({ username, token })

    sessionStorage.setItem('username', username)
    sessionStorage.setItem('token', token)

    this.props.history.push('/agenda')
  }

  isLoggedIn() {
    return this.state.username
  }

  onLogout = e => {
    e.preventDefault()
    this.setState({ username: '', token: '' })
    sessionStorage.clear()
    this.props.history.push('/')
  }

  render() {
    const { state: {username, token}, onLoggedIn, onLogout } = this

    return <div>
      <header>
        <h1>AGENDA</h1>
      </header>

      { this.isLoggedIn() ? <nav className="flex">
        <a href="/#/agenda">Home</a>
        <a href="/#/notes">Notes</a>
        <a href="/#/contacts">Contacts</a>
        <a href={`/#/user/${username}`}>Profile</a>
        <a href="" onClick={onLogout}>Logout</a>
  </nav> : <nav></nav> }

      <Switch>
        <Route exact path="/" render={() => this.isLoggedIn() ? <Redirect to="/agenda" /> : <Landing />} />
        <Route path="/register" render={() => this.isLoggedIn() ? <Redirect to="/agenda" /> : <Register />} />
        <Route path="/login" render={() => this.isLoggedIn() ? <Redirect to="/agenda" /> : <Login onLoggedIn={onLoggedIn} />} />
        <Route path="/agenda" render={() => this.isLoggedIn() ? <Agenda username={username} token={token}/> : <Redirect to="/" />} />
        <Route path="/user/:username" render={() => this.isLoggedIn() ? <Profile username={username} token={token}/> : <Redirect to="/" />} />
      </Switch>

    </div>
  }
}

export default withRouter(App)
