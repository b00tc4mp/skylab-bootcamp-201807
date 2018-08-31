import React, { Component } from 'react'
import { Switch, Route, withRouter, Redirect } from 'react-router-dom'
import Landing from './components/Landing'
import Register from './components/Register'
import Login from './components/Login'
import Cites from './components/Cites'
import Patients from './components/Patients'
import AddPatient from './components/AddPatient'
import PatientData from './components/PatientData'
import './styles/css/app.css'

class App extends Component {
  state = {
    code: sessionStorage.getItem('code') || '',
    token: sessionStorage.getItem('token') || '',
    patientId: sessionStorage.getItem('patientId') || '',
    patientToken: sessionStorage.getItem('patientToken') || '',
    patientDni: ''
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

  listPatients = e => {
    e.preventDefault()
    window.location.reload()
    this.props.history.push('/patients')
  }

  goToAddPatient = () => this.props.history.push('/addpatient')

  onAddPatient = (patientId, patientToken, patientDni) => {
    this.setState({ patientId, patientToken, patientDni })

    sessionStorage.setItem('patientId', patientId)
    sessionStorage.setItem('patientToken', patientToken)
  }

  render() {
    const { state: { code, patientDni }, onLoggedIn, onLogout, listPatients, goToAddPatient, onAddPatient } = this

    return <div className="header">
            <header className="header__panel">
              <img className="header__panel__logo" src="/images/logo.svg"/>
            </header>

            { this.isLoggedIn() ? <nav className="header__nav">
              <a className="header__nav__link" href="/#/patients" onClick={listPatients}>Patients</a>
              <a className="header__nav__link" href="/#/cites">Cites</a>
              <a className="header__nav__link" href="" onClick={onLogout}>Logout</a>
        </nav> : <nav></nav> }

            <Switch>
              <Route exact path="/" render={() => this.isLoggedIn() ? <Redirect to="/patients" /> : <Landing />} />
              <Route path="/register" render={() => this.isLoggedIn() ? <Redirect to="/patients" /> : <Register />} />
              <Route path="/login" render={() => this.isLoggedIn() ? <Redirect to="/patients" /> : <Login onLoggedIn={onLoggedIn} />} />
              <Route path="/cites" render={() => this.isLoggedIn() ? <Cites/> : <Redirect to="/" />} />
              <Route path="/patients" render={() => this.isLoggedIn() ? <Patients goToAddPatient={goToAddPatient}/> : <Redirect to="/" />} />
              <Route path="/addpatient" render={() => this.isLoggedIn() ? <AddPatient onAddPatient={onAddPatient}/> : <Redirect to="/" />} />
              <Route path="/patient" render={() => this.isLoggedIn() ? <PatientData code={code} patientDni={patientDni}/> : <Redirect to="/" />} />
            </Switch>
    </div>
  }
}

export default withRouter(App)
