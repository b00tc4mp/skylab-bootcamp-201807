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
    email: sessionStorage.getItem('email') || '',
    token: sessionStorage.getItem('token') || '',
    hostess: false,
    business: false,
    loggedIn: false
  }

  hostessLogged = (email, token) => {
    this.setState({ email, token })
    this.setState({ hostess: true, business: false, loggedIn: true})

    sessionStorage.setItem('email', email)
    sessionStorage.setItem('token', token)

    logic.editHostessProfile(email, 'Hostess', '07/10/1991', 'Kiribati', 'W', '000000000', ['Catalan', 'Spanish'], 'info', 120, 'A little about me', ['sociable'], 'photo', token)
    .then(() => true)
  }

  businessLogged = (email, token) => {
    this.setState({ email, token })
    this.setState({ business: true, hostess: false, loggedIn: true})

    sessionStorage.setItem('email', email)
    sessionStorage.setItem('token', token)

    logic.editBusinessProfile(email, 'Company name', 'Web page', 'Person in charge', '000000000', 'Philosophy of the company', token)
    .then(() => true)
  }

  onLogout = event => {
    event.preventDefault()

    this.setState({ email: '', token: '', hostess: false, business: false, loggedIn: false })

    sessionStorage.clear()
  }

  render() {
    const { email, token, hostess, business, loggedIn } = this.state

    return (
      <div>

        <Switch>
          <Route exact path="/" render={() => hostess ? <Redirect to="/hostess" /> : business ? <Redirect to="/business" /> : <Landing hostessLogged={this.hostessLogged} businessLogged={this.businessLogged} />} />
          <Route exact path="/hostess" render={() => (hostess && loggedIn) ? <Hostess email={email} token={token} onLogout={this.onLogout}/> : <Redirect to="/"/>} />
          <Route exact path="/hostess/profile" render={() => (hostess && loggedIn) ? <HostessEditProfile email={email} token={token} onLogout={this.onLogout}/> : <Redirect to="/" />} />
          <Route exact path="/business" render={() => (business && loggedIn) ? <Business email={email} token={token} /> : <Redirect to="/"/>} />
          <Route exact path="/business/profile" render={() => (business && loggedIn) ? <BusinessEditProfile email={email} token={token} /> :  <Redirect to="/"/>} />
          <Route exact path="/event" render={() => <Event />} />
          <Route exact path="/event/create" render={() => (business && loggedIn) ? <CreateEvent email={email} token={token} /> : <Redirect to="/"/>} />
        </Switch>

      </div>
    )
  }
}

export default withRouter(App)
