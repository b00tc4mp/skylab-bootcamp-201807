import React, { Component } from 'react'
import logic from '../logic'

class Register extends Component {
    state = {
        username: '',
        password: '',
        registered: false,
        error: ''
    }

    keepUsername = e => this.checkUsername(e.target.value) 
    keepPassword = e => this.checkPassword(e.target.value) 

    checkUsername = value => {
        const regex = (/^[a-zA-Z0-9]+$/)
        let regexOk = value.match(regex)

        if (regexOk !== null ) this.setState({ username: value, error: '' })
    }

    checkPassword = value => {
        const regex = (/^[a-zA-Z0-9]+$/)
        let regexOk = value.match(regex)

        if (regexOk !== null ) this.setState({ password: value, error: '' })    
    }

    onRegister = e => {
        e.preventDefault()

        const { username, password } = this.state

        logic.register(username, password)
            .then(() => this.setState({ registered: true }))
            .catch(({ message }) => this.setState({ error: message }))
    }

    render() {
        const { state: {registered, error}, keepUsername, keepPassword, onRegister } = this

        return <main>
            {!registered ? <div>
                <nav>
                    <p>Register or go to <a href="/#/login">Login</a></p>
                </nav>
                <form onSubmit={onRegister}>
                    <input type="text" name="username" placeholder="username" autoFocus onChange={keepUsername} />
                    <input type="password" name="password" placeholder="password" onChange={keepPassword} />
                    <button type="submit">Register</button>
                </form>
                {error && <p className="error">{error}</p>}
            </div> : <div>
                        <p className="gotologin">You have registered successfully, now you can go to <a href="/#/login">Login</a></p>
                    </div>}
        </main>
    }
}

export default Register