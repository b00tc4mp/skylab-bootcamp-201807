import React, { Component } from 'react'
import { Switch, Route, withRouter, Redirect } from 'react-router-dom'
import logic from './logic'
import Landing from './components/Landing'
import Register from './components/Register'
import Login from './components/Login'
import Home from './components/Home'
import Profile from './components/Profile'

class App extends Component {
  state = {
    email: sessionStorage.getItem('email') || '',
    token: sessionStorage.getItem('token') || '',
    unregisterError: ''
  }

  onLoggedIn = (email, token) => {
    this.setState({ email, token })

    sessionStorage.setItem('email', email)
    sessionStorage.setItem('token', token)

    this.props.history.push('/home')
  }

  isLoggedIn() {
    return this.state.email
  }

  onLogout = e => {
    e.preventDefault()
    this.setState({ email: '', token: '' })
    sessionStorage.clear()
    this.props.history.push('/')
  }

  onUnregister = password => {
    const {email, token} = this.state
    logic.unregisterCaretaker(email, password, token)
      .then(() => {
        this.setState({ email: '', token: '' })
        sessionStorage.clear()
        this.props.history.push('/')
      })
      .catch(({ message }) => this.setState({ unregisterError: message }))
  }

  render() {

    const { state: { email, token, unregisterError }, onLoggedIn, onLogout, onUnregister } = this

    return <div>
          { this.isLoggedIn() ? 
            <div className="header">
              <header className="header__panel">
                <img className="header__panel__logo" src="/images/logoHome.svg"/>
              </header>
              <nav className="header__nav">
                <a className="header__nav__link" href="/#/home" >Home</a>
                <a className="header__nav__link" href="/#/profile" >Profile</a>
                <a className="header__nav__link" href="" onClick={onLogout}>Logout</a>
              </nav>
            </div> : <div className="noHome">
                <img className="noHome__logo" src="/images/logo.svg"/>
            </div> }

            <Switch>
              <Route exact path="/" render={() => this.isLoggedIn() ? <Redirect to="/home" /> : <Landing />} />
              <Route path="/register" render={() => this.isLoggedIn() ? <Redirect to="/home" /> : <Register />} />
              <Route path="/login" render={() => this.isLoggedIn() ? <Redirect to="/home" /> : <Login onLoggedIn={onLoggedIn} />} />
              <Route path="/home" render={() => this.isLoggedIn() ? <Home email={email}/> : <Redirect to="/" /> } />
              <Route path="/profile" render={() => this.isLoggedIn() ? <Profile email={email} token={token} unregisterError={unregisterError} onUnregister={onUnregister}/> : <Redirect to="/" />} />
            </Switch>  
        </div>
  }
}

export default withRouter(App)
