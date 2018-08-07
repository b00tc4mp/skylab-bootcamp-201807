import React, { Component } from 'react'

import './styles/Register.css'

class Register extends Component {

    state = {
        username: null,
        password: null,
        error: null
    }

    keepPassword = event => this.setState({ password: event.target.value })
    keepUsername = event => this.setState({ username: event.target.value })
    registerUser = () => {
        const { state: { username, password } } = this
        this.props.onRegister(username, password)
            .catch(err => this.setState({ error: err.message }))
    }

    render() {
        const {
            state: { error },
            props: { onLogin },
            keepPassword,
            keepUsername,
            registerUser
        } = this
        return (
            <div className="register">
                <h1 className="register__title"> Register account </h1>
                <div className="register__group">
                    <h3 className="register__text"> Username </h3>
                    <input className="register__input" onChange={keepUsername}></input>
                </div>
                <div className="register__group">
                    <h3 className="register__text"> Password </h3>
                    <input className="register__input" onChange={keepPassword}></input>
                </div>
                <div>
                    {error && <p className="register__error">{error}</p>}
                </div>
                <button className="register__btn" onClick={registerUser}> Register </button>
                <button className="register__btn register__btn--secondary" onClick={onLogin}> Log in </button>
            </div>
        )
    }
}

export default Register