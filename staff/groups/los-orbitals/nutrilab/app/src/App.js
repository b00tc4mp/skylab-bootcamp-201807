// Import the components and extras
import React, { Component } from 'react'
import logo from './images/logo.svg'
import './App.css'
import logic from './logic'
import Landing from './components/Landing'
import Signup from './components/Signup'
import Login from './components/Login'
import Home from './components/Home'
import Profile from './components/Profile'
import { Route, withRouter, Link, Redirect, Switch} from 'react-router-dom'
import Error404 from './components/Error404';

// States are created and initialized
class App extends Component {

  state={
    loggedIn: logic.loggedIn,
    registered: false,
    updated: false,
    showFeedback: false,
    showFeedbackDelete: false
  }

  // The signup function take the username and password from the usuary input and send it to logic resister. 
  // Then take the result or catch and show the error 
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

  // The signup function take the username and password from the usuary input and send to logic register. 
  // If it succes return an ID and if not catch the error and show the missage
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
  
  // Prepare the view to show the SignUp form and update the url path
  goToSignUp = () => {
    this.setState ({showFeedback: false})
    this.setState ({showFeedbackDelete: false})
    this.props.history.push('/signup')
  }

  // Prepare the view to show the Login form and update the url path
  goToLogin = () => {
    this.setState ({showFeedback: false})
    this.setState ({showFeedbackDelete: false})
    this.props.history.push('/login')
  }

  // This function unlogg off the app
  logout = event => {
    event.preventDefault()
    logic.logout()
    this.setState({loggedIn: false})
    this.props.history.push('/')
  }

  // This function update the user information, (only password needed) you can change the name, the password or both
  updateUser = (password, newUsername, newPassword) => {
    logic.update(password, newUsername, newPassword)
      .then(() => {
        this.setState({updated: true})
        this.setState ({showFeedbackDelete: false})
        this.setState ({showFeedback: false})
        this.props.history.push('/login')
      })
      .catch(({message}) => {
        this.setState({showFeedback: message})
      })
  }

  // This function delete the user, (only password needed)
  deleteUser = (password) => {
    logic.delete(password)
      .then(() => {
        this.setState({loggedIn: false})
        this.setState ({showFeedbackDelete: false})
        this.setState ({showFeedback: false})
        this.props.history.push('/')
      })
      .catch(({message}) => {
        this.setState({showFeedbackDelete: message})
      })
  }

  // To change to false the states of teh feedback messages
  onResetMessage = () => {
    this.setState({showFeedback: false})
    this.setState({showFeedbackDelete: false})
  }

  // This render show and hide the different parts of the web necessaries in each path of login part of the web
  render() {
    
    const {state:{loggedIn, showFeedback, showFeedbackDelete}, goToLogin, goToSignUp, signupUser, loginUser, logout, updateUser, deleteUser} = this
    
    return (
      <div className="App">
        <header className="App-header">
        <Link to="/home"> <img src={logo} className="App-logo" alt="logo" /> </Link>
          {!loggedIn && <h2 className="App-title">Take care of your eating habits in an easy and fun way</h2>}
          <Route path="/(home|profile)" render={() => 
            <nav>
              <Link to="/home" onClick={this.onResetMessage} >Home</Link>
              <Link to="/profile" >Profile</Link>
              <Link to="/" onClick={logout}>Logout</Link>
            </nav>}/>
        </header>

        <Switch>
          <Route exact path="/" render = {() => loggedIn ? <Redirect to="/home"/> : <Landing signup={goToSignUp} login={goToLogin} />}/> 
          <Route path="/signup" render = {() => loggedIn ? <Redirect to="/home"/> : <Signup onSignUp={signupUser} linkToLogin={goToLogin} feedback={showFeedback}/>} />
          <Route path="/login" render = {() => loggedIn ? <Redirect to="/home"/> : <Login onLogin={loginUser} linkToSignUp={goToSignUp} feedback={showFeedback}/>} />
          <Route path="/home" render = {() => loggedIn ? <Home/> : <Redirect to="/" />} />
          <Route path="/profile" render={() => loggedIn ? <Profile onUpdate={updateUser} feedback={showFeedback} feedbackdelete={showFeedbackDelete} onDelete={deleteUser}/> : <Redirect to="/"/>} />
          <Route component={Error404} />
        </Switch>
      </div>
    )
  }
}

export default withRouter(App)
