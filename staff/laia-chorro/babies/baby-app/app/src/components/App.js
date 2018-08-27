import React, { Component } from 'react'
import { Redirect, Route, Switch } from 'react-router-dom'

//import './App.css'
import logic from '../logic'
import routes from '../server/routes'
/*import Login from './pages/Login'
import Home from './pages/Home'
import Register from './pages/Register'
import Update from './pages/Update'*/
import Nav from './sections/Nav'
import Footer from './sections/Footer'



class App extends Component {

  state = {
    loggedIn: false,
    errorMsg: null,
    showFeedback: false
  }

  hideFeedback = () => this.setState({errorMsg: null, showFeedback: false});


  /********** */

  onRegister = (username, password) => {
    console.log('onRegister')
  }

  onLogin = (username, password) => {
    console.log('onLogin')
  
  }

  onUpdate = (password, newUsername, newPassword) => {
    console.log('onUpdate')
  }

  /*onRegister = (username, password) => {
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
  }*/


  onLogout = () => {
    logic.logout();

    this.setState({loggedIn: false});
    this.props.history.push('/')
  }


  /*
  <Switch>
            <Route path="/" exact render={() => <Home onUpdateFavsProp={onUpdateFavs}/>} />
            <Route path="/login" exact render={() => <Login onLoginProp={onLogin} errorMsg={errorMsg} showFeedback={showFeedback} hideFeedback={hideFeedback}/>} />
            <Route path="/register" exact render={() => <Register onRegisterProp={onRegister} errorMsg={errorMsg} showFeedback={showFeedback} hideFeedback={hideFeedback}/>} />
            <Route path="/update" exact render={() => loggedIn ? <Update onUpdateProp={onUpdate} username={logic.userUsername} errorMsg={errorMsg} showFeedback={showFeedback} hideFeedback={hideFeedback}/> : <Redirect to="/login" />} />
        </Switch>
  */


  render() {
    const {loggedIn, errorMsg, showFeedback} =  this.state
    const {onRegister, onLogin, onUpdate, onLogout, onUpdateFavs, hideFeedback} = this
debugger;
    return (
      <div className="App">
        <Nav onLogoutProp={onLogout} loggedInProp={loggedIn} />

        <Switch>
          {routes.map(({ path, exact, component: Component, ...rest }) => (
            <Route key={path} path={path} exact={exact} render={(props) => (
              <Component {...props} {...rest} />
            )} />
          ))}
          <Route render={(props) => <NoMatch {...props} /> } />
        </Switch>

        <Footer />
      </div>
    )
  }
}

export default App
