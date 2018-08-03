import React, { Component } from 'react'
import Login from '../components/Login';
import Header from '../components/Header';
import { withRouter } from 'react-router-dom'

class LoginPage extends Component {

  goToRegister = (event) => {
    event.preventDefault()
    this.props.history.push('/join')
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
                  <a href="#/" className="tabs__link" onClick={this.goToRegister}>Join</a>
                </li>
                <li className="tabs__item">
                  <a href="#/" className="tabs__link tabs__link--active" onClick={(event) => event.preventDefault()}>Login</a>
                </li>
              </ul>
            </div>
            <div>
              <Login onSubmit={this.props.onLoginSubmit} error={this.props.loginError} />
            </div>
          </div>
        </main>
      </div>
    )
  }
}

export default withRouter(LoginPage)