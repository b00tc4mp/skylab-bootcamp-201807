import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';
import {NavBar, Home, ResultList, Login, Register} from './client/index.js'
import { Route, Redirect, withRouter } from 'react-router-dom'

class App extends Component {

  state = {
    loggedIn: false
  }
  
  render() {
    return (
      <div className="App">
      <NavBar/>
      <Route exact path="/" component={Home}/>
      <Route path="/home" component={Home} />
      <Route path="/register" render={() => this.state.loggedIn ? <Redirect to="/home" /> : <Register />} />
      <Route path="/login" render={() => this.state.loggedIn ? <Redirect to="/home" /> : <Login />} />
     
      </div>
    );

    // return(
    //   <div>
    //     <NavBar isLoggedIn={loggedIn}  onLogout={onLogout}/>
    //     <Route  path="/user" render={() => loggedIn ? <UserPage/> : <Redirect to="/home" /> } />
    //     <Route  path="/register" render={() => loggedIn ? <Redirect to="/home" /> : <UserRegister/>} />
    //     <Route  path="/favourites" render={() => loggedIn ?  <FavouritesPage/> : <Redirect to="/user" /> } />
    //     <Route  path="/login" render={() => loggedIn ? <Redirect to="/home" /> : <UserLogin errorLogin={this.state.errorLogin} onLogin={this.onLogin}/>} />
    //   </div>)
  }
}

export default withRouter (App);
