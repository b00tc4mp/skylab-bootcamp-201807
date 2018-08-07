import React, { Component } from 'react'
import Utils from '../utils/Utils'

class Register extends Component {

  state = {
    firstName: '',
    lastName: '',
    email: '',
    username: '',
    password: '',
    firstNameError: '',
    lastNameError: '',
    emailError: '',
    usernameError: '',
    passwordError: '',
  }

  handleFirstName = (event) => {
    this.setState({ firstName: event.target.value })
  }

  handleLastName = (event) => {
    this.setState({ lastName: event.target.value })
  }

  handleEmail = (event) => {
    this.setState({ email: event.target.value })
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

    this.setState({
      firstNameError: '',
      lastNameError: '',
      emailError: '',
      usernameError: '',
      passwordError: '',
    })

    if (Utils.isBlank(this.state.firstName)) {
      this.setState({ firstNameError: `First name can't be blank` })
      isValid = false
    }

    if (Utils.isBlank(this.state.lastName)) {
      this.setState({ lastNameError: `Last name can't be blank` })
      isValid = false
    }

    if (Utils.isBlank(this.state.email)) {
      this.setState({ emailError: `Email can't be blank` })
      isValid = false
    }

    if (Utils.isBlank(this.state.username)) {
      this.setState({ usernameError: `Username can't be blank` })
      isValid = false
    }

    if (Utils.isBlank(this.state.password)) {
      this.setState({ passwordError: `Password can't be blank` })
      isValid = false
    }

    if (isValid) {
      const {
        firstNameError,
        lastNameError,
        emailError,
        usernameError,
        passwordError,
        ...formData
      } = this.state
      this.props.onSubmit(formData)
    }
  }

  render() {
    return (
      <form className="form" onSubmit={this.handleSubmit}>
        {
          this.props.error &&
          <div className="form__main-feedback form__main-feedback--invalid">
            {this.props.error}
          </div>
        }
        <div className={'form__field ' + (this.state.firstNameError && 'has-error')}>
          <label className="form__label" htmlFor="first-name">First name</label>
          <input type="text" name="" id="first-name" className="form__input" onChange={this.handleFirstName} />
          {
            this.state.firstNameError &&
            <div className="form__feedback form__feedback--invalid">{this.state.firstNameError}</div>
          }
        </div>
        <div className={'form__field ' + (this.state.lastNameError && 'has-error')}>
          <label className="form__label" htmlFor="last-name">Last name</label>
          <input type="text" name="" id="last-name" className="form__input" onChange={this.handleLastName} />
          {
            this.state.lastNameError &&
            <div className="form__feedback form__feedback--invalid">{this.state.lastNameError}</div>
          }
        </div>
        <div className={'form__field ' + (this.state.emailError && 'has-error')}>
          <label className="form__label" htmlFor="email">Email</label>
          <input type="text" name="" id="email" className="form__input" onChange={this.handleEmail} />
          {
            this.state.emailError &&
            <div className="form__feedback form__feedback--invalid">{this.state.emailError}</div>
          }
        </div>
        <div className={'form__field ' + (this.state.usernameError && 'has-error')}>
          <label className="form__label" htmlFor="username">Username</label>
          <input type="text" name="" id="username" className="form__input" onChange={this.handleUsername} />
          {
            this.state.usernameError &&
            <div className="form__feedback form__feedback--invalid">{this.state.usernameError}</div>
          }
        </div>
        <div className={'form__field ' + (this.state.passwordError && 'has-error')}>
          <label className="form__label" htmlFor="password">Password</label>
          <input type="password" name="" id="password" className="form__input" onChange={this.handlePassword} />
          {
            this.state.passwordError &&
            <div className="form__feedback form__feedback--invalid">{this.state.passwordError}</div>
          }
        </div>
        <button type="submit" className="form__submit">Join</button>
      </form>
    )
  }
}

export default Register