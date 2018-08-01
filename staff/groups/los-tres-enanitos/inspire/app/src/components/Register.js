import React, { Component } from 'react'


class Register extends Component {
  
  state = {
    firstName: '',
    lastName: '',
    email: '',
    username: '',
    password: '',
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

    // TODO: validate required fields

    this.props.onSubmit(this.state)
  }
  
  render() {
    return (
        <form className="register-form" onSubmit={this.handleSubmit}>
            <input type="text" className="register-form__username" placeholder="First name" onChange={ this.handleFirstName }/>
            <input type="text" className="register-form__username" placeholder="Last name" onChange={ this.handleLastName }/>
            <input type="text" className="register-form__username" placeholder="Email" onChange={ this.handleEmail }/>
            <input type="text" className="register-form__username" placeholder="Username" onChange={ this.handleUsername }/>
            <input type="password" className="register-form__pass" placeholder="Password" onChange={ this.handlePassword }/>
            <button type="submit" className="register-form__submit">Join</button>
        </form>
    )
  }
}

export default Register