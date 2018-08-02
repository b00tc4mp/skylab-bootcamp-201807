import React, { Component } from 'react'
import Login from '../components/Login';
import Header from '../components/Header';
import logic from '../logic'

class LoginPage extends Component {

  state = {
    loginError: ''
  }

  handleSubmit = (formData) => {
    logic.loginUser(formData.username, formData.password)
      .then(() => {
        this.props.history.push('/')
      })
      .catch(error => {
        this.setState({ loginError: `Upps, ${error.message}` })
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
          <div className="form-container content push-40-t">
            <div className="text-center push-20">
              <ul className="tabs">
                <li className="tabs__item">
                  <a href="#/" className="tabs__link" onClick={this.goToRegister}>Join</a>
                </li>
                <li className="tabs__item">
                  <a href="#/" className="tabs__link tabs__link--active" onClick={(event) => event.preventDefault()}>Login</a>
                </li>
              </ul>
            </div>
            <div>
              <Login onSubmit={this.handleSubmit} error={this.state.loginError} />
            </div>
          </div>
        </main>
      </div>
    )
  }
}

export default LoginPage