import React, { Component } from 'react'
import logo from './images/logo.svg'
import './App.css'
import logic from './logic'
import Landing from './components/Landing'
import Signup from './components/Signup'
import Login from './components/Login'
import Home from './components/Home'
import { Route, withRouter, Link, Redirect} from 'react-router-dom'


{/* <link href="https://fonts.googleapis.com/icon?family=Material+Icons"
      rel="stylesheet"> */}


class App extends Component {

  state={
    loggedIn: logic.loggedIn,
    registered: false,
    showFeedback: false
  }

  signupUser = (username, password) => {

    logic.register(username, password)
      .then(() => {
        this.setState({registered: true})
        this.props.history.push('/login')
      })
      .catch(({message}) => {

        this.setState({showFeedback: message})
      })
  }

  loginUser = (username, password) => {

      logic.login(username, password)
      .then(() => {
        this.setState({loggedIn: true})
        this.props.history.push('/home')
      })
      .catch(({message}) => {

        this.setState({showFeedback: message})
      })
  }

  goToSignUp = () => {

    this.setState ({showFeedback: false})
    this.props.history.push('/signup')
  }


  goToLogin = () => {

    this.setState ({showFeedback: false})
  this.props.history.push('/login')
  }

  render() {
    const {state:{loggedIn, showFeedback}, goToLogin, goToSignUp, signupUser, loginUser } = this
    return (
      <div className="App">
        <header className="App-header">
          <img src={logo} className="App-logo" alt="logo" />
          <h2 className="App-title">Take care of your healty eating with an easy and fun way</h2>

        </header>
        <br/>
          <br/>
        <Route exact path = "/" render = {() => loggedIn ? <Redirect to = "/home"/> : <Landing signup = {goToSignUp} login = {goToLogin}/>}/> 
    <Route path = "/signup" render = {() => loggedIn ? <Redirect to = "/home"/> : <Signup onSignUp = {signupUser} linkToLogin = {goToLogin} feedback = {showFeedback}/>} />
    <Route path = "/login" render = {() => loggedIn ? <Redirect to = "/home"/> : <Login onLogin = {loginUser} linkToSignUp = {goToSignUp} feedback = {showFeedback}/>} />
    <Route path = "/home" render = {() => loggedIn ? <Home /> : <Redirect to="/" />} />

      </div>
    );
  }
}

export default withRouter(App)
