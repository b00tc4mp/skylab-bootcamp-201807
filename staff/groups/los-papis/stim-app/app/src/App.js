import React, { Component } from 'react';
import { Route, Redirect, Switch } from 'react-router'
import logic from "./logic";
import Home from './components/Home'
import Landing from './components/Landing'
import NavBar from './components/NavBar'
import Error404 from './components/Error404'
import UserSettings from './components/UserSettings';
import Search from './components/Search';
import Favorites from './components/Favorites'
import swal from 'sweetalert2'


class App extends Component {
  state = {
    isLoggedIn: logic.loggedIn
  }

  updateLoggedIn = () => {
    this.setState({
      isLoggedIn: logic.loggedIn
    })
  }

  handleLogout = () => {

      logic.logout()
        swal({
        title: 'See you soon! :)',
        text: "We hope to see you soon!",
        type: 'success',
        confirmButtonText: 'Bye!'
      })
     return this.updateLoggedIn()
  }

  render() {
    return (
      <div>
        <NavBar handleLogout={this.handleLogout} isLoggedIn={this.state.isLoggedIn} />
        <Switch>
          <Route exact path="/" render={() => this.state.isLoggedIn ? <Redirect to="/home" /> : <Landing updateLoggedIn={this.updateLoggedIn} />} />
          <Route path="/home" render={() => this.state.isLoggedIn ? <Home /> : <Redirect to="/" />} />
          <Route path="/profilesettings" render={() => this.state.isLoggedIn ? <UserSettings handleLogout={this.handleLogout} /> : <Redirect to="/" />} />
          <Route path="/search" render={() => this.state.isLoggedIn ? <Search /> : <Redirect to="/" />} />
          <Route path="/register" render={() => this.state.isLoggedIn ? <Redirect to="/home" /> : <Redirect to="/" />} />
          <Route path="/login" render={() => this.state.isLoggedIn ? <Redirect to="/home" /> : <Redirect to="/" />} />      
          <Route path="/favorites" render={() => this.state.isLoggedIn ? <Favorites /> : <Redirect to="/" />} />
          {/* <Route path="/top" render={() => this.state.isLoggedIn ? <Top/> : <Redirect to="/" />} />           */}
          <Route component={Error404} />
        </Switch>
      </div>

    )
  }

}

export default App;