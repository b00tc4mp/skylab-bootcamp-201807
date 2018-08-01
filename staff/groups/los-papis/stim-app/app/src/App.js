import React, { Component } from 'react';
import { Route, Redirect, Switch } from 'react-router'
import logic from "./logic";
import UserProfile from './components/UserProfile'
import Home from './components/Home'
import Landing from './components/Landing'
import NavBar from './components/NavBar'
import Error404 from './components/Error404'
import UserDelete from './components/UserDelete';
import Search from './components/Search';


class App extends Component {
  state = {
    isLoggedIn: logic.loggedIn
  }

  updateLoggedIn = () => {
    this.setState({
      isLoggedIn: logic.loggedIn
    })
  }

  render() {
    return (
      <div>
        <NavBar isLoggedIn={this.state.isLoggedIn} />
        <Switch>
          <Route exact path="/" render={() => this.state.isLoggedIn ? <Redirect to="/home" /> : <Landing updateLoggedIn={this.updateLoggedIn} />} />
          <Route path="/home" render={() => this.state.isLoggedIn ? <Home /> : <Redirect to="/" />} />
          <Route path="/profiledetail" render={() => this.state.isLoggedIn ? <UserProfile /> : <Redirect to="/" />} />
          <Route path="/profilesettings" render={() => this.state.isLoggedIn ? <UserDelete /> : <Redirect to="/" />} />
          <Route path="/search" render={() => this.state.isLoggedIn ? <Search /> : <Redirect to="/" />} />
          <Route path="/profile" render={() => this.state.isLoggedIn ? <UserProfile /> : <Redirect to="/" />} />
          <Route path="/register" render={() => this.state.isLoggedIn ? <Redirect to="/home" /> : <Redirect to="/" />} />
          <Route path="/login" render={() => this.state.isLoggedIn ? <Redirect to="/home" /> : <Redirect to="/" />} />
          {/* <Route path="/top" render={() => this.state.isLoggedIn ? <Top/> : <Redirect to="/" />} />           */}
          <Route component={Error404} />
        </Switch>
      </div>

    )
  }

}

export default App;