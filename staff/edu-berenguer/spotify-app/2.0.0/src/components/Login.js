import React, { Component } from 'react'
import ErrorPanel from './ErrorPanel'

class Login extends Component {
    state = { username: null, password: null }

    keepUsername = event => this.setState({ username: event.target.value })

    keepPassword = event => this.setState({ password: event.target.value })

    onLogin = event => {
        event.preventDefault()

        const { username, password } = this.state

        this.props.onLogin(username, password)
    }

    render() {
        return <section>
            <form onSubmit={this.onLogin}>
                <input type="text" onChange={this.keepUsername} placeholder="Name..."/>
                <input type="password" onChange={this.keepPassword} placeholder="Password..."/>
                <button type="submit">Login</button>
            </form>
            {this.props.error && <ErrorPanel message={this.props.error} />}
            <p>
                Go to <a href="/#" onClick={this.props.onGoToRegister}>Register</a>
            </p>
        </section>
    }
}

export default Login