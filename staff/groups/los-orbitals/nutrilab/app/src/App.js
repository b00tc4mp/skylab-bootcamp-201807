import React, { Component } from 'react'
import logo from './images/logo.svg'
import './App.css'
import logic from './logic'
import Landing from './components/Landing'
import Signup from './components/Signup'
import Login from './components/Login'
import Home from './components/Home'
import Profile from './components/Profile'
import { Route, withRouter, Link, Redirect} from 'react-router-dom'


{/* <link href="https://fonts.googleapis.com/icon?family=Material+Icons"
      rel="stylesheet"> */}


class App extends Component {

  state={
    loggedIn: logic.loggedIn,
    registered: false,
    updated: false,
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

  logout = event => {
    event.preventDefault()
    logic.logout()
    this.setState({loggedIn: false})
    this.props.history.push('/')
  }

  updateUser = (password, newUsername, newPassword) => {
    logic.update(password, newUsername, newPassword)
    .then(() => {
      this.setState({updated: true})
      this.props.history.push('/login')
    })
    .catch(({message}) => {
      this.setState({showFeedback: message})
    })
  }

  deleteUser = (password) => {
    logic.delete(password)
    .then(() => {
      this.setState({loggedIn: false})
      this.props.history.push('/')
    })
    .catch(({message}) => {
      this.setState({showFeedback: message})
    })
  }

  render() {
    const {state:{loggedIn, showFeedback}, goToLogin, goToSignUp, signupUser, loginUser, logout, updateUser, deleteUser } = this
    return (
      <div className="App">
        <header className="App-header">
          <img src={logo} className="App-logo" alt="logo" />
          <h2 className="App-title">Take care of your healty eating with an easy and fun way</h2>
          <Route path="/(home|profile)" render={() => 
            <nav>
              <Link to="/home" >Home</Link>
              <Link to="/profile" >Profile</Link>
              <Link to="/" onClick={logout}>Logout</Link>
            </nav>}/>
        </header>
        <br/>
          <br/>
        <Route exact path = "/" render = {() => loggedIn ? <Redirect to = "/home"/> : <Landing signup = {goToSignUp} login = {goToLogin}/>}/> 
    <Route path = "/signup" render = {() => loggedIn ? <Redirect to = "/home"/> : <Signup onSignUp = {signupUser} linkToLogin = {goToLogin} feedback = {showFeedback}/>} />
    <Route path = "/login" render = {() => loggedIn ? <Redirect to = "/home"/> : <Login onLogin = {loginUser} linkToSignUp = {goToSignUp} feedback = {showFeedback}/>} />
    <Route path = "/home" render = {() => loggedIn ? <Home /> : <Redirect to="/" />} />

    <Route path="/profile" render={() => loggedIn ? <Profile onUpdate={updateUser} feedback = {showFeedback} onDelete={deleteUser}/> : <Redirect to="/"/> }/>

      </div>
    );
  }
}

export default withRouter(App)
