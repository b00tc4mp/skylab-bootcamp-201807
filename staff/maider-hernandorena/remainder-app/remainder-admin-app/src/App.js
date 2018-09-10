import React, { Component } from 'react'
import { Switch, Route, withRouter, Redirect } from 'react-router-dom'
import logic from './logic'
import Login from './components/Login'
import Patients from './components/Patients'
import PatientData from './components/PatientData'
import AddPatient from './components/AddPatient'
import Doctors from './components/Doctors'
import Caretakers from './components/Caretakers'
import AddCaretaker from './components/AddCaretaker'
import CaretakerData from './components/CaretakerData'
import Error404 from './components/Error404'
import './styles/css/app.css'


class App extends Component {
  state = {
    code: sessionStorage.getItem('code') || '',
    id: sessionStorage.getItem('id') || '',
    token: sessionStorage.getItem('token') || '',
    patientDni: sessionStorage.getItem('patient dni') || '',
    caretakerDni: sessionStorage.getItem('caretaker dni') || ''
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
    this.setState({id: '', code: '', token: '' })
    sessionStorage.clear()
    this.props.history.push('/')
  }

  listPatients = e => {
    e.preventDefault()
    this.props.history.push('/patients')
  }

  goToAddPatient = () => this.props.history.push('/addpatient')

  patientData = patientDni => {
    this.setState({ patientDni })
    sessionStorage.setItem('patient dni', patientDni)
  }

  removePatient = dni => {
    const { id, token } = this.state
    dni = parseInt(dni)

    logic.removePatient(dni, id, token)
        .then(() => true)
        .then(() => this.props.history.push('/patients'))
  }

  goToAddCaretaker = () => this.props.history.push('/addcaretaker')

  caretakerData = caretakerDni => {
    this.setState({ caretakerDni })
    sessionStorage.setItem('caretaker dni', caretakerDni)
  }


  render() {
    const { state: { caretakerDni, patientDni, id, token }, onLoggedIn, onLogout, listPatients, goToAddPatient, patientData, removePatient, goToAddCaretaker, caretakerData } = this

    return <div>

            { this.isLoggedIn() ? 
            <div className="header">
              <header className="header__panel">
                <img className="header__panel__logo" src="/images/logoHome.svg"/>
              </header>
              <nav className="header__nav">
                <a className="header__nav__link" href="/#/patients" onClick={listPatients}>Patients</a>
                <a className="header__nav__link" href="/#/doctors">Doctors</a>
                <a className="header__nav__link" href="/#/caretakers">Caretakers</a>
                <a className="header__nav__link" href="/#/" onClick={onLogout}>Logout</a>
              </nav>
            </div> : <div className="noHome">
                <img className="noHome__logo" src="/images/logo.svg"/>
            </div> }

            <Switch>
              <Route exact path="/" render={() => this.isLoggedIn() ? <Redirect to="/patients" /> : <Login onLoggedIn={onLoggedIn} />} />
              <Route path="/patients" render={() => this.isLoggedIn() ? <Patients goToAddPatient={goToAddPatient} patientData={patientData} removePatient={removePatient}/> : <Redirect to="/" />} />
              <Route path="/addpatient" render={() => this.isLoggedIn() ? <AddPatient id={id} token={token}/> : <Redirect to="/" />} />
              <Route path="/patient/:dni" render={() => this.isLoggedIn() ? <PatientData patientDni={patientDni} id={id} token={token}/> : <Redirect to="/" />} />
              <Route path="/doctors" render={() => this.isLoggedIn() ? <Doctors id={id} token={token}/> : <Redirect to="/" />} />
              <Route path="/caretakers" render={() => this.isLoggedIn() ? <Caretakers goToAddCaretaker={goToAddCaretaker} caretakerData={caretakerData} id={id} token={token}/> : <Redirect to="/" />} />
              <Route path="/addcaretaker" render={() => this.isLoggedIn() ? <AddCaretaker id={id} token={token}/> : <Redirect to="/" />} />
              <Route path="/caretaker/:dni" render={() => this.isLoggedIn() ? <CaretakerData caretakerDni={caretakerDni} id={id} token={token} patientData={patientData}/> : <Redirect to="/" />} />
              <Route component={Error404} />
            </Switch>
    </div>
  }
}

export default withRouter(App)
