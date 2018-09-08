import React, { Component } from 'react'

class EditProfile extends Component {

  state = {
    name: this.props.user.name || '',
    website: this.props.user.website || '',
    biography: this.props.user.biography || '',
    newEmail: this.props.user.email,
    phoneNumber: this.props.user.phoneNumber || '',
    gender: this.props.user.gender || '',
    privateAccount: this.props.user.privateAccount || false,
  }

  // handleInputChange = event => {
  //   const { target } = event;
  //   const value = target.type === 'checkbox' ? target.checked : target.value;
  //   const name = target.name;

  //   this.setState({ [name]: value });
  // }

  handleNameChange = event => this.setState({ name: event.target.value })

  handleWebsiteChange = event => this.setState({ website: event.target.value })

  handleBiographyChange = event => this.setState({ biography: event.target.value })

  handleNewEmailChange = event => this.setState({ newEmail: event.target.value })

  handlePhoneNumberChange = event => this.setState({ phoneNumber: event.target.value })

  handleGenderChange = event => this.setState({ gender: event.target.value })

  handlePrivateAccountChange = event => this.setState({ privateAccount: event.target.checked })

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

    const {
      name,
      website,
      biography,
      newEmail,
      phoneNumber,
      gender,
      privateAccount,
    } = this.state

    this.props.onSubmit(newEmail, name, website, phoneNumber, gender, biography, privateAccount)
  }

  render() {
    return (
      <form className="form" onSubmit={this.handleSubmit}>
        <div>
          <label htmlFor="name">Name</label>
          <input type="text" value={this.state.name} id="name" onChange={this.handleNameChange} />
        </div>
        <div>
          <label htmlFor="website">Website</label>
          <input type="text" value={this.state.website} name="website" id="website" onChange={this.handleWebsiteChange} />
        </div>
        <div>
          <label htmlFor="biography">Bio</label>
          <textarea value={this.state.biography} name="biography" id="biography" onChange={this.handleBiographyChange} />
        </div>
        <div>
          <label htmlFor="newEmail">Email</label>
          <input type="text" value={this.state.newEmail} name="newEmail" id="newEmail" onChange={this.handleNewEmailChange} />
        </div>
        <div>
          <label htmlFor="phoneNumber">Phone number</label>
          <input type="text" value={this.state.phoneNumber} name="phoneNumber" id="phoneNumber" onChange={this.handlePhoneNumberChange} />
        </div>
        <div>
          <label htmlFor="gender">Gender</label>
          <select name="gender" id="gender" value={this.state.gender} onChange={this.handleGenderChange}>
            <option value="male">Male</option>
            <option value="female">Female</option>
          </select>
        </div>
        <div>
          <label htmlFor="privateAccount">Private account</label>
          <input
            type="checkbox"
            name="privateAccount"
            id="privateAccount"
            checked={this.state.privateAccount}
            onChange={this.handlePrivateAccountChange}
          />
        </div>
        <button type="submit" className="form__submit">Submit</button>
      </form>
    )
  }
}

export default EditProfile