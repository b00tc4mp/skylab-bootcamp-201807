import React, {Component} from 'react'
import {Switch, Link, Route, withRouter, Redirect} from 'react-router-dom'
import Landing from './components/Landing'
import Register from './components/Register'
import Login from './components/Login'
import Main from './components/Main'
import socketIOClient from 'socket.io-client';

import logic from "./logic"

class App extends Component {


  state = {
    nickname: sessionStorage.getItem('nickname') || '',
    token: sessionStorage.getItem('token') || '',
    newGamePosition: "start",
    users: JSON.parse(sessionStorage.getItem('users')) || [],
    error: "",
    gameRequester: sessionStorage.getItem('gameRequester') || '',
    currentGames: JSON.parse(sessionStorage.getItem('currentGames')) || [],
  }


  socket = null

  aliveInterval = null



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

  respondToGameRequest = (destination, answer) => {
    const {state: {nickname, token}} = this
    this.setState({gameRequester: ''})
    sessionStorage.setItem('gameRequester', '')
    logic.respondToGameRequest(nickname, destination, answer, token)
      .catch(({message}) => this.setState({error: message}))

  }

  onRequestGame = (destination) => {
    logic.requestGame(this.state.nickname, destination, this.state.token)
      .catch(({message}) => this.setState({error: message}))

  }

  componentDidMount = () => {
  }

  componentWillUnmount = () => {
    if (this.aliveInterval) this.aliveInterval.clearInterval()
  }

  setupSocketListeners = (nickname,token) => {


    this.socket = socketIOClient('http://localhost:8080');
    if (this.socket) {


      this.socket.on(`error ${nickname}`, message => console.error(message))

      this.socket.on(`move made ${nickname}`, () => {
        // move made
      })

      this.socket.on(`game requested ${nickname}`, () => {
        console.log(`%c game requested ${nickname}`, 'background: #222; color: #bada55');

        logic.getLastRequester(nickname, token)
          .then(gameRequester => {
            this.setState({gameRequester})
            sessionStorage.setItem('gameRequester', gameRequester)
          })
          .catch(({message}) => this.setState({error: message}))

      })

      this.socket.on(`request response ready ${nickname}`, () => {
        console.log(`%c request response ready ${nickname}`, 'background: #222; color: #bada55');

        logic.getLastGameRequestResponse(nickname, token)
          .then(res => console.log(res))
          .catch(({message}) => this.setState({error: message}))
      })

      this.socket.on(`new game added ${nickname}`, () => {
        console.log(`%c new game added ${nickname}`, 'background: #222; color: #bada55');
        logic.getGamesForUser(nickname,token)
          .then(currentGames =>{
            debugger
            this.setState({currentGames})
            sessionStorage.setItem('currentGames', JSON.stringify(currentGames))

          })
          .catch(({message}) => this.setState({error: message}))

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
    this.setupSocketListeners(nickname,token)

    this.setState({nickname: nickname, token})
    this.socket.emit('authenticated', nickname)
    this.aliveInterval = setInterval(this.alivePing, 10 * 1000);
    this.onGetAllOnlineUsers(token)
    sessionStorage.setItem('nickname', nickname)
    sessionStorage.setItem('token', token)
    this.setState({token})
  }

  onGameMove = position => {

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
    const {nickname, users, error, token, gameRequester} = this.state

    return <div className="full-height">
      <header>


        {this.isLoggedIn() &&
        <nav><Link to="" onClick={this.onLogout}>logout</Link>
        </nav>}
      </header>

      <Switch>
        <Route exact path="/" render={() => this.isLoggedIn() ? <Redirect to="/main"/> : <Landing/>}/>
        <Route path="/register" render={() => this.isLoggedIn() ? <Redirect to="/main"/> : <Register/>}/>
        <Route path="/main" users={users} render={() => this.isLoggedIn() ?
          <Main onGameMove={this.onGameMove} gameRequester={gameRequester}
                respondToGameRequest={this.respondToGameRequest} users={users} token={token}
                newGamePosition={this.state.newGamePosition}
                nickname={nickname} onRequestGame={this.onRequestGame}/> : <Landing/>}/>
        <Route path="/login" render={() => this.isLoggedIn() ? <Redirect to="/main"/> :
          <Login onLoggedIn={this.onLoggedIn}/>}/>
      </Switch>

      <footer>
        {error && <p>{error}</p>}
      </footer>
    </div>
  }
}

export default withRouter(App)
