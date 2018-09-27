import React, { Component } from 'react'
import ErrorPanel from './ErrorPanel'

class Register extends Component {
    state = { username: null, password: null }

    keepUsername = event => this.setState({ username: event.target.value })

    keepPassword = event => this.setState({ password: event.target.value })

    onRegister = event => {
        event.preventDefault()

        const { username, password } = this.state

        this.props.onRegister(username, password)
    }

    render() {
        return <section>
            <form onSubmit={this.onRegister}>
                <input type="text" onChange={this.keepUsername} placeholder="Name..."/>
                <input type="password" onChange={this.keepPassword} placeholder="Password..."/>
                <button type="submit">Register</button>
            </form>
            {this.props.error && <ErrorPanel message={this.props.error} />}
            <p>
                Go to <a href="/#" onClick={this.props.onGoToLogin}>Login</a>
            </p>
        </section>
    }
}

export default Register