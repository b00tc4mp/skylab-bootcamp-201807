import React, { Component } from 'react';

import logic from './logic'

import Main from './components/Main'

class App extends Component {

  state = {
    loggedIn: logic.loggedIn()
  }

  register = (username, password) =>
    logic.registerUser(username, password)

  login = (username, password) =>
    logic.loginUser(username, password)
      .then(() => this.setState({ loggedIn: true }))

  logout = () => {
    logic.logout()
    this.setState({ loggedIn: false })
  }

  unregister = password =>
    logic.unregisterUser(password)
      .then(() => this.logout())

  render() {
    const { loggedIn } = this.state
    const { register, login, logout, unregister } = this
    return (
      <div className='app'>
        <Main
          loggedIn={loggedIn}
          register={register}
          login={login}
          logout={logout}
          unregister={unregister}
        />
      </div>
    )
  }
}

export default App;
