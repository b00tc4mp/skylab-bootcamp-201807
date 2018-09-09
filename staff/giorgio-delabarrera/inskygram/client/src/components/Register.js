import React, { Component } from 'react'
import validator from 'validator'

class Register extends Component {

  state = {
    username: '',
    email: '',
    password: '',
    usernameError: '',
    emailError: '',
    passwordError: '',
  }

  handleEmail = event => this.setState({ email: event.target.value })

  handleUsername = event => this.setState({ username: event.target.value })

  handlePassword = event => this.setState({ password: event.target.value })

  handleSubmit = event => {
    event.preventDefault()

    let isValid = true

    this.setState({
      usernameError: '',
      emailError: '',
      passwordError: '',
    })

    if (validator.isEmpty(this.state.username)) {
      this.setState({ usernameError: `Username can't be blank` })
      isValid = false
    }

    if (validator.isEmpty(this.state.email)) {
      this.setState({ emailError: `Email can't be blank` })
      isValid = false
      
    } else if (!validator.isEmail(this.state.email)) {
      this.setState({ emailError: `Email it must be a valid email` })
      isValid = false
    }

    if (validator.isEmpty(this.state.password)) {
      this.setState({ passwordError: `Password can't be blank` })
      isValid = false
    }

    if (isValid) {
      const { username, email, password } = this.state
      this.props.onSubmit(username, email, password)
    }
  }

  render() {
    return (
      <form onSubmit={this.handleSubmit}>
        {
          this.props.error &&
          <div className="error">{this.props.error}</div>
        }
        <div>
          <label htmlFor="username">Username</label>
          <input type="text" name="" id="username" onChange={this.handleUsername} />
          {
            this.state.usernameError &&
            <div className="error">{this.state.usernameError}</div>
          }
        </div>
        <div>
          <label htmlFor="email">Email</label>
          <input type="text" name="" id="email" onChange={this.handleEmail} />
          {
            this.state.emailError &&
            <div className="error">{this.state.emailError}</div>
          }
        </div>
        <div>
          <label htmlFor="password">Password</label>
          <input type="password" name="" id="password" onChange={this.handlePassword} />
          {
            this.state.passwordError &&
            <div className="error">{this.state.passwordError}</div>
          }
        </div>
        <button type="submit">Register</button>
      </form>
    )
  }
}

export default Register