import React, { Component } from 'react'
import { Switch, Route, withRouter, Redirect } from 'react-router-dom'
import Landing from './components/Landing'
import Register from './components/Register'
import Login from './components/Login'
import home from './components/home'

class App extends Component {
  state = {
    username: sessionStorage.getItem('username') || '',
    token: sessionStorage.getItem('token') || ''
  }

  onLoggedIn = (username, token) => {
    this.setState({ username, token })

    sessionStorage.setItem('username', username)
    sessionStorage.setItem('token', token)

    this.props.history.push('/home')
  }

  isLoggedIn() {
    return !!this.state.username
  }

  onLogout = e => {
    e.preventDefault()

    this.setState({ username: '', token: '' })

    sessionStorage.clear()
  }

  render() {
    const { username, token } = this.state

    return <div className="">
      <Switch>
        <Route exact path="/" render={() => this.isLoggedIn() ? <Redirect to="/home" /> : <Landing />} />
        <Route path="/register" render={() => this.isLoggedIn() ? <Redirect to="/home" /> : <Register />} />
        <Route path="/login" render={() => this.isLoggedIn() ? <Redirect to="/home" /> : <Login onLoggedIn={this.onLoggedIn} />} />
        <Route path="/home" render={() => this.isLoggedIn() ? <home username={username} token={token} onLogout={this.onLogout} /> : <Redirect to="/" />} />
      </Switch>
    </div>
  }
}

export default withRouter(App)
