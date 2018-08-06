import React, { Component } from 'react'
import ErrorPanel from './ErrorPanel';

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
        return (
            <div>
                <form onSubmit={this.onLogin}>
                    <input type="text" onChange={this.keepUsername} />
                    <input type="password" onChange={this.keepPassword} />
                    <button type="submit">Login</button>
                </form>
                {this.props.errors.length > 0 && <ErrorPanel messages={this.props.errors}/>}
            </div>
        )
    }
}

export default Login