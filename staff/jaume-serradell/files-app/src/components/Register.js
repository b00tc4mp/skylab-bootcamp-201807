import React, { Component } from 'react';

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
        return <div className="screen">
            <h1>FILES</h1>
            <nav>
                >  register or <a href="/login">login</a> <span className="blink">_</span>
            </nav>
            <form action="/register" method="post">
                <input type="text" name="username" placeholder="username" autoFocus />
                <input type="password" name="password" placeholder="password" />
                <button type="submit">register</button>
            </form>
        </div>
    }
}

export default Register