import React, { Component } from 'react'
import Login from '../components/Login';
import Header from '../components/Header';
import logic from '../logic'

class LoginPage extends Component {

  handleSubmit = (formData) => {
    logic.loginUser(formData.username, formData.password)
      .then(() => {
        // redirect to home
        this.props.history.push('/')
      })
      .catch(error => {
        console.log(error)
      })
  }

  goToRegister = (event) => {
    event.preventDefault()
    this.props.history.push('/join')
  }

  render() {
    return (
      <div>
        <Header />
        <main>
          <ul className="tabs">
            <li className="tabs__item">
              <a href="#/" onClick={this.goToRegister} className="tabs__link">Join</a>
            </li>
            <li className="tabs__item">
              <a href="#/" onClick={(event) => event.preventDefault()} className="tabs__link tabs__link--active">Login</a>
            </li>
          </ul>
          <Login onSubmit={this.handleSubmit} />
        </main>
      </div>
    )
  }
}

export default LoginPage