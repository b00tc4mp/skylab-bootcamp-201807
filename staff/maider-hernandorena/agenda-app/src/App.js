import React, { Component } from 'react'
import { Switch, Route, withRouter, Redirect } from 'react-router-dom'
import Landing from './components/Landing'
import Register from './components/Register'
import Login from './components/Login'
import Agenda from './components/Agenda'
import Profile from './components/Profile'
import Notes from './components/Notes'
import Contacts from './components/Contacts'

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
        <a href={`/#/user/${username}/notes`}>Notes</a>
        <a href={`/#/user/${username}/contacts`}>Contacts</a>
        <a href={`/#/user/${username}/profile`}>Profile</a>
        <a href="" onClick={onLogout}>Logout</a>
  </nav> : <nav></nav> }

      <Switch>
        <Route exact path="/" render={() => this.isLoggedIn() ? <Redirect to="/agenda" /> : <Landing />} />
        <Route path="/register" render={() => this.isLoggedIn() ? <Redirect to="/agenda" /> : <Register />} />
        <Route path="/login" render={() => this.isLoggedIn() ? <Redirect to="/agenda" /> : <Login onLoggedIn={onLoggedIn} />} />
        <Route path="/agenda" render={() => this.isLoggedIn() ? <Agenda username={username} token={token}/> : <Redirect to="/" />} />
        <Route path="/user/:username/profile" render={() => this.isLoggedIn() ? <Profile username={username} token={token}/> : <Redirect to="/" />} />
        <Route path="/user/:username/notes" render={() => this.isLoggedIn() ? <Notes username={username} token={token}/> : <Redirect to="/" />} />
        <Route path="/user/:username/contacts" render={() => this.isLoggedIn() ? <Contacts username={username} token={token}/> : <Redirect to="/" />} />
      </Switch>

    </div>
  }
}

export default withRouter(App)
