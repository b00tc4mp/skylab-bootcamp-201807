import React, { Component } from 'react';

class Login extends Component {
    state = { username: null, password: null }
    
    keepUsername = event => this.setState({ username: event.target.value })

    keepPassword = event => this.setState({ password: event.target.value })
    
    render() {
        return <div className="screen">
            <h1>FILES</h1>
            <nav>
                > <a href="/register">register</a> or login <span className="blink">_</span>
            </nav>
            <form onSubmit={this.onLogin}>
                <input type="text" name="username" placeholder="username" autoFocus onChange={this.keepUsername} />
                <input type="password" name="password" placeholder="password" onChange={this.keepPassword} />
                <button type="submit">login</button>
            </form>
        </div>
    }
}

export default Login