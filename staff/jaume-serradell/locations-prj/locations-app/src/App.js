import React, { Component } from 'react';
import { Switch, Route, withRouter, Redirect } from 'react-router-dom'
import Hero from './components/Hero/Hero'
// import Home from './components/Home/Home'
import Register from './components/Register/Register'
import Login from './components/Login/Login'
import Nav from './components/Nav/Nav'
import Property from './components/Property/Property'
import Footer from './components/Footer/Footer';
import PropertyTab from './components/PropertyTab/PropertyTab'
import './App.css'
import Filters from './components/Filters/Filters';

class App extends Component {
  state = {
    email: sessionStorage.getItem('email') || '',
    token: sessionStorage.getItem('token') || '',
    hero: true
  }

  onLoggedIn = (email, token) => {
    this.setState({ email, token })
    sessionStorage.setItem('email', email)
    sessionStorage.setItem('token', token)

    this.props.history.push('/property')
  }

  toggleHeroFalse = () => {
    this.setState({ hero:false })
  }

  toggleHeroTrue = () => {
    this.setState({ hero:true })
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
      <div class="Site-content">
        {this.state.hero && <Hero />}
        <PropertyTab />
        <Filters />
        <Switch>
          <Route exact path='/' />
          <Route path='/register' render={() => this.isLoggedIn() ? <Redirect to='/property' /> : <Register toggleHero={this.toggleHeroFalse} />} />
          <Route path='/login' render={() => this.isLoggedIn() ? <Redirect to='/property' /> : <Login onLoggedIn={this.onLoggedIn} />} />
          <Route path='/property' render={() => this.isLoggedIn() ? <Property email={email} token={token} /> : <Redirect to='/' />} />
        </Switch>
      </div>
      <Footer />
    </div>
  }
}

export default withRouter(App)
