import React, { Component } from 'react';
import { Switch, Route, withRouter, Redirect } from 'react-router-dom'
import './App.css';
import Register from './components/Register'
import Login from './components/Login'
import Landing from './components/Landing'

class App extends Component {
  render() {

    return <Switch>
      <Route exact path="/" render={() => this.isLoggedIn() ? <Redirect to="/notes"/> : <Landing/>} />      
      <Route path="/login" render={<Login/>}/>
      <Route path="/Register" render={<Register/>}/>
    </Switch>


    // return (
    //   <div className="App">
    //     <p>Home - App</p>
    //     {/* < Register /> */}
    //     < Login />
    //   </div>
    // );
  }
}

export default App;
