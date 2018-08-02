import React, { Component } from 'react'
import Register from '../components/Register';
import Header from '../components/Header';
import logic from '../logic'

class RegisterPage extends Component {

  state = {
    registerError: ''
  }

  handleSubmit = (formData) => {
    const { username, password, ...others } = formData
    logic.registerUser(username, password, others)
      .then(() => {
        logic.loginUser(username, password)
          .then(() => {
            this.props.history.push('/')
          })
      })
      .catch(error => {
        this.setState({ registerError: `Upps, ${error.message}` })
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

          <div className="form-container content push-40-t">
            <div className="text-center push-20">
              <ul className="tabs">
                <li className="tabs__item">
                  <a href="#/" className="tabs__link tabs__link--active" onClick={(event) => event.preventDefault()}>Join</a>
                </li>
                <li className="tabs__item">
                  <a href="#/" className="tabs__link" onClick={this.goToLogin}>Login</a>
                </li>
              </ul>
            </div>
            <div>
              <Register onSubmit={this.handleSubmit} error={this.state.registerError} />
            </div>
          </div>
        </main>
      </div>
    )
  }
}

export default RegisterPage