import React, { Component } from 'react'
import logic from '../logic'

class Register extends Component {
    state = {
        username: '',
        password: '',
        succeeded: false,
        error: ''
    }

    onUsernameChanged = e => this.setState({ username: e.target.value })

    onPasswordChanged = e => this.setState({ password: e.target.value })

    onRegisterSubmitted = e => {
        e.preventDefault()

        const { username, password } = this.state

        logic.register(username, password)
            .then(() => this.setState({ succeeded: true }))
            .catch(({ message }) => this.setState({ error: message }))
    }

    render() {
        const { succeeded, error } = this.state

        return <main>
            {!succeeded ? <div className="screen">
                <nav>
                    &gt; register or <a href="/#/login">login</a> <span className="blink">_</span>
                </nav>
                <form onSubmit={this.onRegisterSubmitted}>
                    <input type="text" name="username" placeholder="username" autofocus onChange={this.onUsernameChanged} />
                    <input type="password" name="password" placeholder="password" onChange={this.onPasswordChanged} />
                    <button type="submit">register</button>
                </form>
                {error && <p>{error}</p>}
            </div> : <div className="screen">
                    <nav>
                        &gt; User register successfully, now you can proceed to <a href="/#/login">login</a> <span className="blink">_</span>
                    </nav>
                </div>}
        </main>
    }
}

export default Register