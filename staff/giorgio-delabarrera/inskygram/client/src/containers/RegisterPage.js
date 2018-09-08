import React, { Component } from 'react'
import Register from '../components/Register';
import { withRouter } from 'react-router-dom'
import logic from '../logic'

class RegisterPage extends Component {

  // goToLogin = (event) => {
  //   event.preventDefault()
  //   this.props.history.push('/login')
  // }

  handleRegisterSubmit = (username, email, password) => {
    logic.register(username, email, password)
      .then(() => console.log('registrado!!!'))
      .then(() => {
        logic.authenticate(username, password)
          .then(token => this.props.onRegistered(username, token))
      })
      .catch(error => {
        console.log(error);
      })
  }

  render() {
    return (
      <div>
        {/* <Register onSubmit={this.props.onRegisterSubmit} error={this.props.registerError} /> */}
        <Register onSubmit={this.handleRegisterSubmit} />
      </div>
    )
  }
}

export default withRouter(RegisterPage)