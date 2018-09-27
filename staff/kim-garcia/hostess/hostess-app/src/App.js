import React, { Component } from 'react';
import './App.css';
import { Switch, Route, withRouter, Redirect } from 'react-router-dom'
import Landing from './pages/Landing'



class App extends Component {

  state = {
    token: sessionStorage.getItem('token') || '',
    profile: sessionStorage.getItem('profile') || '',
    id: sessionStorage.getItem('id') || '',
    // idE = ''
  }

  hostessLogin = (id, token) => {
    this.setState({ id, token, profile: 'hostess' })

    sessionStorage.setItem('id', id)
    sessionStorage.setItem('token', token)
    sessionStorage.setItem('profile', 'hostess')
  }
  
  businessLogin = (id, token) => {
    this.setState({ email, token, profile: 'business' })

    sessionStorage.setItem('id', id)
    sessionStorage.setItem('token', token)
    sessionStorage.setItem('profile', 'business')
  }

  isHostessLoggedIn() {
    if(this.state.profile === 'hostess') return true
  }
  
  isBusinessLoggedIn() {
    if(this.state.profile === 'business') return true
  }

  onLogout = event => {
    event.preventDefault()

    this.setState({ id: '', token: '', profile: ''})

    sessionStorage.clear()
  }

  // handleIdEvent = (id) => {
  //   this.setState({ idE: id })
  // }

  render() {
    const { id, token } = this.state

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
