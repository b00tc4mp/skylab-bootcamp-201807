import React, { Component } from 'react'
import { connect } from "react-redux"
import { login } from './redux/actions'
import logic from './logic'

import Main from './components/Main'

const mapStateToProps = state => {
  return { loggedIn: state.user.loggedIn };
}

const mapDispatchToProps = dispatch => {
  return {
    login: loggedIn => dispatch(login(loggedIn))
  }
}

class App extends Component {

  componentWillMount = () => {
    this.props.login(logic.loggedIn())
  }

  register = (username, password) =>
    logic.registerUser(username, password)

  login = (username, password) =>
    logic.loginUser(username, password)
      .then(() => this.props.login(true))

  logout = () => {
    logic.logout()
    this.props.login(false)
  }

  unregister = password =>
    logic.unregisterUser(password)
      .then(() => this.logout())

  render() {
    const { loggedIn } = this.props
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

export default connect(mapStateToProps, mapDispatchToProps)(App);
