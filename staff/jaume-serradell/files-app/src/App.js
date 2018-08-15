// Dependencies
import React, { Component } from 'react';
import './App.css';
import { BrowserRouter as Router, withRouter } from 'react-router-dom';
import Route from 'react-router-dom/Route'
import Register from './components/Register';
import Login from './components/Login';
import Landing from './components/Landing';
import Files from './components/Files';
import logic from './logic';
import GoToLogin from './components/GoToLogin'

// Assets

// Components

class App extends Component {
  state = {
    loggedIn: true,
    justRegistered: false
  }

  goToRegister = () => this.props.history.push('/register')

  goToLogin = () => this.props.history.push('/login')

  // registerUser = (username, password) =>
  //   logic.registerUser(username, password)
  //     .then(() => this.props.history.push('/registered'))
  //     .catch(({ message }) => 'Error')
  
  
  render() {

    const { state: { loggedIn, justRegistered }, goToRegister, goToLogin, registerUser } = this;

    return (
      <Router>
        <div className="App">
          <Route path='/' exact render={() => <Landing onRegister={goToRegister} onLogin={goToLogin}/>} />
          <Route path='/register' render={() => loggedIn ? <Register /> : <Landing />} />
          <Route path='/registered' render={() => justRegistered ? <GoToLogin /> : <Landing />} />
          <Route path='/login' render={() => loggedIn ? <Login /> : <Landing />} />
          <Route path='/files' render={() => loggedIn ? <Files /> : <Landing />} />
        </div>
      </Router>
    ); 
  }
}

export default withRouter(App);
