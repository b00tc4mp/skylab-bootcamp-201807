import React, {Component} from 'react'
import {Switch, Link, Route, withRouter, Redirect} from 'react-router-dom'
import Landing from './components/Landing'
import Register from './components/Register'
import Login from './components/Login'
import Main from './components/Main'
import socketIOClient from 'socket.io-client';

import getToday from './helpers/getToday'

class App extends Component {

  socket = null


  componentDidMount = () => {

  this.setupSocketListeners()


  }

  setupSocketListeners = () => {
    this.socket = socketIOClient('http://localhost:8080');
    if (this.socket) {

      this.socket.on('all users',users => {
        this.setState({users})
        sessionStorage.setItem('users',JSON.stringify(users))
      })

      this.socket.on('error', message => console.error(message))

    } else console.error("Error establishing connection to socket server")

  }

  state = {
    username: sessionStorage.getItem('username') || '',
    token: sessionStorage.getItem('token') || '',
    users: JSON.parse(sessionStorage.getItem('users')) || [],
    currentDate: getToday(),
  }


  onLoggedIn = (username, token) => {
    this.setState({username, token})
    this.socket.emit('authenticated',username)
    sessionStorage.setItem('username', username)
    sessionStorage.setItem('token', token)
  }

  setUpUsersConnection = (user) => {
    this.socket.emit('establish connection',this.state.username,user,result =>{
      console.log(result)
    })
  }

  isLoggedIn() {
    return !!this.state.username
  }

  onLogout = e => {
    e.preventDefault()
    this.socket.close()
    this.setState({username: '', token: ''})
    sessionStorage.clear()
  }

  render() {
    const {username, token, currentDate} = this.state

    return <div className="full-height">
      <header>


        {this.isLoggedIn() &&
        <nav><Link to="" onClick={this.onLogout}>logout</Link>
        </nav>}
      </header>

      <Switch>
        <Route exact path="/" render={() => this.isLoggedIn() ? <Redirect to="/main"/> : <Landing/>}/>
        <Route path="/register" render={() => this.isLoggedIn() ? <Redirect to="/main"/> : <Register/>}/>
        <Route path="/main" render={() => this.isLoggedIn() ? <Main username={this.state.username} onUserClick={this.setUpUsersConnection} users={this.state.users}/> : <Landing/>}/>
        <Route path="/login" render={() => this.isLoggedIn() ? <Redirect to="/main"/> :
          <Login onLoggedIn={this.onLoggedIn}/>}/>
      </Switch>

      <footer>
      </footer>
    </div>
  }
}

export default withRouter(App)
