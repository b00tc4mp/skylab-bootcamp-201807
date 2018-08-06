// Import the components and extras
import React, { Component } from 'react'
import './sass/App.css'
import logic from './logic'
import Landing from './components/Landing'
import Signup from './components/Signup'
import Login from './components/Login'
import Home from './components/Home'
import Profile from './components/Profile'
import Update from './components/Update'
import DeleteProfile from './components/Deleteprofile'
import FavoriteList from './components/FavoriteList'
import Error404 from './components/Error404'
import swal from 'sweetalert'
import { Route, withRouter, Link, Redirect, Switch} from 'react-router-dom'


// States are created and initialized
class App extends Component {

  state={
    loggedIn: logic.loggedIn,
    registered: false,
    updated: false,
    showFeedback: false,
    showFeedbackDelete: false,
    showFeedbackUpdate: false
  }

  // The signup function take the username and password from the usuary input and send it to logic resister. 
  // Then take the result or catch and show the error 
  signupUser = (username, password) => {
    logic.register(username, password)
      .then(() => {
        swal("Welcome!", "Now you can Login to enjoy the app!", "success")
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
    this.setState ({showFeedback: false, showFeedbackDelete: false})
    this.props.history.push('/signup')
  }

  // Prepare the view to show the Login form and update the url path
  goToLogin = () => {
    this.setState ({showFeedback: false, showFeedbackDelete: false})
    this.props.history.push('/login')
  }

   // Prepare the view to show the Login form and update the url path
   goToDeleteProfile = () => {
    this.setState ({showFeedbackDelete: false})
    this.props.history.push('/delete')
  }

  goToUpdateProfile = () => {
    this.setState ({showFeedback: false, showFeedbackUpdate: false})
    this.props.history.push('/update')
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
        this.setState({updated: true, showFeedbackDelete: false, showFeedback: false, showFeedbackUpdate: false})
        swal("Well done!", "Username and/or password updated correctly!", "success")
        this.props.history.push('/login')
      })
      .catch(({message}) => {
        this.setState({showFeedbackUpdate: message})
      })
  }

  // This function delete the user, (only password needed)
  deleteUser = (password) => {
    logic.delete(password)
      .then(() => {
        this.setState({loggedIn: false, showFeedbackDelete: false, showFeedback: false})
        swal("WTF!?", "User account deleted correctly!", "success")
        this.props.history.push('/')
      })
      .catch(({message}) => {
        this.setState({showFeedbackDelete: message})
      })
  }

  // To change to false the states of the feedback messages
  onResetMessage = () => {
    this.setState({showFeedback: false, showFeedbackDelete: false})
    window.location.reload()
  }

  // This render show and hide the different parts of the web necessaries in each path of login part of the web
  render() {
    
    const {state:{loggedIn, showFeedback, showFeedbackDelete, showFeedbackUpdate}, goToLogin, goToSignUp, signupUser, loginUser, logout, updateUser, deleteUser} = this
    
    return (
      <div className="App">
        <header className="App__header">
        {!loggedIn && <Link to="/" onClick={this.onResetMessage}> <p className="App__header__nav__item">Nutrilab</p></Link>}
          <Route path="/(home|profile|favorites|delete|update)" render={() => 
            <nav className="App__header__nav">
              <ul>
                <li className="App__header__item App__header__item__left">
                <Link to="/home" onClick={this.onResetMessage}> <p className="App__header__nav__item">Nutrilab</p></Link></li>
              </ul>
              <ul className="App__header__nav__ul">  
                <Link to="/home" onClick={this.onResetMessage} ><p className="App__header__nav__item">Home</p></Link>
                <li className="App__header__item">
                <Link to="/favorites"> <p className="App__header__nav__item">Favorites</p></Link></li>
                <li className="App__header__item">
                <Link to="/profile"> <p className="App__header__nav__item">Profile</p></Link></li>
                <li className="App__header__item">
                <Link to="/" onClick={logout} > <p className="App__header__nav__item">Logout</p></Link>
                </li>
              </ul>
            </nav>}/>
        </header>
        {!loggedIn && <main className="App__main">
            <h2 className="App__main__title">Take care of your eating habits in an easy and fun way</h2>
            </main>}

        <Switch>
          <Route exact path="/" render = {() => loggedIn ? <Redirect to="/home"/> : <Landing signup={goToSignUp} login={goToLogin} />}/> 
          <Route path="/signup" render = {() => loggedIn ? <Redirect to="/home"/> : <Signup onSignUp={signupUser} linkToLogin={goToLogin} feedback={showFeedback}/>} />
          <Route path="/login" render = {() => loggedIn ? <Redirect to="/home"/> : <Login onLogin={loginUser} linkToSignUp={goToSignUp} feedback={showFeedback}/>} />
          <Route path="/home" render = {() => loggedIn ? <Home className="App__main2"/> : <Redirect to="/" />} />
          <Route path="/profile" render = {() => loggedIn ? <Profile onUpdate={this.goToUpdateProfile} onDelete={this.goToDeleteProfile} /> : <Redirect to="/"/>}/> 
          <Route path="/update" render={() => loggedIn ? <Update onUpdate={updateUser} feedback={showFeedbackUpdate} linkToDeleteProfile={this.goToDeleteProfile} /> : <Redirect to="/"/>} />
          <Route path="/delete" render = {() => loggedIn ? <DeleteProfile onDelete={deleteUser}  feedbackdelete={showFeedbackDelete} goToProfile={this.goToUpdateProfile}/> : <Redirect to="/"/>}/>
          <Route path="/favorites" render={() => loggedIn ? <FavoriteList /> :  <Redirect to="/"/>} />
          <Route component={Error404} />
        </Switch>
      </div>
    )
  }
}

export default withRouter(App)
