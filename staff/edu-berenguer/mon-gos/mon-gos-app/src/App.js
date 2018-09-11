import React, { Component } from 'react';
import { Switch, Route, withRouter, Redirect } from 'react-router-dom'
import './App.css';
import Home from './components/home/Home'
import Register from './components/register/Register'
import Login from './components/login/Login'
import Landing from './components/landing/Landing'
import DetailDog from './components/detailDog/DetailDog'
import FormAdopted from './components/formAdopted/FormAdopted'
import InsertDog from './components/insertDog/InsertDog'
import UpdateDog from './components/updateDog/UpdateDog'
import Search from './components/search/Search'
import swal from 'sweetalert2';

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
    swal({
      type: 'success',
      title: 'Logged in correctly',
      showConfirmButton: false,
      timer: 1000
    })
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
        <Route exact path="/register" render={() => this.isLoggedIn() ? <Redirect to="/" /> : <Register />} />
        <Route exact path="/login" render={() => this.isLoggedIn() ? <Redirect to="/" /> : <Login handleLogin={this.handleLogin} />} />    */}
        <Route exact path="/landing" render={() => !this.isLoggedIn() ? <Redirect to="/" /> : <Landing handleLogout={this.handleLogout} id={this.state.id} token={this.state.token} />} />
        <Route path="/detailDog/:id" render={(props) => this.isLoggedIn() ? <Redirect to="/" /> : <DetailDog id={props.match.params.id} />} />
        <Route exact path="/adoptar" render={() => this.isLoggedIn() ? <Redirect to="/" /> : <FormAdopted />} />
        <Route exact path="/insertDog" render={() => !this.isLoggedIn() ? <Redirect to="/" /> : <InsertDog id={this.state.id} token={this.state.token} />} />
        <Route exact path="/updateDog/:dogId" render={props => !this.isLoggedIn() ? <Redirect to="/" /> : <UpdateDog id={this.state.id} token={this.state.token} dogId={props.match.params.dogId} />} />
        <Route exact path="/search" render={() => this.isLoggedIn() ? <Redirect to="/" /> : <Search />} />
      </Switch>
    )
  }
}
export default withRouter(App);
