import React, { Component } from 'react'
import logic from '../logic'

class Login extends Component {
  state = {
    username: '',
    password: '',
    error: ''
  }

  keepUsername = e => this.setState({ username: e.target.value })
  keepPassword = e => this.setState({ password: e.target.value })

  onLogin = e => {
    e.preventDefault()
    const { username, password } = this.state

    logic.login(username, password)
      .then(token => this.props.onLoggedIn(username, token))
      .catch(({ message }) => this.setState({ error: message }))
  }

  render() {
    const { state: {error}, keepUsername, keepPassword, onLogin } = this

    return <main>
      <div>
        <nav>
          <p>Login or go to <a href="/#/register">Register</a></p>
        </nav>
        <form onSubmit={onLogin}>
          <input type="text" name="username" placeholder="username" autoFocus onChange={keepUsername} />
          <input type="password" name="password" placeholder="password" onChange={keepPassword} />
          <button type="submit">Login</button>
        </form>
        {error && <p className="error">{error}</p>}
      </div>
    </main>
  }
}

export default Login