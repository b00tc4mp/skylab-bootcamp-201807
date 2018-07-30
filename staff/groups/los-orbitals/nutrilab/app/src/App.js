import React, { Component } from 'react'
import logo from './images/logo.svg'
import './App.css'
import logic from './logic'
import Landing from './components/Landing'
import Signup from './components/Signup'
import Login from './components/Login'
import { Route, withRouter, Link, Redirect} from 'react-router-dom'


class App extends Component {

  state={
    loggedIn: logic.loggedIn,
    registered: false
  }

  signupUser = (username, password) => {

    logic.register(username, password)
      .then(() => {
        this.setState({registered: true})
        this.props.history.push('/login')
      })
  }

  loginUser = (username, password) => {

      logic.login(username, password)
      .then(() => {
        this.setState({loggedIn: true})
        this.props.history.push('/home')
      })
  }

  goToSignUp = () => {

    this.props.history.push('/signup')
  }


  goToLogin = () => {

  this.props.history.push('/login')
  }

  render() {
    const {state:{loggedIn}, goToLogin, goToSignUp, signupUser, loginUser } = this
    return (
      <div className="App">
        <header className="App-header">
          <img src={logo} className="App-logo" alt="logo" />
          <h2 className="App-title">Take care of your healty eating with an easy and fun way</h2>

        </header>
        <br/>
          <br/>
        <Route exact path = "/" render = {() => loggedIn ? <Redirect to = "/home"/> : <Landing signup = {goToSignUp} login = {goToLogin}/>}/> 
    <Route path = "/signup" render = {() => loggedIn ? <Redirect to = "/home"/> : <Signup onSignUp = {signupUser} />} />
    <Route path = "/login" render = {() => loggedIn ? <Redirect to = "/home"/> : <Login onLogin = {loginUser} />} />


      </div>
    );
  }
}

export default withRouter(App)
