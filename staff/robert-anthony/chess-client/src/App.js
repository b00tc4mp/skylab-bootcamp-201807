import React, {Component} from 'react'
import {Switch, Link, Route, withRouter, Redirect} from 'react-router-dom'
import Landing from './components/Landing'
import Register from './components/Register'
import Login from './components/Login'
import Main from './components/Main'

import getToday from './helpers/getToday'

class App extends Component {




  state = {
    username: sessionStorage.getItem('username') || '',
    token: sessionStorage.getItem('token') || '',
    currentDate: getToday()
  }


  onLoggedIn = (username, token) => {
    this.setState({username, token})

    sessionStorage.setItem('username', username)
    sessionStorage.setItem('token', token)

  }



  isLoggedIn() {
    return !!this.state.username
  }

  onLogout = e => {
    e.preventDefault()

    this.setState({username: '', token: ''})

    sessionStorage.clear()
  }

  render() {
    const {username, token,currentDate} = this.state

    return <div className="full-height">
      <header>
        {this.isLoggedIn() &&
        <nav><Link to="" onClick={this.onLogout}>logout</Link>
        </nav>}
      </header>

      <Switch>
        <Route exact path="/" render={() => this.isLoggedIn() ? <Redirect to="/main"/> : <Landing/>}/>
        <Route path="/register" render={() => this.isLoggedIn() ? <Redirect to="/main"/> : <Register/>}/>
        <Route path="/main" render={() => this.isLoggedIn() ? <Main/> : <Landing/>}/>
        <Route path="/login" render={() => this.isLoggedIn() ? <Redirect to="/main"/> :
          <Login onLoggedIn={this.onLoggedIn}/>}/>
      </Switch>

      <footer>
      </footer>
    </div>
  }
}

export default withRouter(App)
