import React, { Component } from 'react'
import { Switch, Route, withRouter, Redirect } from 'react-router-dom'
import Login from './components/Login'
import Home from './components/Home'
import Profile from './components/Profile'
import PatientData from './components/PatientData'
import Error404 from './components/Error404'
import './styles/css/app.css'

class App extends Component {
  state = {
    dni: sessionStorage.getItem('dni') || '',
    id: sessionStorage.getItem('id') || '',
    token: sessionStorage.getItem('token') || '',
    patientDni: sessionStorage.getItem('patient dni') || ''
  }

  onLoggedIn = (dni, id, token) => {
    this.setState({ dni, id, token })

    sessionStorage.setItem('dni', dni)
    sessionStorage.setItem('id', id)
    sessionStorage.setItem('token', token)

    this.props.history.push('/home')
  }

  isLoggedIn() {
    return this.state.dni
  }

  onLogout = e => {
    e.preventDefault()
    this.setState({ dni: '', id: '', token: '' })
    sessionStorage.clear()
    this.props.history.push('/')
  }

  patientData = patientDni => {
    this.setState({ patientDni })
    sessionStorage.setItem('patient dni', patientDni)
  }

  render() {

    const { state: { dni, id, token, patientDni }, onLoggedIn, onLogout, patientData } = this

    return <div>
          { this.isLoggedIn() ? 
            <div className="header">
              <header className="header__panel">
                <a href="/#/home" ><img className="header__panel__logo" src="/images/logoHome.svg"/></a>
              </header>
              <nav className="header__nav">
                <a className="header__nav__link" href="/#/profile" ><img className="header__nav__link__icon" src="/images/user.svg"/>Profile</a>
                <a className="header__nav__link" href="/#/home" ><img className="header__nav__link__icon" src="/images/home.svg"/>Home</a>
                <a className="header__nav__link" href="" onClick={onLogout}><img className="header__nav__link__icon" src="/images/exit.svg"/>Logout</a>
              </nav>
            </div> : <div className="noHome">
                <img className="noHome__logo" src="/images/logo.svg"/>
            </div> }

            <Switch>
              <Route exact path="/" render={() => this.isLoggedIn() ? <Redirect to="/home" /> : <Login onLoggedIn={onLoggedIn} />} />
              <Route path="/home" render={() => this.isLoggedIn() ? <Home dni={dni} patientData={patientData}/> : <Redirect to="/" /> } />
              <Route path="/profile" render={() => this.isLoggedIn() ? <Profile dni={dni} id={id} token={token} /> : <Redirect to="/" />} />
              <Route path="/patient/:dni" render={() => this.isLoggedIn() ? <PatientData patientDni={patientDni}/> : <Redirect to="/" />} />
              <Route component={Error404} />
            </Switch>  
        </div>
  }
}

export default withRouter(App)
