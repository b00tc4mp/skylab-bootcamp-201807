import React, { Component } from 'react'
import logic from '../logic'

class Login extends Component {
  state = {
    code: '',
    password: '',
    error: ''
  }

  keepCode = e => this.setState({ code: e.target.value, error: '' })
  keepPassword = e => this.setState({ password: e.target.value, error: '' })

  onLogin = e => {
    e.preventDefault()
    const { code, password } = this.state

    logic.authenticateDoctor(code, password)
      .then(token => this.props.onLoggedIn(code, token))
      .catch(({ message }) => this.setState({ error: message }))
  }

  render() {
    const { state: {error}, keepCode, keepPassword, onLogin } = this

    return <main>
      <div>
        <nav>
          <p>Login or go to <a href="/#/register">Register</a></p>
        </nav>
        <form onSubmit={onLogin}>
          <input type="text" name="code" placeholder="code" autoFocus onChange={keepCode} />
          <input type="password" name="password" placeholder="password" onChange={keepPassword} />
          <button type="submit">Login</button>
        </form>
        {error && <p className="error">{error}</p>}
      </div>
    </main>
  }
}

export default Login