import React, {Component} from 'react'
import {Switch, Link, Route, withRouter, Redirect} from 'react-router-dom'
import Landing from './components/Landing'
import Register from './components/Register'
import Login from './components/Login'
import Main from './components/Main'
import socketIOClient from 'socket.io-client';

import getToday from './helpers/getToday'

class App extends Component {


  state = {
    username: sessionStorage.getItem('username') || '',
    token: sessionStorage.getItem('token') || '',
    users: JSON.parse(sessionStorage.getItem('users')) || [],
    currentDate: getToday(),
    amConnected: sessionStorage.getItem('amConnected') || false,
    receivedMessage: ""
  }


  socket = null


  componentDidMount = () => {

    this.setupSocketListeners()


  }

  setupSocketListeners = () => {
    this.socket = socketIOClient('http://localhost:8080');
    if (this.socket) {

      this.socket.on('all users', users => {
        this.setState({users})
        sessionStorage.setItem('users', JSON.stringify(users))
      })

      this.socket.on('error', message => console.error(message))

      this.socket.on('message received', (receivedMessage, cb) => {
        cb(null, `Message ${receivedMessage} received by ${this.state.username}`)
        this.setState({receivedMessage})
      })

      this.socket.on('connected remotely', () => {
        this.setState({amConnected: true})
        sessionStorage.setItem('amConnected', true)
      })

      this.socket.on('partner disconnected', () => {
        this.setState({amConnected: false})
        sessionStorage.setItem('amConnected', false)
      })

      this.socket.on('reconnect', (attemptNumber) => {
        console.error(`socket reconnect on client side, attemptNumber = ${attemptNumber}`)
        this.socket.emit('client has reconnected', this.state.username, (err, result) => {
          if (err) console.error(`Error on reconnecting client with server: ${err}, ${result}`)
          else {
            this.setState({amConnected:true})
            console.log(result)}
        })
      });

      this.socket.on('disconnect', (reason) => {
        console.error(`socket disconnect on client side, reason = ${reason}`)
        if (reason === 'io server disconnect') {
          // the disconnection was initiated by the server, you need to reconnect manually
          //   socket.connect();
        }
        // else the socket will automatically try to reconnect
      });

    } else console.error("Error establishing connection to socket server")

  }


  onLoggedIn = (username, token) => {
    this.setState({username, token})
    this.socket.emit('authenticated', username)
    sessionStorage.setItem('username', username)
    sessionStorage.setItem('token', token)
  }

  onUpdatePosition = position => {
    this.socket.emit('sent message', this.state.username, position, (err, result) => {
      if (err) console.error("Error on sending message", err)
      else console.log(result)
    })
  }

  setUpUsersConnection = (user) => {
    this.socket.emit('establish connection', this.state.username, user, (err, result) => {

      console.log(result)
      if (!err) this.setState({amConnected: true})
    })
  }

  isLoggedIn() {
    return !!this.state.username
  }

  onLogout = e => {
    e.preventDefault()
    this.socket.emit('logout', this.state.username)
    this.setState({username: '', token: ''})
    sessionStorage.clear()
  }

  render() {
    const {username, amConnected, users, receivedMessage, token} = this.state

    return <div className="full-height">
      <header>


        {this.isLoggedIn() &&
        <nav><Link to="" onClick={this.onLogout}>logout</Link>
        </nav>}
      </header>

      <Switch>
        <Route exact path="/" render={() => this.isLoggedIn() ? <Redirect to="/main"/> : <Landing/>}/>
        <Route path="/register" render={() => this.isLoggedIn() ? <Redirect to="/main"/> : <Register/>}/>
        <Route path="/main" render={() => this.isLoggedIn() ?
          <Main onUpdatePosition={this.onUpdatePosition} amConnected={amConnected}
                username={username} onUserClick={this.setUpUsersConnection} users={users}/> : <Landing/>}/>
        <Route path="/login" render={() => this.isLoggedIn() ? <Redirect to="/main"/> :
          <Login onLoggedIn={this.onLoggedIn}/>}/>
      </Switch>

      <footer>
      </footer>
    </div>
  }
}

export default withRouter(App)
