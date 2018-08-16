import React, { Component } from 'react'
import logic from '../logic'

class Login extends Component {
  state = {
    username: '',
    password: '',
    error: ''
  }

  onUsernameChanged = e => this.setState({ username: e.target.value })

  onPasswordChanged = e => this.setState({ password: e.target.value })

  onLoginSubmitted = e => {
    e.preventDefault()

    const { username, password } = this.state

    logic.authenticate(username, password)
      .then(token => this.props.onLoggedIn(username, token))
      .catch(({ message }) => this.setState({ error: message }))
  }

  render() {
    const { error } = this.state

    return <main>
      <div className="screen">
        <nav>
          &gt; <a href="/#/register">register</a> or login <span className="blink">_</span>
        </nav>
        <form onSubmit={this.onLoginSubmitted}>
          <input type="text" name="username" placeholder="username" autofocus onChange={this.onUsernameChanged} />
          <input type="password" name="password" placeholder="password" onChange={this.onPasswordChanged} />
          <button type="submit">login</button>
        </form>
        {error && <p>{error}</p>}
      </div>
    </main>
  }
}

export default Login