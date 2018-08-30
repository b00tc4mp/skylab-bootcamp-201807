import React, { Component } from 'react'
import { Switch, Route, withRouter, Redirect } from 'react-router-dom'
import Landing from './components/Landing'
import Register from './components/Register'
import Login from './components/Login'
import Patients from './components/Patients'
import AddPatient from './components/AddPatient'
import logic from './logic'

class App extends Component {
  state = {
    code: sessionStorage.getItem('code') || '',
    token: sessionStorage.getItem('token') || ''
  }

  onLoggedIn = (code, token) => {
    this.setState({ code, token })

    sessionStorage.setItem('code', code)
    sessionStorage.setItem('token', token)

    this.props.history.push('/patients')
  }

  isLoggedIn() {
    return this.state.code
  }

  onLogout = e => {
    e.preventDefault()
    this.setState({ code: '', token: '' })
    sessionStorage.clear()
    this.props.history.push('/')
  }

  goToAddPatient = () => this.props.history.push('/addpatient')

  render() {
    const { state: {code, token}, onLoggedIn, onLogout, goToAddPatient } = this

    return <div>
      <header>
        <img className="logo" src="/images/logo.svg"/>
      </header>

      { this.isLoggedIn() ? <nav className="flex">
        <a href="/#/patients">Patients</a>
        <a href="/#/cites">Cites</a>
        <a href="" onClick={onLogout}>Logout</a>
  </nav> : <nav></nav> }

      <Switch>
        <Route exact path="/" render={() => this.isLoggedIn() ? <Redirect to="/patients" /> : <Landing />} />
        <Route path="/register" render={() => this.isLoggedIn() ? <Redirect to="/patients" /> : <Register />} />
        <Route path="/login" render={() => this.isLoggedIn() ? <Redirect to="/patients" /> : <Login onLoggedIn={onLoggedIn} />} />
        <Route path="/patients" render={() => this.isLoggedIn() ? <Patients code={code} token={token} goToAddPatient={goToAddPatient}/> : <Redirect to="/" />} />
        <Route path="/addpatient" render={() => this.isLoggedIn() ? <AddPatient/> : <Redirect to="/" />} />
      </Switch>

    </div>
  }
}

export default withRouter(App)
