import React, {Component} from 'react'
import {withRouter} from 'react-router-dom'

class Register extends Component {
    state = { username: null, password: null}

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
        return <div class="screen">
        <h1>FILES</h1>
        <nav>
            >  register or <a href="" onClick={this.onGoToLogin}>login</a> <span class="blink">_</span>
        </nav>
        <form action="/register" method="post" onSubmit={this.onRegister}>
            <input type="text" name="username" placeholder="username" autofocus onChange={this.keepUsername}/>
            <input type="password" name="password" placeholder="password" onChange={this.keepPassword}/>
            <button type="submit">register</button>
        </form>
    </div>
    }
}
export default withRouter(Register)