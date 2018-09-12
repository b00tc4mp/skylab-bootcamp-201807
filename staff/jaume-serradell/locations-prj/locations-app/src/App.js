import React, { Component } from 'react';
import { Switch, Route, withRouter, Redirect } from 'react-router-dom'
import Home from './components/Home/Home'
import Register from './components/Register/Register'
import Login from './components/Login/Login'
import Nav from './components/Nav/Nav'
import Property from './components/Property/Property'
import Footer from './components/Footer/Footer'
import './App.css'
import PropertyTab from './components/PropertyTab/PropertyTab'
import PropertyInfo from './components/PropertyInfo/PropertyInfo'

class App extends Component {
  state = {
    email: sessionStorage.getItem('email') || '',
    token: sessionStorage.getItem('token') || '',
    id: sessionStorage.getItem('id') || '',
  }


  onLoggedIn = (email, token, id) => {
    this.setState({ email, token, id })
    sessionStorage.setItem('email', email)
    sessionStorage.setItem('token', token)
    sessionStorage.setItem('id', id)

    this.props.history.push('/property')
  }

  isLoggedIn = () => {
    return !!this.state.email
  }

  onLogout = (e) => {
    e.preventDefault()
    this.setState({ email: '', token: '' })
    sessionStorage.clear()
  }

  render() {
    const { email, token } = this.state
    return <div className="Site">
      <Nav loggedIn={this.isLoggedIn()} onLogout={this.onLogout} />
      <div className="Site-content">
        <Switch>
          <Route exact path='/' render={() => this.isLoggedIn() ? <Home id={this.state.id} email={email} token={token} /> : <Home />} />
          <Route path='/register' render={() => this.isLoggedIn() ? <Redirect to='/property' /> : <Register toggleHero={this.toggleHeroFalse} />} />
          <Route path='/login' render={() => this.isLoggedIn() ? <Redirect to='/property' /> : <Login onLoggedIn={this.onLoggedIn} />} />
          <Route exact path='/property' render={() => this.isLoggedIn() ? <Property email={email} token={token} /> : <Redirect to='/' />} />
          <Route path='/property/:id' render={() => <PropertyTab id={this.props} email={email} token={token} />} />
          <Route path='/propertyinfo/:id' render={() => <PropertyInfo />} />
        </Switch>
      </div>
      <Footer />
    </div>
  }
}

export default withRouter(App)
