import React, { Component } from 'react'
// import Utils from '../utils/Utils'

class Register extends Component {
  
  state = {
    email: '',
    username: '',
    password: ''
  }

  handleEmail = event => this.setState({ email: event.target.value })
  
  handleUsername = event => this.setState({ username: event.target.value })

  handlePassword = event => this.setState({ password: event.target.value })

  handleSubmit = event => {
    event.preventDefault()

    // let isValid = true

    // this.setState({
    //   firstNameError: '',
    //   lastNameError: '',
    //   emailError: '',
    //   usernameError: '',
    //   passwordError: '',
    // })

    // if (Utils.isBlank(this.state.firstName)) {
    //   this.setState({ firstNameError: `First name can't be blank` })
    //   isValid = false
    // }

    // if (Utils.isBlank(this.state.lastName)) {
    //   this.setState({ lastNameError: `Last name can't be blank` })
    //   isValid = false
    // }

    // if (Utils.isBlank(this.state.email)) {
    //   this.setState({ emailError: `Email can't be blank` })
    //   isValid = false
    // }

    // if (Utils.isBlank(this.state.username)) {
    //   this.setState({ usernameError: `Username can't be blank` })
    //   isValid = false
    // }

    // if (Utils.isBlank(this.state.password)) {
    //   this.setState({ passwordError: `Password can't be blank` })
    //   isValid = false
    // }

    // if (isValid) {
    //   const {
    //     firstNameError,
    //     lastNameError,
    //     emailError,
    //     usernameError,
    //     passwordError,
    //     ...formData
    //   } = this.state
    //   this.props.onSubmit(formData)
    // }

    const { username, email, password } = this.state
    this.props.onSubmit(username, email, password)
  }

  render() {
    return (
      <form className="form" onSubmit={this.handleSubmit}>
        <div>
          <label htmlFor="username">Username</label>
          <input type="text" name="" id="username" onChange={this.handleUsername} />
        </div>
        <div>
          <label htmlFor="email">Email</label>
          <input type="text" name="" id="email" onChange={this.handleEmail} />
        </div>
        <div>
          <label htmlFor="password">Password</label>
          <input type="password" name="" id="password" onChange={this.handlePassword} />
        </div>
        <button type="submit" className="form__submit">Register</button>
      </form>
    )
  }
}

export default Register