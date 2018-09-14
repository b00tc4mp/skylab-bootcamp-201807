import React, { Component } from 'react'
import logic from '../logic'
import '../styles/css/login.css'


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

    logic.authenticateAdmin(code, password)
      .then(({ id, token }) => this.props.onLoggedIn(code, id, token))
      .catch(({ message }) => this.setState({ error: message }))
  }

  render() {
    const { state: { code, password, error }, keepCode, keepPassword, onLogin } = this

    return <main className="login">
      <div className="login__group">
        <form className="login__group__form" onSubmit={onLogin}>
          <input className="login__group__form__input" type="text" value={code} name="code" placeholder="code" autoFocus onChange={keepCode} />
          <input className="login__group__form__input" type="password" value={password} name="password" placeholder="password" onChange={keepPassword} />
          <button className="login__group__form__button" type="submit">Login</button>
        </form>
        {error && <p className="login__group__error">{error}</p>}
      </div>
    </main>
  }
}

export default Login