import React, { Component } from 'react';

class Register extends Component {
    
    state = { username: '', password: '' }

    keepUsername = event => this.setState({ username: event.target.value })

    keepPassword = event => this.setState({ password: event.target.value })

    onRegister = event => {
        event.preventDefault()
        const { username, password } = this.state
        this.props.onRegister(username, password)
    }

    goToLoginPage = event => {
        event.preventDefault()
        this.props.onLogin()
    }
    
    render() {
        return <div className="screen">
            <h1>FILES</h1>
            <nav>
                >  register or <a href="" onClick={this.goToLoginPage}>login</a> <span className="blink">_</span>
            </nav>
            <form onSubmit={this.onRegister}>
                <input type="text" onChange={this.keepUsername} placeholder="username" />
                <input type="password" onChange={this.keepPassword} placeholder="password" />
                <button type="submit">register</button>
            </form>
        </div>
    }
}

export default Register