import React, { Component } from 'react'
import logic from '../logic'

class Login extends Component {
  state = {
    nickname: '',
    password: '',
    error: ''
  }

  onNicknameChanged = e => this.setState({ nickname: e.target.value })

  onPasswordChanged = e => this.setState({ password: e.target.value })

  onLoginSubmitted = e => {
    e.preventDefault()

    const { nickname, password } = this.state
    logic.authenticate(nickname, password)
      .then(token => this.props.onLoggedIn(nickname, token))
      .catch(({ message }) => this.setState({ error: message }))
  }

  render() {
    const { error } = this.state

    return <main>
      <div >
        <nav>
         <a href="/#/register">register</a> or login
        </nav>
        <form onSubmit={this.onLoginSubmitted}>
          <input type="text" name="nickname" placeholder="nickname" autoFocus onChange={this.onNicknameChanged} />
          <input type="password" name="password" placeholder="password" onChange={this.onPasswordChanged} />
          <button type="submit">login</button>
        </form>
        {error && <p>{error}</p>}
      </div>
    </main>
  }
}

export default Login