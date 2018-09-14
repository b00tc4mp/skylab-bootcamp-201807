import React, { Component } from 'react'
import { Switch, Route, withRouter, Redirect } from 'react-router-dom'
import Login from './components/Login'
import Cites from './components/Cites'
import Patients from './components/Patients'
import PatientData from './components/PatientData'
import Error404 from './components/Error404'
import './styles/css/app.css'

class App extends Component {
  state = {
    code: sessionStorage.getItem('code') || '',
    id: sessionStorage.getItem('id') || '',
    token: sessionStorage.getItem('token') || '',
    dni: sessionStorage.getItem('dni') || ''
  }

  onLoggedIn = (code, id, token) => {
    this.setState({ code, id, token })

    sessionStorage.setItem('code', code)
    sessionStorage.setItem('id', id)
    sessionStorage.setItem('token', token)

    this.props.history.push('/patients')
  }

  isLoggedIn() {
    return this.state.code
  }

  onLogout = e => {
    e.preventDefault()
    this.setState({ code: '', id: '', token: '' })
    sessionStorage.clear()
    this.props.history.push('/')
  }

  listPatients = e => {
    e.preventDefault()
    this.props.history.push('/patients')
  }

  patientData = dni => {
    this.setState({ dni })
    sessionStorage.setItem('dni', dni)
  }

  render() {
    const { state: { code, dni }, onLoggedIn, onLogout, listPatients, patientData } = this

    return <div>

            { this.isLoggedIn() ? 
            <div className="header">
              <header className="header__panel">
                <a href="/#/patients" onClick={listPatients}><img className="header__panel__logo" src="/images/logoHome.svg"/></a>
                <nav className="header__panel__nav">
                  <a className="header__panel__nav__link" href="/#/patients" onClick={listPatients}><img className="header__panel__nav__link__icon" src="/images/icons/couple.svg"/>Patients</a>
                  <a className="header__panel__nav__link" href="/#/cites"><img className="header__panel__nav__link__icon" src="/images/icons/appointment.svg"/>Cites</a>
                  <a className="header__panel__nav__link" href="/#/" onClick={onLogout}><img className="header__panel__nav__link__icon" src="/images/icons/exit.svg"/>Logout</a>
                </nav>
              </header>
            </div> : <div className="noHome">
                <img className="noHome__logo" src="/images/logo.svg"/>
            </div> }

            <Switch>
              <Route exact path="/" render={() => this.isLoggedIn() ? <Redirect to="/patients" /> : <Login onLoggedIn={onLoggedIn} />} />
              <Route path="/cites" render={() => this.isLoggedIn() ? <Cites/> : <Redirect to="/" />} />
              <Route path="/patients" render={() => this.isLoggedIn() ? <Patients patientData={patientData}/> : <Redirect to="/" />} />
              <Route path="/patient/:dni" render={() => this.isLoggedIn() ? <PatientData code={code} dni={dni}/> : <Redirect to="/" />} />
              <Route component={Error404} />
            </Switch>
    </div>
  }
}

export default withRouter(App)