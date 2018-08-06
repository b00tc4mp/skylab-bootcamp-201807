import React, { Component } from 'react'
import Utils from '../utils/Utils'

class EditProfile extends Component {

  state = {
    firstName: this.props.user.firstName,
    lastName: this.props.user.lastName,
    email: this.props.user.email,
    newUsername: this.props.user.username,
    description: this.props.user.description,
    passwordToUpdate: '',
    firstNameError: '',
    lastNameError: '',
    emailError: '',
    newUsernameError: '',
    passwordToUpdateError: '',
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

  handleNewUsername = (event) => {
    this.setState({ newUsername: event.target.value })
  }

  handleDescription = (event) => {
    this.setState({ description: event.target.value })
  }
  
  handlePasswordToUpdate = (event) => {
    this.setState({ passwordToUpdate: event.target.value })
  }

  handleSubmit = (event) => {
    event.preventDefault()

    let isValid = true

    this.setState({
      firstNameError: '',
      lastNameError: '',
      emailError: '',
      newUsernameError: '',
      passwordToUpdateError: '',
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

    if (Utils.isBlank(this.state.newUsername)) {
      this.setState({ newUsernameError: `Username can't be blank` })
      isValid = false
    }

    if (Utils.isBlank(this.state.passwordToUpdate)) {
      this.setState({ passwordToUpdateError: `Password to update can't be blank` })
      isValid = false
    }

    if (isValid) {

      const {
        firstNameError,
        lastNameError,
        emailError,
        newUsernameError,
        passwordToUpdateError,
        ...user
      } = this.state;

      this.props.onSubmit(user)
    }
  }

  render() {
    return (
      <form className="form" onSubmit={this.handleSubmit}>
        {
          this.props.success &&
          <div className="form__main-feedback form__main-feedback--valid">
            {this.props.success}
          </div>
        }
        {
          this.props.error &&
          <div className="form__main-feedback form__main-feedback--invalid">
            {this.props.error}
          </div>
        }
        <div className={'form__field ' + (this.state.firstNameError && 'has-error')}>
          <label className="form__label" htmlFor="first-name">First name</label>
          <input type="text" id="first-name" className="form__input" onChange={this.handleFirstName} value={this.state.firstName} />
          {
            this.state.firstNameError &&
            <div className="form__feedback form__feedback--invalid">{this.state.firstNameError}</div>
          }
        </div>
        <div className={'form__field ' + (this.state.lastNameError && 'has-error')}>
          <label className="form__label" htmlFor="last-name">Last name</label>
          <input type="text" id="last-name" className="form__input" onChange={this.handleLastName} value={this.state.lastName} />
          {
            this.state.lastNameError &&
            <div className="form__feedback form__feedback--invalid">{this.state.lastNameError}</div>
          }
        </div>
        <div className={'form__field ' + (this.state.emailError && 'has-error')}>
          <label className="form__label" htmlFor="email">Email</label>
          <input type="text" id="email" className="form__input" onChange={this.handleEmail} value={this.state.email} />
          {
            this.state.emailError &&
            <div className="form__feedback form__feedback--invalid">{this.state.emailError}</div>
          }
        </div>
        <div className={'form__field ' + (this.state.newUsernameError && 'has-error')}>
          <label className="form__label" htmlFor="username">Username</label>
          <input type="text" id="username" className="form__input" onChange={this.handleNewUsername} value={this.state.newUsername} />
          {
            this.state.newUsernameError &&
            <div className="form__feedback form__feedback--invalid">{this.state.newUsernameError}</div>
          }
        </div>
        <div className="form__field">
          <label className="form__label" htmlFor="description">Description</label>
          <textarea className="form__textarea" onChange={this.handleDescription} defaultValue={this.state.description} rows="5"></textarea>
        </div>
        <div className={'form__field ' + (this.state.passwordToUpdateError && 'has-error')}>
          <label className="form__label" htmlFor="password-to-update">Password to update</label>
          <input type="password" id="password-to-update" className="form__input" onChange={this.handlePasswordToUpdate} />
          {
            this.state.passwordToUpdateError &&
            <div className="form__feedback form__feedback--invalid">{this.state.passwordToUpdateError}</div>
          }
        </div>
        <button type="submit" className="form__submit">Update</button>
      </form>
    )
  }
}

export default EditProfile