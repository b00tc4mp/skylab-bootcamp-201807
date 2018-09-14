import React, { Component } from 'react';
import { Switch, Route, Redirect } from 'react-router-dom'
import Navbar from './components/Navbar'
import Register from './components/Register'
import Login from './components/Login'
import Profile from './components/Profile'
import Market from './components/Market'
import Trading from './components/Trading'
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
          <Route exact path='/' render={() => this.isLoggedIn() ? <Redirect to='/user/portfolio'/> : <Login handleLogin={this.handleLogin} />} />      
          <Route path='/user/register' render={() => this.isLoggedIn() ? <Redirect to='/market'/> : <Register/>} />      
          <Route path='/user/authenticate' render={() => this.isLoggedIn() ? <Redirect to='/market'/> : <Login handleLogin={this.handleLogin} />} />      
          <Route path='/user/portfolio' render={() => this.isLoggedIn() ? <Portfolio email={this.state.email} token={this.state.token}/> : <Login  handleLogin={this.handleLogin} /> } />
          <Route path='/trading' render={() => <Trading /> } />  
          <Route path='/market' render={() => <Market /> } />      
          <Route path='/news' render={() => <News /> } />
          <Route path='/user/profile' render={() => this.isLoggedIn() ? <Profile logout={this.logout} /> : <Login  handleLogin={this.handleLogin} /> } />
        </Switch>
        
       
        
        </div>
    </div>
  }

}


export default App;
