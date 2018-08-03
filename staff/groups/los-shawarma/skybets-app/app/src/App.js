import React, { Component } from 'react'
import './App.css'
import logic from './logic'
import Login from './components/pages/Login'
import Home from './components/pages/Home'
import MyFavs from './components/pages/MyFavs'
import Register from './components/pages/Register'
import Update from './components/pages/Update'
import Nav from './components/sections/Nav'
import Footer from './components/sections/Footer'
import { Route, withRouter, Link, Redirect } from 'react-router-dom'



class App extends Component {

  state = {
    loggedIn: false,
    errorMsg: null,
    showFeedback: false
  }

  hideFeedback = () => this.setState({errorMsg: null, showFeedback: false});

  onRegister = (username, password) => {
    this.hideFeedback()
    logic.registerUser(username, password)
    .then(() => {
      this.setState({showFeedback: true})
      this.props.history.push('/register')
    })
    .catch(({message}) => this.setState({errorMsg: message}))
  }

  onLogin = (username, password) => {
    this.hideFeedback()
    logic.loginUser(username, password)
    .then(() => {
      this.setState({loggedIn: true, showFeedback: true})
      this.props.history.push('/login')
    })
    .catch(({message}) => {
      this.setState({errorMsg: message})
    })
  
  }

  onUpdate = (password, newUsername, newPassword) => {
    this.hideFeedback()
    logic.updateUser(password, newUsername, newPassword)
    .then(() => {
      this.setState({showFeedback: true})
      this.props.history.push('/update')
    })
    .catch(({message}) => this.setState({errorMsg: message}))
  }

  onLogout = () => {
    logic.logout();

    this.setState({loggedIn: false});
    this.props.history.push('/')
  }



  onUpdateFavs = (currentBet, currentFlight) => {
    logic.updateFavs(currentBet, currentFlight)
    .then(res => {
      this.setState({errorUpdate: null, successUpdate: true})
      this.props.history.push('/')
    })
    .catch(({message}) => this.setState({errorUpdate: message}))
  }

  favs = JSON.parse(sessionStorage.getItem('userFavorites'))


  render() {
    const {loggedIn, errorMsg, showFeedback} =  this.state
    const {onRegister, onLogin, onUpdate, onLogout, onUpdateFavs, hideFeedback, favs} = this

    return (
      <div className="App">
        <Nav onLogoutProp={onLogout} loggedInProp={loggedIn} />

        <Route path="/" exact render={() => <Home onUpdateFavsProp={onUpdateFavs}/>} />
        <Route path="/login" exact render={() => <Login onLoginProp={onLogin} errorMsg={errorMsg} showFeedback={showFeedback} hideFeedback={hideFeedback}/>} />
        <Route path="/myfavs" exact render={() => loggedIn ? <MyFavs favsProp={favs}/> : <Redirect to="/login" />} /> 
        <Route path="/register" exact render={() => <Register onRegisterProp={onRegister} errorMsg={errorMsg} showFeedback={showFeedback} hideFeedback={hideFeedback}/>} />
        <Route path="/update" exact render={() => loggedIn ? <Update onUpdateProp={onUpdate} username={logic.userUsername} errorMsg={errorMsg} showFeedback={showFeedback} hideFeedback={hideFeedback}/> : <Redirect to="/login" />} />

        <Footer />
      </div>
    );
  }
}

export default withRouter(App);
