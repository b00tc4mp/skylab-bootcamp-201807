import React, { Component } from 'react';
import { Switch, Route, withRouter, Redirect } from 'react-router-dom'
import './App.css';
import Home from './components/Home'
import Register from './components/Register'
import Login from './components/Login'
import Landing from './components/Landing'
import DetailDog from './components/DetailDog'
import FormAdopted from './components/FormAdopted'
import InsertDog from './components/InsertDog';
import UpdateDog from './components/UpdateDog'

class App extends Component {

  state = {
    id: sessionStorage.getItem('id') || '',
    token: sessionStorage.getItem('token') || ''
  }

  isLoggedIn = () => {
    return !!this.state.id
  }

  handleLogin = (id, token) => {
    this.setState({
      id,
      token
    })
    sessionStorage.setItem('id', id)
    sessionStorage.setItem('token', token)
    this.props.history.push('/landing')
  }

  handleLogout = (e) => {
    e.preventDefault()
    this.setState({
      id: '',
      token: ''
    })
    sessionStorage.clear()
  }


  render() {
    return (
      <Switch>
        <Route exact path="/" render={() => this.isLoggedIn() ? <Redirect to="/landing" /> : <Home />} />
        <Route exact path="/register" render={() => this.isLoggedIn() ? <Redirect to="/Home" /> : <Register />} />
        <Route exact path="/login" render={() => this.isLoggedIn() ? <Redirect to="/Home" /> : <Login handleLogin={this.handleLogin} />} />    */}
        <Route exact path="/landing" render={() => !this.isLoggedIn() ? <Redirect to="/" /> : <Landing handleLogout={this.handleLogout} id={this.state.id} token={this.state.token} />} />
        <Route path="/detailDog/:id" render={(props) => this.isLoggedIn() ? <Redirect to="/Home" /> : <DetailDog id={props.match.params.id}/>} />  
        <Route exact path="/adoptar" render={() => this.isLoggedIn() ? <Redirect to="/" /> : <FormAdopted />} />
        <Route exact path="/insertDog" render={() => !this.isLoggedIn() ? <Redirect to="/" /> : <InsertDog id={this.state.id} token={this.state.token}/>} />
        <Route exact path="/updateDog/:dogId" render={props => !this.isLoggedIn() ? <Redirect to="/" /> : <UpdateDog id={this.state.id} token={this.state.token} dogId={props.match.params.dogId}/>} />
      </Switch>
    )
  }
}

export default withRouter(App);
