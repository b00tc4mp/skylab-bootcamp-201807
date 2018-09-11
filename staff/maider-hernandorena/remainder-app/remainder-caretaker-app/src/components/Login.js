import React, { Component } from 'react'
import logic from '../logic'
import '../styles/css/login.css'

class Login extends Component {
  state = {
    dni: '',
    password: '',
    error: ''
  }

  keepDni = e => this.setState({ dni: e.target.value, error: '' })
  keepPassword = e => this.setState({ password: e.target.value, error: '' })

  onLogin = e => {
    e.preventDefault()
    let { dni, password } = this.state
    dni = parseInt(dni)

    logic.authenticateCaretaker(dni, password)
      .then(({id, token }) => this.props.onLoggedIn(dni, id, token))
      .catch(({ message }) => this.setState({ error: message }))
  }

  render() {
    const { state: { dni, password, error }, keepDni, keepPassword, onLogin } = this

    return <main className="login">
      <div className="login__group">
        {error && <p className="login__group__error">{error}</p>}
        <form className="login__group__form" onSubmit={onLogin}>
          <input className="login__group__form__input" type="text" value={dni} name="dni" placeholder="dni" autoFocus onChange={keepDni} />
          <input className="login__group__form__input" type="password" value={password} name="password" placeholder="password" onChange={keepPassword} />
          <button className="login__group__form__button" type="submit">Login</button>
        </form>
      </div>
    </main>
  }
}

export default Login