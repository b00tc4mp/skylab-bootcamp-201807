import React, { Component } from 'react'
import { Switch, Route, withRouter, Redirect } from 'react-router-dom'
import Login from './components/Login'
import AddPatient from './components/AddPatient'

class App extends Component {
  state = {
    code: sessionStorage.getItem('code') || '',
    token: sessionStorage.getItem('token') || '',
    dni: sessionStorage.getItem('dni') || ''
  }

  onLoggedIn = (code, token) => {
    this.setState({ code, token })

    sessionStorage.setItem('code', code)
    sessionStorage.setItem('token', token)

    this.props.history.push('/home')
  }

  isLoggedIn() {
    return this.state.code
  }

  onLogout = e => {
    e.preventDefault()
    this.setState({ code: '', token: '' })
    sessionStorage.clear()
    this.props.history.push('/login')
  }

  listPatients = e => {
    e.preventDefault()
    this.props.history.push('/patients')
  }

  goToAddPatient = () => this.props.history.push('/addpatient')

  patientData = dni => {
    this.setState({ dni })
    sessionStorage.setItem('dni', dni)
  }

  render() {
    const { state: { code, dni }, onLoggedIn, onLogout, listPatients, goToAddPatient, patientData } = this

    return <div>

            { this.isLoggedIn() ? 
            <div className="header">
              <header className="header__panel">
                <img className="header__panel__logo" src="/images/logoHome.svg"/>
              </header>
              <nav className="header__nav">
                <a className="header__nav__link" href="/#/home">Home</a>
                <a className="header__nav__link" href="/#/patients" onClick={listPatients}>Patients</a>
                <a className="header__nav__link" href="/#/doctors">Doctors</a>
                <a className="header__nav__link" href="/#/caretakers">caretakers</a>
                <a className="header__nav__link" href="/#/login" onClick={onLogout}>Logout</a>
              </nav>
            </div> : <div className="noHome">
                <img className="noHome__logo" src="/images/logo.svg"/>
            </div> }

            <Switch>
              <Route path="/login" render={() => this.isLoggedIn() ? <Redirect to="/patients" /> : <Login onLoggedIn={onLoggedIn} />} />
              <Route path="/patients" render={() => this.isLoggedIn() ? <Patients goToAddPatient={goToAddPatient} patientData={patientData}/> : <Redirect to="/login" />} />
              <Route path="/addpatient" render={() => this.isLoggedIn() ? <AddPatient/> : <Redirect to="/login" />} />
              <Route path="/patient/:dni" render={() => this.isLoggedIn() ? <PatientData code={code} dni={dni}/> : <Redirect to="/login" />} />
            </Switch>
    </div>
  }
}

export default withRouter(App)
