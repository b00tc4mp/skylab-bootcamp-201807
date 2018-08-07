import React, { Component } from 'react'
import Feedback from './Feedback'

class Register extends Component {
    state = { username: null, password: null }

    keepUsername = event => this.setState({ username: event.target.value })

    keepPassword = event => this.setState({ password: event.target.value })

    onRegister = event => {
        event.preventDefault()

        const { username, password } = this.state

        this.props.onRegister(username, password)
    }

    onGoToLogin = event => {
        event.preventDefault()

        this.props.onGoToLogin()
    }

    render() {
        return <section>
            <form onSubmit={this.onRegister}>
                <input type="text" onChange={this.keepUsername} />
                <input type="password" onChange={this.keepPassword} />
                <button type="submit">Register</button>
            </form>
            {this.props.error && <Feedback message={this.props.error} />}
            <p>
                Go to <a href="#" onClick={this.onGoToLogin}>Login</a>
            </p>
        </section>
    }
}

export default Register