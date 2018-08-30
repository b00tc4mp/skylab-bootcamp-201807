import React, { Component } from 'react'
import logic from '../logic'

class Register extends Component {
    state = {
        code: '',
        password: '',
        registered: false,
        error: ''
    }

    keepCode = e => this.checkcode(e.target.value) 
    keepPassword = e => this.checkPassword(e.target.value) 

    checkcode = value => {
        const regex = (/^[a-zA-Z0-9]+$/)
        let regexOk = value.match(regex)

        if (regexOk !== null ) this.setState({ code: value, error: '' })
    }

    checkPassword = value => {
        const regex = (/^[a-zA-Z0-9]+$/)
        let regexOk = value.match(regex)

        if (regexOk !== null ) this.setState({ password: value, error: '' })    
    }

    onRegister = e => {
        e.preventDefault()

        const { code, password } = this.state

        logic.registerDoctor(code, password)
            .then(() => this.setState({ registered: true }))
            .catch(({ message }) => this.setState({ error: message }))
    }

    render() {
        const { state: {registered, error}, keepCode, keepPassword, onRegister } = this

        return <main>
            <div>
                <nav>
                    <p>Register or go to <a href="/#/login">Login</a></p>
                </nav>
                <form onSubmit={onRegister}>
                    <input type="text" name="code" placeholder="code" autoFocus onChange={keepCode} />
                    <input type="password" name="password" placeholder="password" onChange={keepPassword} />
                    <button type="submit">Register</button>
                </form>
                {error && <p className="error">{error}</p>}
                {!registered ? <p></p> :
                <p className="gotologin">You have registered successfully, now you can go to <a href="/#/login" onClick={this.props.linkToLogin}>Login</a></p>}
            </div>
        </main>
    }
}

export default Register