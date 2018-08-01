import React, { Component } from 'react'
import Register from '../components/Register';
import Header from '../components/Header';
import logic from '../logic'

class RegisterPage extends Component {

  handleSubmit = (formData) => {
    const { username, password, ...others } = formData
    logic.registerUser(username, password, others)
      .then(id => {
        logic.loginUser(username, password)
          .then(res => {
            this.props.history.push('/')
          })
      })
      .catch(error => {
        console.log(error)
      })
  }

  goToLogin = (event) => {
    event.preventDefault()
    this.props.history.push('/login')
  }

  render() {
    return (
      <div>
        <Header />
        <main>
          <ul className="tabs">
            <li className="tabs__item">
              <a href="#/" onClick={(event) => event.preventDefault()} className="tabs__link tabs__link--active">Join</a>
            </li>
            <li className="tabs__item">
              <a href="#/" onClick={this.goToLogin} className="tabs__link">Login</a>
            </li>
          </ul>
          <Register onSubmit={this.handleSubmit} />
        </main>
      </div>
    )
  }
}

export default RegisterPage