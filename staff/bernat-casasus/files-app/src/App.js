import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';
import { Landing, Header, Footer, Login, Register, Files } from './client/index'
import { Route, Redirect, withRouter, Switch } from 'react-router-dom'

class App extends Component {
  render() {
    return (
      <div>
        <Header />
        <Switch>
          <Route exact path="/" render={() => <Landing />} />
          <Route exact path="/login" render={() => <Login />} />
          <Route exact path="/register" render={() => <Register />} />
          <Route exact path="/files" render={() => <Files />} />
        </Switch>
        <Footer />
      </div>

    )
  }
}

export default withRouter(App);
