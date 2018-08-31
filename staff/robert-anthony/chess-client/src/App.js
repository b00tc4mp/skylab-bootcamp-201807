import React, {Component} from 'react'
import {Switch, Link, Route, withRouter, Redirect} from 'react-router-dom'
import Landing from './components/Landing'
import Register from './components/Register'
import Login from './components/Login'
import Main from './components/Main'
import Games from './components/Games'
import socketIOClient from 'socket.io-client';

import logic from "./logic"
import NavBar from "./components/NavBar"
import Invite from "./components/Invite"

class App extends Component {

  constructor() {
    super()

    this.state = {
      nickname: sessionStorage.getItem('nickname') || '',

      token: sessionStorage.getItem('token') || '',

      users: JSON.parse(sessionStorage.getItem('users')) || [],

      error: "",

      currentGames: JSON.parse(sessionStorage.getItem('currentGames')) || [],
    }


    let nickname, token
    if (nickname = sessionStorage.getItem('nickname')) // we are returning from a page refresh
    {
      token = sessionStorage.getItem('token')
      console.log(`%c returning from page refresh and setting up socket listeners again ${nickname}`, 'background: blue; color: red');
      this.setupSocketListeners(nickname, token)  // add socket listeners again
    }
  }

  componentDidMount() {
    const {state: {nickname, token}} = this

    if (this.isLoggedIn()) this.getCurrentGamesForUser(nickname,token)

  }


  socket = null

  aliveInterval = null


  getCurrentGamesForUser = (nickname, token) => {
   return logic.getGamesForUser(nickname, token)
      .then(currentGames => {
        this.setState({currentGames})
        sessionStorage.setItem('currentGames', JSON.stringify(currentGames))
      })
      .catch(({message}) => this.setState({error: message}))
  }

  getUsersNotPlayingWith() {
    const usersAmPlayingWith = this.state.currentGames.map(game => game.opponent)
    return this.users.filter(user => usersAmPlayingWith.indexOf(user) === -1)
  }

  alivePing = () => {
    this.socket.emit('client alive', this.state.nickname)
  }

  onGetAllOnlineUsers = (token) => {
    logic.getOnlineUsers(token)
      .then(users => {
        sessionStorage.setItem('users', JSON.stringify(users))
        this.setState({users})

      })
      .catch(({message}) => this.setState({error: message}))

  }

  onRespondToGameRequest = (destination, gameID, answer) => {
    const {state: {nickname, token}} = this

    logic.respondToGameRequest(nickname, destination, gameID, answer, token)
      .then(_ => this.getCurrentGamesForUser(nickname, token))

  }

  onRequestGame = (destination) => {
    logic.requestGame(this.state.nickname, destination, this.state.token)
      .catch(({message}) => this.setState({error: message}))

  }

  componentWillUnmount = () => {
    if (this.aliveInterval) this.aliveInterval.clearInterval()
  }


  setupSocketListeners = (nickname, token) => {

    console.log(`%c setting up socket listeners ${nickname}`, 'background: yellow; color: darkblue');

    this.socket = socketIOClient('http://localhost:8080');
    if (this.socket) {

      this.socket.on(`error ${nickname}`, message => console.error(message))

      this.socket.on(`update to games ${nickname}`, () => {
        console.log(`%c update to games ${nickname}`, 'background: #222; color: #bada55');
        this.getCurrentGamesForUser(nickname,token)

      })

      this.socket.on('user disconnected', () => {
        if (this.state.token !== '') this.onGetAllOnlineUsers(this.state.token)
      })

      this.socket.on('user connected', () => {
        if (this.state.token !== '') this.onGetAllOnlineUsers(this.state.token)
      })

      this.socket.on('reconnect', (attemptNumber) => {
        console.error(`socket reconnect on client side, attemptNumber = ${attemptNumber}`)

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


  onLoggedIn = (nickname, token) => {
    this.setupSocketListeners(nickname, token)

    this.setState({nickname: nickname, token})
    this.socket.emit('authenticated', nickname)
    this.aliveInterval = setInterval(this.alivePing, 10 * 1000);
    this.onGetAllOnlineUsers(token)
    sessionStorage.setItem('nickname', nickname)
    sessionStorage.setItem('token', token)
    this.setState({token})
  }

  onGameMove = (move, gameID, opponent) => {
    const {state: {nickname, token}} = this
    logic.makeAGameMove(nickname, opponent, move, gameID, token)
      .then(res => console.log(`game move returned with ${res.message}`))
      .catch(({message}) => this.setState({error: message}))
  }

  onInviteUser = user => {
    const {state:{nickname,token}} = this
    logic.requestGame(this.state.nickname, user, this.state.token)
      .then(_ => this.getCurrentGamesForUser(nickname,token))
      .catch(({message}) => this.setState({error: message}))
  }


  isLoggedIn() {
    return !!this.state.nickname
  }

  onLogout = e => {
    e.preventDefault()
    // this.socket.emit('logout', this.state.nickname)
    this.setState({nickname: '', token: ''})
    if (this.aliveInterval) clearInterval(this.aliveInterval)
// removesocketlisteners!
    sessionStorage.clear()
  }

  render() {
    const {nickname, users, error, token, currentGames, gameRequester} = this.state

    return <div>
      <header>
        <NavBar isLoggedIn={this.isLoggedIn()} onLogout={this.onLogout}/>
      </header>

      <Switch>
        <Route exact path="/" render={() => this.isLoggedIn() ? <Redirect to="/games"/> : <Landing/>}/>
        <Route path="/register" render={() => this.isLoggedIn() ? <Redirect to="/games"/> : <Register/>}/>
        <Route path="/main" render={() => this.isLoggedIn() ?
          <Main
            users={users}
            onRequestGame={this.onRequestGame}
            nickname={nickname}
          /> : <Landing/>}/>
        <Route path="/games" render={() => this.isLoggedIn() ?
          <Games
            onGameMove={this.onGameMove}
            currentGames={currentGames}
            users={users}
            onRespondToGameRequest={this.onRespondToGameRequest}
            nickname={nickname}
          /> : <Landing/>}/>
        <Route path="/invite" render={() => this.isLoggedIn() ?
          <Invite
            onUserClick={this.onInviteUser}
            currentGames={currentGames}
            allUsers={users}
            nickname={nickname}
          /> : <Landing/>}/>
        <Route path="/login" render={() => this.isLoggedIn() ? <Redirect to="/games"/> :
          <Login onLoggedIn={this.onLoggedIn}/>}/>
      </Switch>

      <footer>
        {error && <p>{error}</p>}
      </footer>
    </div>
  }
}

export default withRouter(App)
