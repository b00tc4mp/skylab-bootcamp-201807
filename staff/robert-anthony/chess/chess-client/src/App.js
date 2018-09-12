import React, {Component} from 'react'
import {Switch, Route, withRouter, Redirect} from 'react-router-dom'
import Register from './components/Register'
import Main from './components/Main'
import Login from './components/Login'
import Games from './components/Games'
import socketIOClient from 'socket.io-client';
import * as log from 'loglevel'

import logic from "./logic"
import NavBar from "./components/NavBar"
import Invite from "./components/Invite"
import {UncontrolledAlert} from 'reactstrap'

class App extends Component {

  socket = null

  needToUpdateGamesFlagFromSocketIO = false

  constructor() {
    let nickname, token

    super()
    log.setLevel('debug')
    this.state = {
      nickname: sessionStorage.getItem('nickname') || '',
      token: sessionStorage.getItem('token') || '',
      users: JSON.parse(sessionStorage.getItem('users')) || [],
      error: "",
      currentGames: JSON.parse(sessionStorage.getItem('currentGames')) || [],

    }

    if (sessionStorage.getItem('nickname')) // we are returning from a page refresh
    {
      nickname = sessionStorage.getItem('nickname')
      token = sessionStorage.getItem('token')
      this.setupSocketListeners(nickname, token)  // add socket listeners again
    }
  }

  clearError = () => this.setState({error: ''})

  onError = error => this.setState({error})

  onAcknowledgeGameOver = (nickname, gameID) => {
    log.debug(`APP.JS: onAcknowledgeGameOver: NICKNAME: ${nickname}, GAMEID: ${gameID}, THIS.STATE.NICKNAME: ${this.state.nickname}`)
    const {state: {token}} = this
    this.clearError()
    logic.onAcknowledgeGameOver(nickname, gameID, token)
      .then(_ => this.getCurrentGamesForUser(nickname, token))
      .catch(({message}) => this.onError(message))
  }

  componentDidMount() {
    const {state: {nickname, token}} = this
    this.clearError()
    if (this.isLoggedIn()) this.getCurrentGamesForUser(nickname, token)
  }

  getCurrentGamesForUser = (nickname, token) => {
    log.debug(`APP.JS: getCurrentGamesForUser: NICKNAME: ${nickname},  NEEDTOUPDATEGAMESFLAG: ${this.needToUpdateGamesFlagFromSocketIO},  THIS.STATE.NICKNAME: ${this.state.nickname}`)

    return logic.getGamesForUser(nickname, token)
      .then(currentGames => {
        this.needToUpdateGamesFlagFromSocketIO = false
        this.setState({currentGames})
        sessionStorage.setItem('currentGames', JSON.stringify(currentGames))
      })
      .catch(({message}) => this.onError(message))
  }

  getUsersForString = (str, token) => {
    log.debug(`APP.JS: getUsersForString: STR: ${str},   NEEDTOUPDATEGAMESFLAG: ${this.needToUpdateGamesFlagFromSocketIO},  THIS.STATE.NICKNAME: ${this.state.nickname}`)

    const {state: {nickname}} = this
    logic.getUsersForString(nickname, str, token)
      .then(users => {
        sessionStorage.setItem('users', JSON.stringify(users))
        this.setState({users})
      })
      .catch(({message}) => this.onError(message))
  }

  onRespondToGameRequest = (destination, gameID, answer) => {
    log.debug(`APP.JS: onRespondToGameRequest: DESTINATION: ${destination}, GAMEID: ${gameID}, ANSWER: ${answer}, THIS.STATE.NICKNAME: ${this.state.nickname}`)

    const {state: {nickname, token}} = this
    this.clearError()
    logic.respondToGameRequest(nickname, destination, gameID, answer, token)
      .then(_ => this.getCurrentGamesForUser(nickname, token))
  }

  onRequestGame = (destination) => {
    log.debug(`APP.JS: onRequestGame: DESTINATION: ${destination},  THIS.STATE.NICKNAME: ${this.state.nickname}`)

    this.clearError()
    logic.requestGame(this.state.nickname, destination, this.state.token)
      .catch(({message}) => this.onError(message))
  }


  setupSocketListeners = (nickname, token) => {
    log.debug(`APP.JS: setupSocketListeners: NICKNAME: ${nickname},  THIS.STATE.NICKNAME: ${this.state.nickname}`)

    this.socket = socketIOClient(process.env.REACT_APP_SOCKET_SERVER_URL);

    if (this.socket) {

      this.socket.on(`error ${nickname}`, message => console.error(message))

      this.socket.on(`update to games ${nickname}`, (message) => {
        log.debug(`%c APP.JS: update to games: NICKNAME: ${nickname},  MESSAGE: ${message},  THIS.STATE.NICKNAME: ${this.state.nickname}`,'background: #222; color: #bada55')
        this.needToUpdateGamesFlagFromSocketIO = true
        this.getCurrentGamesForUser(nickname, token)
      })

      this.socket.on('reconnect', (attemptNumber) => {
        log.debug(`APP.JS: reconnect: ATTEMPTNUMBER: ${attemptNumber}, THIS.STATE.NICKNAME: ${this.state.nickname}`)

      });

      this.socket.on('disconnect', (reason) => {
        log.debug(`APP.JS: disconnect: REASON: ${reason}, THIS.STATE.NICKNAME: ${this.state.nickname}`)
        /*   if (reason === 'io server disconnect') {
             // the disconnection was initiated by the server, you need to reconnect manually
   /!*
             this.onLogout()
   *!/
           }*/
        // else the socket will automatically try to reconnect
      });

    } else  log.debug(`APP.JS: failed to establish connection with socketIO server`)

  }


  onLoggedIn = (nickname, token) => {
    log.debug(`APP.JS: onLoggedIn: NICKNAME: ${nickname},  THIS.STATE.NICKNAME: ${this.state.nickname}`)

    this.setupSocketListeners(nickname, token)
    this.getCurrentGamesForUser(nickname, token)
    this.setState({nickname: nickname, token})
    sessionStorage.setItem('nickname', nickname)
    sessionStorage.setItem('token', token)
  }

  onGameMove = (move, gameID) => {
    log.debug(`APP.JS: onGameMove: move: ${JSON.stringify(move)},  GAMEID: ${gameID},  NEEDTOUPDATEGAMESFLAG: ${this.needToUpdateGamesFlagFromSocketIO},  THIS.STATE.NICKNAME: ${this.state.nickname}`)

    const {state: {nickname, token}} = this
    this.clearError()
    logic.makeAGameMove(nickname, move, gameID, token)
      .then(_ => this.getCurrentGamesForUser(nickname, token))
      .catch(({message}) => this.onError(message))
  }

  onInviteUser = user => {
    log.debug(`APP.JS: onInviteUser: USER: ${user}, THIS.STATE.NICKNAME: ${this.state.nickname}`)

    const {state: {nickname, token}} = this
    this.clearError()
    logic.requestGame(this.state.nickname, user, this.state.token)
      .then(_ => this.getCurrentGamesForUser(nickname, token))
      .catch(({message}) => this.onError(message))
  }


  isLoggedIn() {
    return !!this.state.nickname
  }

  onLogout = () => {
    this.setState({nickname: '', token: '', users: [], currentGames: []})
    sessionStorage.clear()
  }

  render() {
    const {nickname, users, error, token, currentGames} = this.state
    log.debug(`APP.JS: render: NICKNAME: ${nickname}, NEEDTOUPDATEGAMESFLAG: ${this.needToUpdateGamesFlagFromSocketIO}`)

    return <div className="app__main">
      <header>
        <NavBar nickname={nickname} isLoggedIn={this.isLoggedIn()} onLogout={this.onLogout}/>
      </header>
      {error && <UncontrolledAlert color="dark"> {error}</UncontrolledAlert>}
      <main>
        <Switch>
          <Route exact path="/" render={() => <Main/>}/>
          <Route path="/main" render={() => <Main/>}/>
          <Route path="/register" render={() => this.isLoggedIn() ? <Redirect to="/main"/> : <Register
            onError={this.onError}
            clearError={this.clearError}

          />}/>

          <Route path="/games" render={() => this.isLoggedIn() ?
            <Games
              onError={this.onError}
              clearError={this.clearError}
              onAcknowledgeGameOver={this.onAcknowledgeGameOver}
              onGameMove={this.onGameMove}
              currentGames={currentGames}
              onRespondToGameRequest={this.onRespondToGameRequest}
              nickname={nickname}
            /> : <Redirect to="/main"/>}/>
          <Route path="/invite" render={() => this.isLoggedIn() ?
            <Invite

              onUserClick={this.onInviteUser}
              currentGames={currentGames}
              allUsers={users}
              nickname={nickname}
              onUserSearchByString={term => this.getUsersForString(term, token)}
            /> : <Redirect to="/main"/>}/>
          <Route path="/login" render={() => this.isLoggedIn() ? <Redirect to="/main"/> :
            <Login
              onError={this.onError}
              clearError={this.clearError}
              onLoggedIn={this.onLoggedIn}/>}/>
        </Switch>
      </main>
      <footer>
      </footer>
    </div>
  }
}

export default withRouter(App)
