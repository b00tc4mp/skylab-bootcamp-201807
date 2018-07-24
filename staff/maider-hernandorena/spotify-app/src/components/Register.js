import React, { Component } from 'react'

class Register extends Component {

    state = { 
        username: null, 
        password: null 
    }

    keepUsername = event => this.setState({ username: event.target.value })
    keepPassword = event => this.setState({ password: event.target.value })

    onRegister = event => {
        event.preventDefault()
        const { username, password } = this.state
        this.props.onRegister(username, password)
    }

    render() {
        return <form onSubmit={this.onRegister}>
                    <input type="text" onChange={this.keepUsername} placeholder="enter a username" />
                    <input type="password" onChange={this.keepPassword} placeholder="enter a password" />
                    <button type="submit">Register</button>
                </form>
    }
}

export default Register