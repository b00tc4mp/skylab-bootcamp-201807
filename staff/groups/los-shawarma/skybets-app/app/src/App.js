import React, { Component } from 'react'
import './App.css'
import { Route } from 'react-router-dom'
import logic from './logic'
import Home from './components/pages/Home'
import Login from './components/pages/Login'
import MyFavs from './components/pages/MyFavs'
import Profile from './components/pages/Profile'
import Register from './components/pages/Register'
import Update from './components/pages/Update'
import Nav from './components/sections/Nav'
import Footer from './components/sections/Footer'

class App extends Component {

  state = {
    loggedIn: false
  }


  onRegister = (username, password) => {
    logic.registerUser(username, password)
    .then(this.setState({loggedIn: true}))
    .catch(({message}) => {
      console.log(message)
    })
  }

  render() {
    const {loggedIn} =  this.state
    const {onRegister} = this
    //const { state: {onRegister}, onRegister} = this

    return (
      <div className="App">
        <Nav />

        <Route path="/" exact render={() => <Home loggedIn={loggedIn} />} />
        <Route path="/login" exact component={Login} />
        <Route path="/myfavs" exact component={MyFavs} />
        <Route path="/profile" exact component={Profile} />
        <Route path="/register" exact render={() => <Register onRegisterProp={onRegister} />} />
        <Route path="/update" exact component={Update} />

        <Footer />
      </div>
    );
  }
}

export default App;
