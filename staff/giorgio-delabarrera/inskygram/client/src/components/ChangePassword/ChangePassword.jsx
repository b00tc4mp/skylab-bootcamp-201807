import React, { Component } from 'react'
import './ChangePassword.sass'

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
      <div className="ChangePassword">
        <form className="ChangePassword-form" onSubmit={this.handleSubmit}>
          <div className="ChangePassword-field">
            <div className="ChangePassword-avatarWrapper">
              <img
                className="ChangePassword-avatar"
                src="https://instagram.fmad8-1.fna.fbcdn.net/vp/1e9c78654a0a62a43b1cbd1fd1904d3d/5C3B620A/t51.2885-19/s150x150/13397430_249362202098918_754420597_a.jpg"
                alt="" />
            </div>
            <div className="ChangePassword-userInfo">
              <h1 className="ChangePassword-username">giodelabarrera</h1>
            </div>
          </div>
          <div className="ChangePassword-field">
            <label htmlFor="password" className="ChangePassword-label">Password</label>
            <input type="password" className="ChangePassword-input" value={this.state.password} id="password" onChange={this.handlePasswordChange} />
            {
              this.state.passwordError &&
              <div className="ChangePassword-fieldError">{this.state.passwordError}</div>
            }
          </div>
          <div className="ChangePassword-field">
            <label htmlFor="newPassword" className="ChangePassword-label">New password</label>
            <input type="password" className="ChangePassword-input" value={this.state.newPassword} id="newPassword" onChange={this.handleNewPasswordChange} />
            {
              this.state.newPasswordError &&
              <div className="ChangePassword-fieldError">{this.state.newPasswordError}</div>
            }
          </div>
          <div className="ChangePassword-field">
            <div></div>
            <div>
              <button type="submit" className="button is-primary">Submit</button>
            </div>
            {
              this.props.error && <div className="ChangePassword-formError">{this.props.error}</div>
            }
          </div>
        </form>
      </div>
    )
  }
}

export default ChangePassword