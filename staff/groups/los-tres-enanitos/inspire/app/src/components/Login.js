import React, { Component } from 'react'
import Utils from '../utils/Utils'

class Login extends Component {

  state = {
    username: '',
    password: '',
    usernameError: '',
    passwordError: '',
  }

  handleUsername = (event) => {
    this.setState({ username: event.target.value })
  }

  handlePassword = (event) => {
    this.setState({ password: event.target.value })
  }

  handleSubmit = (event) => {
    event.preventDefault()

    let isValid = true
    this.setState({ usernameError: '', passwordError: '' })

    if (Utils.isBlank(this.state.username)) {
      this.setState({ usernameError: `Username can't be blank` })
      isValid = false
    }

    if (Utils.isBlank(this.state.password)) {
      this.setState({ passwordError: `Password can't be blank` })
      isValid = false
    }

    if (isValid) {
      this.props.onSubmit(this.state)
    }
  }

  render() {
    return (
      <form className="login-form" onSubmit={this.handleSubmit}>
        {
          this.props.error &&
          <div className="login-form__main-feedback login-form__main-feedback--invalid">
            {this.props.error}
          </div>
        }
        <div className={'login-form__field ' + (this.state.usernameError && 'has-error')}>
          <label className="login-form__label" htmlFor="username">Username</label>
          <input type="text" name="" id="username" className="login-form__input" onChange={this.handleUsername} />
          {
            this.state.usernameError &&
            <div className="login-form__feedback login-form__feedback--invalid">{this.state.usernameError}</div>
          }
        </div>
        <div className={'login-form__field ' + (this.state.passwordError && 'has-error')}>
          <label className="login-form__label" htmlFor="password">Password</label>
          <input type="password" name="" id="password" className="login-form__input" onChange={this.handlePassword} />
          {
            this.state.passwordError &&
            <div className="login-form__feedback login-form__feedback--invalid">{this.state.usernameError}</div>
          }
        </div>
        <button type="submit" className="login-form__submit">Login</button>
      </form>
    )
  }
}

export default Login