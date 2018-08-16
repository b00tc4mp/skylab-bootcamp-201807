import React, { Component } from 'react'
import { Switch, Route, withRouter, Redirect } from 'react-router-dom'
import Landing from './components/Landing'
import Register from './components/Register'
import Login from './components/Login'
import Files from './components/Files'
import Profile from './components/Profile'

class App extends Component {
  state = {
    username: '',
    token: ''
  }

  onLoggedIn = (username, token) => {
    this.setState({ username, token })

    this.props.history.push('/files')
  }

  isLoggedIn() {
    return !!this.state.username
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
        <Route path="/files" render={() => this.isLoggedIn() ? <Files username={username} token={token} /> : <Redirect to="/" />} />
        <Route path="/user/:username/profile" render={() => this.isLoggedIn() ? <Profile username={username} token={token} /> : <Redirect to="/" />} />
      </Switch>

      <footer>
        <span className="power on">&#x23FB;</span>
      </footer>
    </div>
  }
}

export default withRouter(App)
