import React, { Component } from 'react'

import './styles/Login.css'

class Login extends Component {
    state = {
        username: null,
        password: null,
        error: null
    }

    keepPassword = event => this.setState({ password: event.target.value })
    keepUsername = event => this.setState({ username: event.target.value })

    /** This is the function to login a user */
    loginUser = () => {
        const { state: { username, password } } = this
        this.props.onLogin(username, password)
            .catch(err => this.setState({ error: err.message }))
    }
    render() {
        const {
            state: { error },
            props: { onRegister },
            keepPassword,
            keepUsername,
            loginUser
        } = this
        return (
            <div className="login">
                <h1 className="login__title"> Log in </h1>
                <div className="login__group">
                    <h3 className="login__text"> Username </h3>
                    <input className="login__input" onChange={keepUsername}></input>
                </div>
                <div className="login__group">
                    <h3 className="login__text"> Password </h3>
                    <input type="password" className="login__input" onChange={keepPassword}></input>
                </div>
                <div>
                    {error && <p className="login__error">{error}</p>}
                </div>
                <button className="login__btn" onClick={loginUser}> Log in </button>
                <button className="login__btn login__btn--secondary" onClick={onRegister}> Register </button>
            </div>
        )
    }
}

export default Login