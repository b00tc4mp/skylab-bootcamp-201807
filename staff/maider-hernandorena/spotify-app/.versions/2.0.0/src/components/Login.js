import React, { Component } from 'react'
import IfWrong from './IfWrong'
import './css/login-register.css'

class Login extends Component {

    state = { 
        username: null, 
        password: null 
    }

    keepUsername = event => this.setState({ username: event.target.value })
    keepPassword = event => this.setState({ password: event.target.value })

    onLogin = event => {
        event.preventDefault()
        const { username, password } = this.state
        this.props.onLogin(username, password)
    }

    render() {
        return <section className="all">
                    <form className="all__form" onSubmit={this.onLogin}>
                        <input className="all__form__space" type="text" onChange={this.keepUsername} placeholder="enter your username" />
                        <input className="all__form__space" type="password" onChange={this.keepPassword} placeholder="enter your password" />
                        <button className="all__form__button" type="submit">Login</button>
                    </form>
                    {this.props.error && <IfWrong message={this.props.error} />}
                    <p className="all__text">Go to <a className="all__text__link" href="/#" onClick={this.props.linkToRegister}>Register</a></p>
                </section>
    }
}

export default Login