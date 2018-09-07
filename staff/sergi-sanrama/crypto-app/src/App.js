import React, { Component } from 'react';
import { Switch, Route, Redirect } from 'react-router-dom'
import Navbar from './components/Navbar'
import Register from './components/Register'
import Login from './components/Login'
import Profile from './components/Profile'
import Landing from './components/Landing'
import Market from './components/Market'
import Portfolio from './components/Portfolio'
import News from './components/News'
import './App.css'

class App extends Component {
  state = {
    email: sessionStorage.getItem('email') || '',
    token: sessionStorage.getItem('token') || ''
  } 

  handleLogin = (email, token) => {
    this.setState({
      email,
      token
    })

    sessionStorage.setItem('email', email)
    sessionStorage.setItem('token', token)
  }

  isLoggedIn = () => {
    return this.state.email
  }

  logout = (e) => {
    e.preventDefault()
    this.setState({
      email:'',
      token:''
    })
    sessionStorage.clear()
  }

  render() {
   
    return <div className='site'>
      <Navbar />
      <div className='site-content'>
        <Switch>
          <Route exact path='/' render={() => this.isLoggedIn() ? <Redirect to='/user/portfolio'/> : <Landing />} />      
          <Route path='/user/register' render={() => this.isLoggedIn() ? <Redirect to='/market'/> : <Register/>} />      
          <Route path='/user/authenticate' render={() => this.isLoggedIn() ? <Redirect to='/market'/> : <Login handleLogin={this.handleLogin}/>} />      
          <Route path='/user/portfolio' render={() => this.isLoggedIn() ? <Portfolio email={this.state.email} token={this.state.token}/> : <Login /> } />
          <Route path='/market' render={() => <Market /> } />      
          <Route path='/news' render={() => <News /> } />
          <Route path='/user/profile' render={() => this.isLoggedIn() ? <Profile onLogout={this.logout} updateUser={this.updateUser} deleteUser={this.deleteUser} email={this.state.email} token={this.state.token}/> : <Login /> } />
        </Switch>
        </div>
    </div>
  }

}


export default App;
