import React, { Component } from 'react'
import logic from '../logic'

class Login extends Component {
  state = {
    email: '',
    password: '',
    error: ''
  }

  keepEmail = e => this.setState({ email: e.target.value, error: '' })
  keepPassword = e => this.setState({ password: e.target.value, error: '' })

  onLogin = e => {
    e.preventDefault()
    const { email, password } = this.state

    logic.authenticateCaretaker(email, password)
      .then(({ token }) => this.props.onLoggedIn(email, token))
      .catch(({ message }) => this.setState({ error: message }))
  }

  render() {
    const { state: { email, password, error }, keepEmail, keepPassword, onLogin } = this

    return <main className="login">
      <div className="login__group">
        <p className="login__group__text">Login or go to <a className="login__group__text__link" href="/#/register">Register</a></p>
        <form className="login__group__form" onSubmit={onLogin}>
          <input className="login__group__form__input" type="text" value={email} name="email" placeholder="email" autoFocus onChange={keepEmail} />
          <input className="login__group__form__input" type="password" value={password} name="password" placeholder="password" onChange={keepPassword} />
          <button className="login__group__form__button" type="submit">Login</button>
        </form>
        {error && <p className="login__group__error">{error}</p>}
      </div>
    </main>
  }
}

export default Login