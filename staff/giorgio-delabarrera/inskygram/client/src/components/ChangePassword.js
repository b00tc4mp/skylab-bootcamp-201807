import React, { Component } from 'react'

class ChangePassword extends Component {

  state = {
    password: '',
    newPassword: '',
  }

  handlePasswordChange = event => this.setState({ password: event.target.value })

  handleNewPasswordChange = event => this.setState({ newPassword: event.target.value })

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

    const { password, newPassword } = this.state

    this.props.onSubmit(password, newPassword)
  }

  render() {
    return (
      <form className="form" onSubmit={this.handleSubmit}>
        <div>
          <label htmlFor="password">Password</label>
          <input type="password" value={this.state.password} id="password" onChange={this.handlePasswordChange} />
        </div>
        <div>
          <label htmlFor="newPassword">New password</label>
          <input type="password" value={this.state.newPassword} id="newPassword" onChange={this.handleNewPasswordChange} />
        </div>
        <button type="submit">Submit</button>
      </form>
    )
  }
}

export default ChangePassword