import React, { Component } from 'react'
import Login from '../components/Login';
import { withRouter } from 'react-router-dom'
import logic from "../logic"

class LoginPage extends Component {

  state = {
    loginError: ''
  }

  goToRegister = event => {
    event.preventDefault()
    this.props.history.push('/accounts/register')
  }

  handleLoginSubmit = (username, password) => {
    logic.authenticate(username, password)
      .then(token => this.props.onLoggedIn(username, token))
      .catch(({ message }) => this.setState({ loginError: `Upps, ${message}` }))
  }

  render() {
    return (
      <div>
        <h1>Inskygram</h1>
        <Login onSubmit={this.handleLoginSubmit} error={this.state.loginError} />
        <br/>
        <div>Don't have an account? <a href="#/" onClick={this.goToRegister}>Sign up</a></div>
      </div>
    )
  }
}

export default withRouter(LoginPage)