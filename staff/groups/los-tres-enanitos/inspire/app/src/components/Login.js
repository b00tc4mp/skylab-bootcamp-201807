import React, { Component } from 'react'

class Login extends Component {

  state = {
    username: '',
    password: '',
  }

  handleUsername = (event) => {
    this.setState({ username: event.target.value })
  }

  handlePassword = (event) => {
    this.setState({ password: event.target.value })
  }

  handleSubmit = (event) => {
    event.preventDefault()

    // TODO: validate required fields

    this.props.onSubmit(this.state)
  }

  render() {
    return (
      <form className="login-form" onSubmit={this.handleSubmit}>
        <input type="text" className="login-form__username" placeholder="Username" onChange={this.handleUsername} />
        <input type="password" className="login-form__pass" placeholder="Password" onChange={this.handlePassword} />
        <button type="submit" className="login-form__submit">Login</button>
      </form>
    )
  }
}

export default Login