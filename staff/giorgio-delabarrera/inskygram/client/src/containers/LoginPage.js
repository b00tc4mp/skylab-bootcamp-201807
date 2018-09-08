import React, { Component } from 'react'
import Login from '../components/Login';
import { withRouter } from 'react-router-dom'
import logic from "../logic"

class LoginPage extends Component {

  // goToRegister = (event) => {
  //   event.preventDefault()
  //   this.props.history.push('/join')
  // }

  handleLoginSubmit = (username, password) => {
    logic.authenticate(username, password)
      .then(token => this.props.onLoggedIn(username, token))
      .catch(error => {
        console.log(error);
        // this.setState({ loginError: `Upps, ${error.message}` })
      })
  }

  render() {
    return (
      <div>
        <Login onSubmit={this.handleLoginSubmit} />
      </div>
    )
  }
}

export default withRouter(LoginPage)