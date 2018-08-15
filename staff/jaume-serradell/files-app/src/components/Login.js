import React, { Component } from 'react';

class Login extends Component {
    state = { username: null, password: null }
    
    keepUsername = event => this.setState({ username: event.target.value })

    keepPassword = event => this.setState({ password: event.target.value })

    //Link to register on nav
    goToRegisterPage = event => {
        event.preventDefault()
        this.props.onGoToRegister()
    }

    //Function to login
    onLogin = event => {
        event.preventDefault()
        const { username, password } = this.state
        this.props.onLogin(username, password)
    }
    
    render() {
        return <div className="screen">
            <h1>FILES</h1>
            <nav>
                > <a href="" onClick={this.goToRegisterPage}>register</a> or login <span className="blink">_</span>
            </nav>
            <form onSubmit={this.onLogin}>
                <input type="text" placeholder="username" onChange={this.keepUsername} />
                <input type="password" placeholder="password" onChange={this.keepPassword} />
                <button type="submit">login</button>
            </form>
        </div>
    }
}

export default Login