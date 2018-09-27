import React, { Component } from 'react';
import './App.css';
import { Switch, Route, withRouter, Redirect } from 'react-router-dom'
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
    profile: sessionStorage.getItem('profile') || '',


    // business: sessionStorage.getItem('business') || '',
    idEvent: ''
  }

  hostessLogged = (email, token) => {
    this.setState({ email, token, profile: 'hostess' })

    sessionStorage.setItem('email', email)
    sessionStorage.setItem('token', token)
    sessionStorage.setItem('profile', 'hostess')


    // sessionStorage.setItem('hostess', 'hostess')
    // sessionStorage.setItem('business', '')
  }
  
  businessLogged = (email, token) => {
    this.setState({ email, token, profile: 'business' })

    sessionStorage.setItem('email', email)
    sessionStorage.setItem('token', token)
    sessionStorage.setItem('profile', 'business')


    // sessionStorage.setItem('business', 'business')
    // sessionStorage.setItem('hostess', '')
  }

  isHostessLoggedIn() {
    if(this.state.profile === 'hostess') return true
    
    // return !!this.state.hostess
  }
  
  isBusinessLoggedIn() {
    if(this.state.profile === 'business') return true

    // return !!this.state.business
  }

  onLogout = event => {
    event.preventDefault()

    this.setState({ email: '', token: '', hostess: '', business: '', profile: ''})

    sessionStorage.clear()
  }

  handleIdEvent = (id) => {
    this.setState({ idEvent: id })
  }



  render() {
    const { email, token } = this.state

    return (
      <div>

        <Switch>
          <Route exact path="/" render={() => this.isHostessLoggedIn() ? <Redirect to="/hostess" /> : this.isBusinessLoggedIn() ? <Redirect to="/business" /> : <Landing hostessLogged={this.hostessLogged} businessLogged={this.businessLogged} />} />
          <Route exact path="/hostess" render={() => this.isHostessLoggedIn() ? <Hostess email={email} token={token} onLogout={this.onLogout}/> : <Redirect to="/"/>} />
          <Route exact path="/hostess/profile" render={() => this.isHostessLoggedIn() ? <HostessEditProfile email={email} token={token} onLogout={this.onLogout}/> : <Redirect to="/" />} />
          <Route exact path="/business" render={() => this.isBusinessLoggedIn() ? <Business email={email} token={token} onLogout={this.onLogout}/> : <Redirect to="/"/>} />
          <Route exact path="/business/profile" render={() => this.isBusinessLoggedIn() ? <BusinessEditProfile email={email} token={token} onLogout={this.onLogout} /> :  <Redirect to="/"/>} />
          <Route exact path="/event/create" render={() => this.isBusinessLoggedIn() ? <CreateEvent email={email} token={token} onLogout={this.onLogout} idEvent={this.handleIdEvent}/> : <Redirect to="/"/>} />
          <Route exact path="/event/:id" render={props => this.isBusinessLoggedIn() ? <Event eventId={props.match.params.id}/> : <Redirect to="/"/>} />
        </Switch>

      </div>
    )
  }
}

export default withRouter(App)
