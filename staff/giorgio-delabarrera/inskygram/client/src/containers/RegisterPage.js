import React, { Component } from 'react'
import Register from '../components/Register';
import { withRouter } from 'react-router-dom'
import logic from '../logic'

class RegisterPage extends Component {

  state = {
    registerError: ''
  }

  goToLogin = event => {
    event.preventDefault()
    this.props.history.push('/accounts/login')
  }

  handleRegisterSubmit = (username, email, password) => {
    logic.register(username, email, password)
      .then(() => logic.authenticate(username, password))
      .then(token => this.props.onRegistered(username, token))
      .then(() => this.props.history.push('/'))
      .catch(({ message }) => this.setState({ registerError: `Upps, ${message}` }))
  }

  render() {
    return (
      <div>
        <h1>Inskygram</h1>
        <Register onSubmit={this.handleRegisterSubmit} error={this.state.registerError} />
        <br />
        <div>Have an account? <a href="#/" onClick={this.goToLogin}>Log in</a></div>
      </div>
    )
  }
}

export default withRouter(RegisterPage)