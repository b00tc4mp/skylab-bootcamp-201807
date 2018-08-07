import React, { Component } from 'react'
import './Login.css'

class Login extends Component {
    state = {
        username: null,
        password: null
    }

    keepUsername = event => this.setState({ username: event.target.value })
    keepPassword = event => this.setState({ password: event.target.value })
    handleSubmit = event => {
        event.preventDefault()
        this.props.onLogin(this.state.username, this.state.password);
    }

    render() {
        if (this.props.fail)
            return (
                <div>
                    <h1> Login Failed ! </h1>
                    <h2> Try again </h2>
                </div>
            )
        else
            return (
                <div>
                    <form className="login-form">
                        <input className="login-form__input" placeholder="username" onChange={this.keepUsername}></input>
                        <input className="login-form__input" placeholder="password" onChange={this.keepPassword}></input>
                        <button className="login-form__button" type="submit" onClick={this.handleSubmit}>Log In</button>
                    </form>
                </div>
            )
    }
}

export default Login