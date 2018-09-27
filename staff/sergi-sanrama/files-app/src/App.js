import React, { Component } from 'react'
import { Switch, Route, withRouter, Redirect } from 'react-router-dom'
import Landing from './components/Landing'
import Register from './components/Register'
import Login from './components/Login'
import Files from './components/Files'

class App extends Component {
  state = {
    username: sessionStorage.getItem('username') || '',
    token: sessionStorage.getItem('token') || ''
  }

  onLoggedIn = (username, token) => {
    this.setState({ username, token })

    sessionStorage.setItem('username', username)
    sessionStorage.setItem('token', token)

    this.props.history.push('/files')
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

    return <div className="full-height">
      <header>
        <h1 className={this.isLoggedIn() ? 'on' : 'off'}>FILES</h1>
      </header>

      <Switch>
        <Route exact path="/" render={() => this.isLoggedIn() ? <Redirect to="/files" /> : <Landing />} />
        <Route path="/register" render={() => this.isLoggedIn() ? <Redirect to="/files" /> : <Register />} />
        <Route path="/login" render={() => this.isLoggedIn() ? <Redirect to="/files" /> : <Login onLoggedIn={this.onLoggedIn} />} />
        <Route path="/files" render={() => this.isLoggedIn() ? <Files username={username} token={token} onLogout={this.onLogout} /> : <Redirect to="/" />} />
      </Switch>

      <footer>
        <span className="power on">&#x23FB;</span>
      </footer>
    </div>
  }
}

export default withRouter(App)
