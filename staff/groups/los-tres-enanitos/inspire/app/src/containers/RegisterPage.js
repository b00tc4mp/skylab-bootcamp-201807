import React, { Component } from 'react'
import Register from '../components/Register';
import Header from '../components/Header';
import { withRouter } from 'react-router-dom'

class RegisterPage extends Component {

  goToLogin = (event) => {
    event.preventDefault()
    this.props.history.push('/login')
  }

  render() {
    return (
      <div>
        <Header loggedIn={this.props.loggedIn} />
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
              <Register onSubmit={this.props.onRegisterSubmit} error={this.props.registerError} />
            </div>
          </div>
        </main>
      </div>
    )
  }
}

export default withRouter(RegisterPage)