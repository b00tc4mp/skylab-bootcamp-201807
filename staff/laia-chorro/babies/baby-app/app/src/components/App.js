import React, { Component } from 'react'
import { Redirect, Route, Switch } from 'react-router-dom'

//import './App.css'
import logic from '../logic'
//import routes from '../server/routes'


import Login from './pages/Login'
import Home from './pages/Home'
import Register from './pages/Register'
import Update from './pages/Update'


import Nav from './sections/Nav'
import Footer from './sections/Footer'



class App extends Component {

  state = {
    errorMsg: null,
    showFeedback: false
  }

  hideFeedback = () => this.setState({ errorMsg: null, showFeedback: false });

  onLogin = (username, password) => {
    this.hideFeedback()

    return Promise.resolve()
      .then(() => logic.authenticate(username, password))
      .then(token => {
        this.setState({ showFeedback: true })

        sessionStorage.setItem('username', username)
        sessionStorage.setItem('token', token)
      })
      .catch(({ message }) => this.setState({ errorMsg: message }))
  }


  isLoggedIn = () => {
    if (typeof sessionStorage !== 'undefined') {
      return !!sessionStorage.getItem('username')
    }

    return false
  }


  onLogout = e => {
    e.preventDefault()

    this.setState({ username: '', token: '' })

    sessionStorage.clear()
  }

  onRegister = (username, password) => {
    this.hideFeedback()
    return Promise.resolve()
    .then(() => logic.register(username, password))
    .then(() => {
      this.setState({showFeedback: true})
    })
    .catch(({message}) => this.setState({errorMsg: message}))
  }


  onUpdate = (password, newUsername, newPassword) => {
    console.log('onUpdate')
  }

  /*  
  onUpdate = (password, newUsername, newPassword) => {
    this.hideFeedback()
    logic.updateUser(password, newUsername, newPassword)
    .then(() => {
      this.setState({showFeedback: true})
      this.props.history.push('/update')
    })
    .catch(({message}) => this.setState({errorMsg: message}))
  }*/

  /*
  <Switch>
            <Route path="/" exact render={() => <Home onUpdateFavsProp={onUpdateFavs}/>} />
            <Route path="/login" exact render={() => <Login onLoginProp={onLogin} errorMsg={errorMsg} showFeedback={showFeedback} hideFeedback={hideFeedback}/>} />
            <Route path="/register" exact render={() => <Register onRegisterProp={onRegister} errorMsg={errorMsg} showFeedback={showFeedback} hideFeedback={hideFeedback}/>} />
            <Route path="/update" exact render={() => loggedIn ? <Update onUpdateProp={onUpdate} username={logic.userUsername} errorMsg={errorMsg} showFeedback={showFeedback} hideFeedback={hideFeedback}/> : <Redirect to="/login" />} />
        </Switch>
  */


  render() {
    const { onRegister, onLogin, onLogout, hideFeedback, isLoggedIn, state: { errorMsg, showFeedback } } = this

    return (
      <div className="App">
        <Nav onLogout={onLogout} loggedIn={isLoggedIn} />

        <Switch>

            <Route path="/" exact render={() => <Home />} />
            <Route path="/login" exact render={() => <Login onLogin={onLogin} errorMsg={errorMsg} showFeedback={showFeedback} hideFeedback={hideFeedback}/>} />
            <Route path="/register" exact render={() => <Register onRegister={onRegister} errorMsg={errorMsg} showFeedback={showFeedback} hideFeedback={hideFeedback}/>} />

        </Switch>

        <Footer />
      </div>
    )
  }
}

export default App
