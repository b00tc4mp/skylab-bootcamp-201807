import React, { Component } from 'react';
import './App.css';
import { Switch, Route, withRouter, Redirect } from 'react-router-dom'
import logic from '../src/logic'
import Landing from './pages/Landing'
import Hostess from './pages/Hostess'
import Business from './pages/Business'
import HostessEditProfile from './pages/HostessEditProfile'
import BusinessEditProfile from './pages/BusinessEditProfile'
import Event from './pages/Event'
import CreateEvent from './pages/CreateEvent'


class App extends Component {

  state = {
    emailHostess: sessionStorage.getItem('email') || '',
    emailBusiness: sessionStorage.getItem('email') || '',
    token: sessionStorage.getItem('token') || ''
  }

  hostessLogged = (email, token) => {
    this.setState({ emailHostess: email, token })

    sessionStorage.setItem('email', email)
    sessionStorage.setItem('token', token)
  }

  businessLogged = (email, token) => {
    this.setState({ emailBusiness: email, token })

    sessionStorage.setItem('email', email)
    sessionStorage.setItem('token', token)
  }

  onLogout = event => {
    event.preventDefault()

    this.setState({ emailBusiness: '', emailBusiness: '', token: '' })

    sessionStorage.clear()
  }

  isHostessLoggedIn() {
    return !!this.state.emailHostess
  }

  isBusinessLoggedIn() {
    console.log(this.state.emailBusiness)
    return !!this.state.emailBusiness
  }

  render() {
    return (
      <div>

        <Switch>
          <Route exact path="/" render={() => this.isBusinessLoggedIn() ? <Redirect to="/business"/> : this.isHostessLoggedIn() ? <Redirect to="/hostess"/> : <Landing hostessLogged={this.hostessLogged} businessLogged={this.businessLogged} />} />
          <Route exact path="/hostess" render={() => <Hostess />} />
          <Route exact path="/business" render={() => <Business />} />
          <Route exact path="/hostess/profile" render={() => <HostessEditProfile />} />
          <Route exact path="/business/profile" render={() => <BusinessEditProfile />} />
          <Route exact path="/event" render={() => <Event />} />
          <Route exact path="/event/create" render={() => <CreateEvent />} />
        </Switch>

      </div>



    )
  }
}

export default withRouter(App)
