import React, { Component } from 'react'
import logic from '../logic'
import Logout from './Logout'
// import Main from './Main'
import App from '../App'


class LogoutPlace extends Component {
  state = {
    logoutActive: false,
    loggedOut: false
  }

  Logout = (username, password) =>
    logic.loginUser(username, password)
      .then(() => this.setState({ loggedOut: true, logoutActive: false }))
      .catch(console.error)

  render() {

    const { state: { logoutActive, loggedOut } } = this

    return (
      <section>
        {logoutActive && <Logout onLogout={this.loginUser} />}
        {loggedOut && <App />}
      </section>
    )
  }
}

export default LogoutPlace