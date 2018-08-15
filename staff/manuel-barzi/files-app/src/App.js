import React, { Component } from 'react'
import { Switch, Route, withRouter, Redirect } from 'react-router-dom'
import Landing from './components/Landing'
import Register from './components/Register'
import Login from './components/Login'
import Files from './components/Files'

class App extends Component {
  state = {
    username: ''
  }

  onLoggedIn = username => {
    this.setState({ username })

    this.props.history.push('/files')
  }

  isLoggedIn() {
    return !!this.state.username
  }

  render() {
    const { username } = this.state
    
    return <div className="full-height">
      <header>
        <h1 className={this.isLoggedIn() ? 'on' : 'off'}>FILES</h1>
      </header>

      <Switch>
        <Route exact path="/" render={() => this.isLoggedIn() ? <Redirect to="/files" /> : <Landing />} />
        <Route path="/register" render={() => this.isLoggedIn() ? <Redirect to="/files" /> : <Register />} />
        <Route path="/login" render={() => this.isLoggedIn() ? <Redirect to="/files" /> : <Login onLoggedIn={this.onLoggedIn} />} />
        <Route path="/files" render={() => this.isLoggedIn() ? <Files username={username} /> : <Redirect to="/" />} />
      </Switch>

      <footer>
        <span className="power on">&#x23FB;</span>
      </footer>
    </div>
  }
}

export default withRouter(App)
