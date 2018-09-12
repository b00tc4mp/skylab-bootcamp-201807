import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';
import {NavBar, Home, ResultList, Login, Register, Profile, DetailRecipe, Menus, OneMenu} from './client/index.js'
import { Route, Redirect, withRouter } from 'react-router-dom'
import UserSuccesful from './client/components/SuccedPanel/UserSuccesful'

class App extends Component {

  state = {
    email: sessionStorage.getItem('email') || '',
    token: sessionStorage.getItem('token') || '',
  } 

  handleLogin = (email,token, title) => {
    this.setState({
      email,
      token
    })
    sessionStorage.setItem('email',email)
    sessionStorage.setItem('token',token)
    UserSuccesful(title).then(() => {
      this.props.history.push('/home')
    })
  }


  isLoggedIn = () => {
    return !!this.state.email
  }

  onLogout = (e) => {
    e.preventDefault()
    this.setState({email:'', token:''})
    sessionStorage.clear()
  }

  
  render() {
    return (
      <div className="App">
      <NavBar isLoggedIn={this.props.email} onLogout={this.onLogout}/>
      <Route exact path="/" component={Home}/>
      <Route path="/home" component={Home} />
      <Route path="/menus" render={() => !this.state.email ? <Redirect to="/register"/> : <Menus email={this.state.email} token={this.state.token}/>} />
      <Route path="/register" render={() => this.state.email ? <Redirect to="/home" /> : <Register />} />
      <Route path="/login" render={() => this.state.email ? <Redirect to="/home" /> : <Login handleLogin={this.handleLogin} />} />
      <Route path="/profile" render={() => !this.state.email ? <Redirect to="/register" /> : <Profile email={this.state.email} token={this.state.token} />} />
      <Route path="/recipe/:recipeId" render={(props) =>  <DetailRecipe recipeId={props.match.params.recipeId} email={this.state.email} token={this.state.token} />} />
      <Route exact path="/menu/:menuId" render={(props) => !this.state.email ? <Redirect to="/home" /> : <OneMenu email={this.state.email} token={this.state.token} menuId={props.match.params.menuId} />} />

      </div>
    );
  }
}



export default withRouter (App);
